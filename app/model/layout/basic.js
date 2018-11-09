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
    },
    direction: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    classify: {
      type: Sequelize.TINYINT,
      allowNull: false,
      comment: '0不成组；1成组',
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
        name: 'num_direction',
        fields: ['num', 'direction'],
      },
      {
        name: 'direction',
        fields: ['direction'],
      },
      {
        name: 'classify_direction',
        fields: ['classify', 'direction'],
      },
    ],
    comment: '基础布局数据',
  });
};
