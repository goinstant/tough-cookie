import * as validators from '../validators'

/**
 * Generates the permutation of all possible values that {@link pathMatch} the `path` parameter.
 * The array is in longest-to-shortest order.  Useful when building custom {@link Store} implementations.
 *
 * @example
 * ```
 * permutePath('/foo/bar/')
 * // ['/foo/bar/', '/foo/bar', '/foo', '/']
 * ```
 *
 * @param path - the path to generate permutations for
 * @public
 */
export function permutePath(path: string): string[] {
  validators.validate(validators.isString(path))
  if (path === '/') {
    return ['/']
  }
  const permutations = [path]
  while (path.length > 1) {
    const lindex = path.lastIndexOf('/')
    if (lindex === 0) {
      break
    }
    path = path.slice(0, lindex)
    permutations.push(path)
  }
  permutations.push('/')
  return permutations
}
