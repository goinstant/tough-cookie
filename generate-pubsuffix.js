/*!
 * Copyright (c) 2015, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';
var fs = require('fs');
var assert = require('assert');
var punycode = require('punycode');

fs.readFile('./public-suffix.txt', 'utf8', function(err,string) {
  if (err) {
    throw err;
  }
  var lines = string.split("\n");
  process.nextTick(function() {
    processList(lines);
  });
});

var index = {};

var COMMENT = new RegExp('//.+');
function processList(lines) {
  while (lines.length) {
    var line = lines.shift();
    line = line.replace(COMMENT,'').trim();
    if (!line) {
      continue;
    }
    addToIndex(index,line);
  }

  pubSufTest();

  var w = fs.createWriteStream('./lib/pubsuffix.js',{
    flags: 'w',
    encoding: 'utf8',
    mode: parseInt('644',8)
  });
  w.on('end', process.exit);
  w.write("/****************************************************\n");
  w.write(" * AUTOMATICALLY GENERATED by generate-pubsuffix.js *\n");
  w.write(" *                  DO NOT EDIT!                    *\n");
  w.write(" ****************************************************/\n\n");

  w.write("module.exports.getPublicSuffix = ");
  w.write(getPublicSuffix.toString());
  w.write(";\n\n");

  w.write("// The following generated structure is used under the MPL version 1.1\n");
  w.write("// See public-suffix.txt for more information\n\n");
  w.write("var index = module.exports.index = Object.freeze(\n");
  w.write(JSON.stringify(index));
  w.write(");\n\n");
  w.write("// END of automatically generated file\n");

  w.end();
}

function addToIndex(index,line) {
  var prefix = '';
  if (line.replace(/^(!|\*\.)/)) {
    prefix = RegExp.$1;
    line = line.slice(prefix.length);
  }
  line = prefix + punycode.toASCII(line);

  if (line.substr(0,1) == '!') {
    index[line.substr(1)] = false;
  } else {
    index[line] = true;
  }
}

// include the licence in the function since it gets written to pubsuffix.js
function getPublicSuffix(domain) {
  /*!
   * Copyright (c) 2015, Salesforce.com, Inc.
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice,
   * this list of conditions and the following disclaimer.
   *
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   * this list of conditions and the following disclaimer in the documentation
   * and/or other materials provided with the distribution.
   *
   * 3. Neither the name of Salesforce.com nor the names of its contributors may
   * be used to endorse or promote products derived from this software without
   * specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
   * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
   * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
   * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   * POSSIBILITY OF SUCH DAMAGE.
   */
  if (!domain) {
    return null;
  }
  if (domain.match(/^\./)) {
    return null;
  }

  domain = domain.toLowerCase();
  var parts = domain.split('.').reverse();

  var suffix = '';
  var suffixLen = 0;
  for (var i=0; i<parts.length; i++) {
    var part = parts[i];
    var starstr = '*'+suffix;
    var partstr = part+suffix;

    if (index[starstr]) { // star rule matches
      suffixLen = i+1;
      if (index[partstr] === false) { // exception rule matches (NB: false, not undefined)
        suffixLen--;
      }
    } else if (index[partstr]) { // exact match, not exception
      suffixLen = i+1;
    }

    suffix = '.'+part+suffix;
  }

  if (index['*'+suffix]) { // *.domain exists (e.g. *.kyoto.jp for domain='kyoto.jp');
    return null;
  }

  if (suffixLen && parts.length > suffixLen) {
    return parts.slice(0,suffixLen+1).reverse().join('.');
  }

  return null;
}

function checkPublicSuffix(give,get) {
  var got = getPublicSuffix(give);
  assert.equal(got, get, give+' should be '+(get==null?'NULL':get)+' but got '+got);
}

