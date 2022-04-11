import { Router } from 'express';
import JWTUtils from '../../utils/jwtUtils';
import models from '../../models';
import { runAsyncWrapper } from '../../utils/runAsyncWrapper';
import JwtUtils from '../../utils/jwtUtils';

const router = Router();
const { User, Role, sequelize } = models;

router.post(
  '/register',
  runAsyncWrapper(async (req, res, next) => {
    const { email, password, roles, username } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) return res.status(200).send({ success: false, message: 'User Already Exists' });

    try {
      const result = await sequelize.transaction(async () => {
        const newUser = await User.create({ email, password, username });
        const payload = { email: newUser.email, username: newUser.username };
        const accessToken = JwtUtils.generateAccessToken(payload);
        const refreshToken = JwtUtils.generateRefreshToken(payload);
        await newUser.createRefreshToken({ token: refreshToken });

        if (roles && Array.isArray(roles)) {
          const rolesToSave = [];
          for (const role of roles) {
            const newRole = await Role.create({ role });
            rolesToSave.push(newRole);
          }

          await newUser.addRoles(rolesToSave);
        }
        return { accessToken, refreshToken }
      });
     
      const { accessToken, refreshToken } = result 
      return res
        .status(200)
        .send({ success: true, message: 'User Created Successfully', data: { accessToken, refreshToken } });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send({ success: false, message: err.message });
    }
  })
);

export default router;
