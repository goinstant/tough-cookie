import { toASCII } from 'punycode/punycode.js'
import { IP_V6_REGEX_OBJECT } from './constants'
import type { Nullable } from '../utils'

/**
 * Transforms a domain name into a canonical domain name. The canonical domain name is a domain name
 * that has been trimmed, lowercased, stripped of leading dot, and optionally punycode-encoded
 * ({@link https://www.rfc-editor.org/rfc/rfc6265.html#section-5.1.2 | Section 5.1.2 of RFC 6265}). For
 * the most part, this function is idempotent (calling the function with the output from a previous call
 * returns the same output).
 *
 * @remarks
 * A canonicalized host name is the string generated by the following
 * algorithm:
 *
 * 1.  Convert the host name to a sequence of individual domain name
 *     labels.
 *
 * 2.  Convert each label that is not a Non-Reserved LDH (NR-LDH) label,
 *     to an A-label (see Section 2.3.2.1 of [RFC5890] for the former
 *     and latter), or to a "punycode label" (a label resulting from the
 *     "ToASCII" conversion in Section 4 of [RFC3490]), as appropriate
 *     (see Section 6.3 of this specification).
 *
 * 3.  Concatenate the resulting labels, separated by a %x2E (".")
 *     character.
 *
 * @example
 * ```
 * canonicalDomain('.EXAMPLE.com') === 'example.com'
 * ```
 *
 * @param domainName - the domain name to generate the canonical domain from
 * @public
 */
export function canonicalDomain(
  domainName: Nullable<string>,
): string | undefined {
  if (domainName == null) {
    return undefined
  }
  let str = domainName.trim().replace(/^\./, '') // S4.1.2.3 & S5.2.3: ignore leading .

  if (IP_V6_REGEX_OBJECT.test(str)) {
    if (!str.startsWith('[')) {
      str = '[' + str
    }
    if (!str.endsWith(']')) {
      str = str + ']'
    }
    return new URL(`http://${str}`).hostname.slice(1, -1) // remove [ and ]
  }

  // convert to IDN if any non-ASCII characters
  // eslint-disable-next-line no-control-regex
  if (/[^\u0001-\u007f]/.test(str)) {
    str = toASCII(str)
  }

  return str.toLowerCase()
}
