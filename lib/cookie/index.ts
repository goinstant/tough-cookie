// This file contains the exports from v4's lib/cookie.js, provided to minimize
// the need to update imports in dependent projects.

export { MemoryCookieStore } from '../memstore'
export { pathMatch } from '../pathMatch'
export { permuteDomain } from '../permuteDomain'
export { getPublicSuffix } from '../pubsuffix-psl'
export { Store } from '../store'
export { ParameterError } from '../validators'
export { version } from '../version'

export { canonicalDomain } from './canonicalDomain'
export { PrefixSecurityEnum } from './constants'
export { Cookie } from './cookie'
export { cookieCompare } from './cookieCompare'
export { CookieJar } from './cookieJar'
export { defaultPath } from './defaultPath'
export { domainMatch } from './domainMatch'
export { formatDate } from './formatDate'
export { parseDate } from './parseDate'
export { permutePath } from './permutePath'

import { Cookie } from './cookie'
export const fromJSON = Cookie.fromJSON