// pubSufTest() was converted to JavaScript from http://publicsuffix.org/list/test.txt
function pubSufTest() {
  // For this function-scope and this function-scope ONLY:
  // Any copyright is dedicated to the Public Domain.
  // http://creativecommons.org/publicdomain/zero/1.0/

  // NULL input.
  checkPublicSuffix(null, null);
  // Mixed case.
  checkPublicSuffix('COM', null);
  checkPublicSuffix('example.COM', 'example.com');
  checkPublicSuffix('WwW.example.COM', 'example.com');
  // Leading dot.
  checkPublicSuffix('.com', null);
  checkPublicSuffix('.example', null);
  checkPublicSuffix('.example.com', null);
  checkPublicSuffix('.example.example', null);
  // Unlisted TLD.
  checkPublicSuffix('example', null);
  checkPublicSuffix('example.example', null);
  checkPublicSuffix('b.example.example', null);
  checkPublicSuffix('a.b.example.example', null);
  // Listed, but non-Internet, TLD.
  checkPublicSuffix('local', null);
  checkPublicSuffix('example.local', null);
  checkPublicSuffix('b.example.local', null);
  checkPublicSuffix('a.b.example.local', null);
  // TLD with only 1 rule.
  checkPublicSuffix('biz', null);
  checkPublicSuffix('domain.biz', 'domain.biz');
  checkPublicSuffix('b.domain.biz', 'domain.biz');
  checkPublicSuffix('a.b.domain.biz', 'domain.biz');
  // TLD with some 2-level rules.
  checkPublicSuffix('com', null);
  checkPublicSuffix('example.com', 'example.com');
  checkPublicSuffix('b.example.com', 'example.com');
  checkPublicSuffix('a.b.example.com', 'example.com');
  checkPublicSuffix('uk.com', null);
  checkPublicSuffix('example.uk.com', 'example.uk.com');
  checkPublicSuffix('b.example.uk.com', 'example.uk.com');
  checkPublicSuffix('a.b.example.uk.com', 'example.uk.com');
  checkPublicSuffix('test.ac', 'test.ac');
  // TLD with only 1 (wildcard) rule.
  checkPublicSuffix('cy', null);
  checkPublicSuffix('c.cy', null);
  checkPublicSuffix('b.c.cy', 'b.c.cy');
  checkPublicSuffix('a.b.c.cy', 'b.c.cy');
  // More complex TLD.
  checkPublicSuffix('jp', null);
  checkPublicSuffix('test.jp', 'test.jp');
  checkPublicSuffix('www.test.jp', 'test.jp');
  checkPublicSuffix('ac.jp', null);
  checkPublicSuffix('test.ac.jp', 'test.ac.jp');
  checkPublicSuffix('www.test.ac.jp', 'test.ac.jp');
  checkPublicSuffix('kyoto.jp', null);
  checkPublicSuffix('c.kyoto.jp', null);
  checkPublicSuffix('b.c.kyoto.jp', 'b.c.kyoto.jp');
  checkPublicSuffix('a.b.c.kyoto.jp', 'b.c.kyoto.jp');
  checkPublicSuffix('pref.kyoto.jp', 'pref.kyoto.jp');  // Exception rule.
  checkPublicSuffix('www.pref.kyoto.jp', 'pref.kyoto.jp');  // Exception rule.
  checkPublicSuffix('city.kyoto.jp', 'city.kyoto.jp');  // Exception rule.
  checkPublicSuffix('www.city.kyoto.jp', 'city.kyoto.jp');  // Exception rule.
  // TLD with a wildcard rule and exceptions.
  checkPublicSuffix('om', null);
  checkPublicSuffix('test.om', null);
  checkPublicSuffix('b.test.om', 'b.test.om');
  checkPublicSuffix('a.b.test.om', 'b.test.om');
  checkPublicSuffix('songfest.om', 'songfest.om');
  checkPublicSuffix('www.songfest.om', 'songfest.om');
  // US K12.
  checkPublicSuffix('us', null);
  checkPublicSuffix('test.us', 'test.us');
  checkPublicSuffix('www.test.us', 'test.us');
  checkPublicSuffix('ak.us', null);
  checkPublicSuffix('test.ak.us', 'test.ak.us');
  checkPublicSuffix('www.test.ak.us', 'test.ak.us');
  checkPublicSuffix('k12.ak.us', null);
  checkPublicSuffix('test.k12.ak.us', 'test.k12.ak.us');
  checkPublicSuffix('www.test.k12.ak.us', 'test.k12.ak.us');


}
