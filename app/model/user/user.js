'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  return app.model.user.define('user', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    password: {
      type: Sequelize.CHAR(32),
      allowNull: false,
    },
    sex: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0未知，1男，2女，3其它',
    },
    head_url: {
      type: Sequelize.STRING(256),
      allowNull: true,
    },
    sign: {
      type: Sequelize.STRING(256),
      allowNull: true,
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    update_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'nickname',
        unique: true,
        fields: ['nickname'],
      },
    ],
    initialAutoIncrement: 2066000000000000,
    comment: '用户基本信息',
  });
};
