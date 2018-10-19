'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  return app.model.passport.define('oauth', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    open_id: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '0微博；1微信；2qq',
    },
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
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
        name: 'open_id_type',
        unique: true,
        fields: ['open_id', 'type'],
      }
    ],
    comment: 'oauth账户',
  });
};
