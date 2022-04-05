import JWTUtils from '../utils/jwtUtils';

export default requiresAuth =
  (tokenType = 'accessToken') =>
  (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ success: false, message: 'Authorization Header Not found' });

    try {
      var [bearer, token] = authHeader.split('');

      if (bearer.toLowerCase() !== 'bearer' || !token) {
        throw Error;
      }
    } catch (err) {
      return res.status(500).send({ success: false, message: 'Bearer Token Malformed' });
    }

    try {
      let jwt;
      switch (tokenType) {
        case 'refreshToken':
          jwt = JWTUtils.verifyRefreshToken(token);
        case 'accessToken':
        default:
          jwt = JWTUtils.verifyAccessToken(token);
      }
    } catch (err) {
      return res.status(500).send({ success: false, message: 'Invalid token' });
    }
  };
