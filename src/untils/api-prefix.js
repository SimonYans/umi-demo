let proxy;
if (process.env.NODE_ENV === "development") {
  proxy = '/proxyApi'
}else {
  proxy = ''
}
export const makeApi = function (uri) {
  let prefix = '/icip'
  if (uri) {
    return proxy + prefix + uri
  }
  return proxy + prefix
}

export const authApi = function (uri) {
  let prefix = '/auth'
  if (uri) {
    return proxy + prefix + uri
  }
  return proxy + prefix
}

export const iopApi = function (uri) {
  let prefix = '/ladder-iop'
  if (uri) {
    return proxy + prefix + uri
  }
  return proxy + prefix
}

export const quoteApi = function (uri) {
  let prefix = '/iop-quote'
  if (uri) {
    return proxy + prefix + uri
  }
  return proxy + prefix
}

export const serviceApi = function (uri) {
  let prefix = '/iop-serving'
  if (uri) {
    return proxy + prefix + uri
  }
  return proxy + prefix
}
