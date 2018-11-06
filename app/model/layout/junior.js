'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  return app.model.layout.define('junior', {
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
    },
    col: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    num: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    classify: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    forecast: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
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
      {
        name: 'classify_forecast',
        fields: ['classify', 'forecast'],
      },
    ],
    comment: '初级布局数据',
  });
};
