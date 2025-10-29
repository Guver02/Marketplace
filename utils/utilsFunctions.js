function getClientIP(req) {
  const xForwardedFor = req.headers['x-forwarded-for'];
  let ip = xForwardedFor
    ? xForwardedFor.split(',')[0]
    : req.socket.remoteAddress;

  //For local
  if (ip === '::1' || ip === '127.0.0.1') {
    return '127.0.0.1';
  }

  if (ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  return ip;
}


module.exports = {getClientIP};
