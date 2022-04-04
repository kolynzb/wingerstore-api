import bcrpyt from 'bcrypt';
import environment from '../config/environment';

class PasswordUtils {
  static async hashPassword(password) {
    return await bcrpyt.hash(password, environment.saltRounds);
  }
  static async comparePassword(candidatePassword, password) {
    return await bcrpyt.compare(candidatePassword, password);
  }
}

export default PasswordUtils;
