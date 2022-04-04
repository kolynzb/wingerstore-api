import jwt from 'jsonwebtoken';
import environment from '../config/environment';

class JwtUtils {
  static generateAccessToken(payload, options = {}) {
    const { expiresIn = '1d' } = options; //expires in   by default
    return jwt.sign(payload, environment.jwtAcessTokenSecret, { expiresIn });
  }
  static generateRefreshToken(payload) {
    return jwt.sign(payload, environment.jwtRefreshTokenSecret);
  }
  static verifyAccessToken(token) {
    return jwt.verify(token, environment.jwtAcessTokenSecret);
  }
  static verifyRefreshToken(token) {
    return jwt.verify(token, environment.jwtRefreshTokenSecret);
  }
}

export default JwtUtils;
