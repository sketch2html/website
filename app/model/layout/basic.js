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
    row: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 3,
    },
    col: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 3,
    },
    num: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 3,
    },
    type: {
      type: Sequelize.BOOLEAN,
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
        name: 'num_col_row',
        fields: ['num', 'col', 'row'],
      },
      {
        name: 'col_row',
        fields: ['col', 'row'],
      },
    ],
    comment: '基本布局数据',
  });
};
