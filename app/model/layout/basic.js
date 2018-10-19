'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  return app.model.layout.define('basic', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    data: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    num: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 3,
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
        name: 'num_create_time',
        fields: ['num', 'create_time'],
      },
    ],
    comment: '基本布局数据',
  });
};
