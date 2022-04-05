import TestHelpers from '../testsHelpers';
import models from '../../src/models';

describe('User', () => {
  beforeAll(async () => {
    await TestHelpers.startDB();
  });
  afterAll(async () => {
    await TestHelpers.stopDB();
  });
  //
  describe('static methods', () => {
    // test hashed password
    describe('hashPassword', () => {
      it('Should encrypt the password correctly', async () => {
        const { User } = models;
        const password = 'Test123#@';
        const hashedPassword = await User.hashPassword(password);
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual(password);
      });
    });
    // compare passwords
    describe('comparePasswords', () => {
      it('Should return trueif the hashed password is the sameas the original password', async () => {
        const { User } = models;
        const password = 'Test123#@';
        const hashedPassword = await User.hashPassword(password);
        const arePasswordsEqual = await User.comparePassword(password, hashedPassword);
        expect(arePasswordsEqual).toBe(true);
      });

      it('Should return false if password is incorrect', async () => {
        const { User } = models;
        const password = 'Test123#@';
        const hashedPassword = await User.hashPassword(password);
        const arePasswordsEqual = await User.comparePassword('test123!', hashedPassword);
        expect(arePasswordsEqual).toBe(false);
      });
    });
    // test hooks
    describe('hooks', () => {
      beforeEach(async () => {
        await TestHelpers.syncDb();
      });

      it('Should create user with a hashed password', async () => {
        const { User } = models;
        const email = 'test@example.com';
        const password = 'Test123#';
        const username = 'test';
        await User.create({ email, password, username });
        const users = await User.findAll();
        expect(users.length).toBe(1);
        expect(users[0].email).toEqual(email);
        expect(users[0].username).toEqual(username);
        expect(users[0].password).not.toEqual(password);
      });
    });
  });
});
