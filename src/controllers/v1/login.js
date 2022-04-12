import { Router } from 'express';
import JWTUtils from '../../utils/jwtUtils';
import models from '../../models';
import { runAsyncWrapper } from '../../utils/runAsyncWrapper';

const router = Router();
const { User } = models;

router.post(
  '/login',
  runAsyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.comparePasswords(password, user.password))
      return res.status(401).send({ success: false, message: 'Invalid Credentials' });

    const payload = { email };
    const accessToken = JWTUtils.generateAccessToken(payload);
    const savedRefreshToken = await user.getRefreshToken();

    let refreshToken;

    if (!savedRefreshToken || !savedRefreshToken.token) {
      refreshToken = JWTUtils.generateRefreshToken(payload);

      if (!savedRefreshToken) {
        await user.createRefreshToken({ token: refreshToken });
      } else if (!savedRefreshToken.token) {
        user.RefreshToken.token = refreshToken;
        await user.RefreshToken.save();
      } else {
        refreshToken = savedRefreshToken.token;
      }
      return res
        .status(200)
        .send({ success: true, message: 'Successfully Logged in', data: { accessToken, refreshToken } });
    }
  })
);

export default router;
