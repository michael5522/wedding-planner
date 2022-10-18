/* eslint-disable */
export default function parseRoute(hashRoute) {
  console.log('111 hashroute', hashRoute);
  if (hashRoute.startsWith('#')) {
    // console.log('parse route');
    hashRoute = hashRoute.replace('#', '');
  }
  // console.log('222', hashRoute);
  const [path, queryString] = hashRoute.split('?');
  // console.log('333', path);
  // console.log('444', queryString);
  const params = new URLSearchParams(queryString);
  return { path, params };
}
