'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  return app.model.passport.define('account', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0手机号；1邮箱',
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
        name: 'user_id_type',
        unique: true,
        fields: ['user_id', 'type'],
      },
      {
        name: 'name',
        unique: true,
        fields: ['name'],
      }
    ],
    comment: '登录账户',
  });
};
