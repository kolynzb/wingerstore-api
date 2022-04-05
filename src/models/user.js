import { Model, DataTypes } from 'sequelize';
import bcrpyt from 'bcrypt';
import environment from '../config/environment';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models['Role']);
      User.hasOne(models['RefreshToken']);
    }

    static async hashPassword(password) {
      return await bcrpyt.hash(password, environment.saltRounds);
    }

    static async comparePassword(candidatePassword, password) {
      return await bcrpyt.compare(candidatePassword, password);
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Not A Email Address',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 50],
            msg: 'First Name has too many characters',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 50],
            msg: 'Last Name has too many characters',
          },
        },
      },
    },
    { sequelize, modelName: 'User', indexes: [{ unique: true, fields: ['email'] }] }
  );

  // This hook is run before saving
  User.beforeSave(async (user, options) => {
    const hashedPassword = await User.hashPassword(user.password);
    user.password = hashedPassword;
  });

  return User;
};
