import request from 'supertest';
import TestHelpers from '../testsHelpers';
import models from '../../src/models';

describe('Register', () => {
  let app;
  beforeAll(async () => {
    await TestHelpers.startDB();
    app = TestHelpers.getApp();
  });
  afterAll(async () => {
    await TestHelpers.stopDB();
  });
  beforeEach(async () => {
    await TestHelpers.syncDb();
  });

  it('Should Register Successfully', async () => {
    await request(app)
      .post('/v1/register')
      .send({ email: 'test@example.com', username: 'tester', password: 'test123#' })
      .expect(200);
    const { User } = models;
    const user = await User.findAll();
    expect(user.length).toEqual(1);
    expect(user[0].email).toEqual('test@example.com');
  });

  it('Should Register Successfully with roles', async () => {
    await request(app)
      .post('/v1/register')
      .send({ email: 'test@example.com', username: 'tester', password: 'test123#', roles: ['admin', 'customer'] })
      .expect(200);
    const { User, Role } = models;
    const users = await User.findAll({ include: Role });
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@example.com');
    const roles = users[0]['Roles'];
    expect(roles.length).toEqual(2);
    expect(roles[0].role).toEqual('admin');
    expect(roles[1].role).toEqual('customer');
  });

  it('should not create a new user if it already exists', async () => {
    await request(app)
      .post('/v1/register')
      .send({ email: 'test@example.com', username: 'tester', password: 'test123#' })
      .expect(200);
    const response = await request(app)
      .post('/v1/register')
      .send({ email: 'test@example.com', username: 'tester', password: 'test123#' })
      .expect(200);

    expect(response.body).toEqual({ success: false, message: 'User Already Exists' });
  });
});
