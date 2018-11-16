const Sequelize = require('sequelize');

async function layout(u, p, host) {
  let basic = require('./app/model/layout/basic');
  let junior = require('./app/model/layout/junior');
  let row = require('./app/model/layout/row');
  let col = require('./app/model/layout/col');
  let senior = require('./app/model/layout/senior');
  let sequelize = new Sequelize('layout', u, p, {
    host: host,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_unicode_ci',
      },
    },
  });
  basic = basic({
    Sequelize,
    model: {
      layout: sequelize,
    },
  });
  junior = junior({
    Sequelize,
    model: {
      layout: sequelize,
    },
  });
  row = row({
    Sequelize,
    model: {
      layout: sequelize,
    },
  });
  col = col({
    Sequelize,
    model: {
      layout: sequelize,
    },
  });
  senior = senior({
    Sequelize,
    model: {
      layout: sequelize,
    },
  });
  await basic.sync({ alter: true });
  await junior.sync({ alter: true });
  await row.sync({ alter: true });
  await col.sync({ alter: true });
  await senior.sync({ alter: true });
}
async function passport(u, p, host) {
  let oauth = require('./app/model/passport/oauth');
  let account = require('./app/model/passport/account');
  let sequelize = new Sequelize('passport', u, p, {
    host: host,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_unicode_ci',
      },
    },
  });
  oauth = oauth({
    Sequelize,
    model: {
      passport: sequelize,
    },
  });
  account = account({
    Sequelize,
    model: {
      passport: sequelize,
    },
  });
  await oauth.sync({ alter: true });
  await account.sync({ alter: true });
}
async function user(u, p, host) {
  let user = require('./app/model/user/user');
  let admin = require('./app/model/user/admin');
  let sequelize = new Sequelize('user', u, p, {
    host: host,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_unicode_ci',
      },
    },
  });
  user = user({
    Sequelize,
    model: {
      user: sequelize,
    },
  });
  admin = admin({
    Sequelize,
    model: {
      user: sequelize,
    },
  });
  await user.sync({ alter: true });
  await admin.sync({ alter: true });
}

async function exec() {
  let u = 'root';
  let p = '';
  let host = 'localhost';
  await layout(u, p, host);
  // await passport(u, p, host);
  // await user(u, p, host);
  console.warn('end');
}
exec();
