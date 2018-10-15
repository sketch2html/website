'use strict';

// had enabled by egg
exports.static = true;

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.migi = {
  enable: true,
  package: 'egg-view-migi',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};
