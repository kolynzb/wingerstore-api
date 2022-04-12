import request from 'supertest';
import TestHelpers from '../testsHelpers';
import models from '../../src/models';

describe('Register', () => {
  let app;
  let newUserResponse;
  beforeAll(async () => {
    await TestHelpers.startDB();
    app = TestHelpers.getApp();
  });
  afterAll(async () => {
    await TestHelpers.stopDB();
  });
  beforeEach(async () => {
    await TestHelpers.syncDb();
    newUserResponse = await TestHelpers.registerNewUser();
  });

  it('should Login user successfully and store refreshToken in the database ', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'test123#' })
      .expect(200);

    const refreshToken = response.body.data.refreshToken;
    const {RefreshToken} = models;
    

  });
});
