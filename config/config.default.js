'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = 'sketch2code.net';

  config.session = {
    key: 'sessionid',
    maxAge: 15 * 24 * 3600 * 1000,
    domain: 'sketch2code.net',
  };

  config.middleware = ['jsConfig', 'report'];

  config.view = {
    defaultViewEngine: 'migi',
    defaultExtension: '.js',
    mapping: {
      '.html': 'nunjucks',
      '.htm': 'nunjucks',
      '.js': 'migi',
    },
  };

  config.sequelize = {
    datasources: [
      {
        dialect: 'mysql',
        host: '',
        port: '3306',
        username: 'root',
        password: '',
        delegate: 'model.passport',
        baseDir: 'model/passport',
        database: 'passport',
        define: {
          freezeTableName: true,
          underscored: true,
          timestamps: false,
          charset: 'utf8mb4',
          dialectOptions: {
            collate: 'utf8mb4_unicode_ci',
          },
        },
      },
      {
        dialect: 'mysql',
        host: '',
        port: '3306',
        username: 'root',
        password: '',
        delegate: 'model.user',
        baseDir: 'model/user',
        database: 'user',
        define: {
          freezeTableName: true,
          underscored: true,
          timestamps: false,
          charset: 'utf8mb4',
          dialectOptions: {
            collate: 'utf8mb4_unicode_ci',
          },
        },
      },
      {
        dialect: 'mysql',
        host: '',
        port: '3306',
        username: 'root',
        password: '',
        delegate: 'model.audio',
        baseDir: 'model/audio',
        database: 'audio',
        define: {
          freezeTableName: true,
          underscored: true,
          timestamps: false,
          charset: 'utf8mb4',
          dialectOptions: {
            collate: 'utf8mb4_unicode_ci',
          },
        },
      },
      {
        dialect: 'mysql',
        host: '',
        port: '3306',
        username: 'root',
        password: '',
        delegate: 'model.video',
        baseDir: 'model/video',
        database: 'video',
        define: {
          freezeTableName: true,
          underscored: true,
          timestamps: false,
          charset: 'utf8mb4',
          dialectOptions: {
            collate: 'utf8mb4_unicode_ci',
          },
        },
      },
      {
        dialect: 'mysql',
        host: '',
        port: '3306',
        username: 'root',
        password: '',
        delegate: 'model.work',
        baseDir: 'model/work',
        database: 'work',
        define: {
          freezeTableName: true,
          underscored: true,
          timestamps: false,
          charset: 'utf8mb4',
          dialectOptions: {
            collate: 'utf8mb4_unicode_ci',
          },
        },
      },
    ],
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
    time: 60,
    longTime: 1800,
  };

  config.weibo = {
    appKey: '',
    appSecret: '',
    redirect: 'http://passport.ciyuan.site/oauth/weibo_login',
  };

  config.aliyun = {
    oss: {
      region: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
    },
    sms: {
      accessKeyId: '',
      secretAccessKey: '',
    },
    dm: {
      accessKeyId: '',
      secretAccessKey: '',
    },
  };

  config.host = 'http://ciyuan.site';
  config.hostAssets = '//zhuanquan.xin';
  config.hostPassport = 'http://passport.ciyuan.site';
  config.hostMy = 'http://my.ciyuan.site';
  config.hostAudio = 'http://audio.ciyuan.site';
  config.hostVideo = 'http://video.ciyuan.site';
  config.hostImage = 'http://image.ciyuan.site';
  config.hostText = 'http://text.ciyuan.site';
  config.hostUpload = 'http://upload.ciyuan.site';

  return config;
};
