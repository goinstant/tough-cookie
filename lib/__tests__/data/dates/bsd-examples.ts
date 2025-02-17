export default [
  {
    test: 'Sat, 15-Apr-17 21:01:22 GMT',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Thu, 19-Apr-2007 16:00:00 GMT',
    expected: 'Thu, 19 Apr 2007 16:00:00 GMT',
  },
  {
    test: 'Wed, 25 Apr 2007 21:02:13 GMT',
    expected: 'Wed, 25 Apr 2007 21:02:13 GMT',
  },
  {
    test: 'Thu, 19/Apr\\2007 16:00:00 GMT',
    expected: 'Thu, 19 Apr 2007 16:00:00 GMT',
  },
  {
    test: 'Fri, 1 Jan 2010 01:01:50 GMT',
    expected: 'Fri, 01 Jan 2010 01:01:50 GMT',
  },
  {
    test: 'Wednesday, 1-Jan-2003 00:00:00 GMT',
    expected: 'Wed, 01 Jan 2003 00:00:00 GMT',
  },
  {
    test: ', 1-Jan-2003 00:00:00 GMT',
    expected: 'Wed, 01 Jan 2003 00:00:00 GMT',
  },
  {
    test: ' 1-Jan-2003 00:00:00 GMT',
    expected: 'Wed, 01 Jan 2003 00:00:00 GMT',
  },
  {
    test: '1-Jan-2003 00:00:00 GMT',
    expected: 'Wed, 01 Jan 2003 00:00:00 GMT',
  },
  {
    test: 'Wed,18-Apr-07 22:50:12 GMT',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'WillyWonka  , 18-Apr-07 22:50:12 GMT',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'WillyWonka  , 18-Apr-07 22:50:12',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'WillyWonka  ,  18-apr-07   22:50:12',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'Mon, 18-Apr-1977 22:50:13 GMT',
    expected: 'Mon, 18 Apr 1977 22:50:13 GMT',
  },
  {
    test: 'Mon, 18-Apr-77 22:50:13 GMT',
    expected: 'Mon, 18 Apr 1977 22:50:13 GMT',
  },
  {
    test: '"Sat, 15-Apr-17\\"21:01:22\\"GMT"',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Partyday, 18- April-07 22:50:12',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'Partyday, 18 - Apri-07 22:50:12',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'Wednes, 1-Januar-2003 00:00:00 GMT',
    expected: 'Wed, 01 Jan 2003 00:00:00 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22 GMT-2',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22 GMT BLAH',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22 GMT-0400',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22 GMT-0400 (EDT)',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22 DST',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22 -0400',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22 (hello there)',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22 11:22:33',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 ::00 21:01:22',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 boink:z 21:01:22',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 91:22:33 21:01:22',
    expected: null,
  },
  {
    test: 'Thu Apr 18 22:50:12 2007 GMT',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: '22:50:12 Thu Apr 18 2007 GMT',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'Thu 22:50:12 Apr 18 2007 GMT',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'Thu Apr 22:50:12 18 2007 GMT',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'Thu Apr 18 22:50:12 2007 GMT',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'Thu Apr 18 2007 22:50:12 GMT',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'Thu Apr 18 2007 GMT 22:50:12',
    expected: 'Wed, 18 Apr 2007 22:50:12 GMT',
  },
  {
    test: 'Sat, 15-Apr-17 21:01:22 GMT',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: '15-Sat, Apr-17 21:01:22 GMT',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: '15-Sat, Apr 21:01:22 GMT 17',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: '15-Sat, Apr 21:01:22 GMT 2017',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: '15 Apr 21:01:22 2017',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: '15 17 Apr 21:01:22',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Apr 15 17 21:01:22',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: 'Apr 15 21:01:22 17',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: '2017 April 15 21:01:22',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: '15 April 2017 21:01:22',
    expected: 'Sat, 15 Apr 2017 21:01:22 GMT',
  },
  {
    test: '98 April 17 21:01:22',
    expected: null,
  },
  {
    test: 'Thu, 012-Aug-2008 20:49:07 GMT',
    expected: null,
  },
  {
    test: 'Thu, 12-Aug-31841 20:49:07 GMT',
    expected: null,
  },
  {
    test: 'Thu, 12-Aug-9999999999 20:49:07 GMT',
    expected: null,
  },
  {
    test: 'Thu, 999999999999-Aug-2007 20:49:07 GMT',
    expected: null,
  },
  {
    test: 'Thu, 12-Aug-2007 20:61:99999999999 GMT',
    expected: null,
  },
  {
    test: 'IAintNoDateFool',
    expected: null,
  },
] as const
