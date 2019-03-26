function route(handle,pathname) {
  console.log("About to route a request for " + pathname);
  if(pathname == '/favicon.ico') return "123"
  if(pathname[0]=="/")pathname = pathname.slice(1)
  // console.log(handle,pathname)
  if (typeof(handle[pathname]) === 'function') {
    return handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
    return "404"
  }
}

exports.route = route;