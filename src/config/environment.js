const environment = {
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || 'production',
  saltRounds: process.env.SALT_ROUNDS || 10,
  jwtAcessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    'd1b1089f2e438091b969a2023da0ac971515fdb3bbfa5e62906eb9d7576a1a8d69512f498e8ff1b7f8f4b7bc4896b0876212649bd9c9a1c41829051c80d844d4',
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    '1f2722835b4aaf5760a4f4b5df5d7bf03ab07e7835b3cf502eae0616ade83cd5dc427b04c5ffd8571e0706d5cc2058b267bed4d55200c485d29aa0290a87fe88',
};

export default environment;
