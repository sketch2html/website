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
      type: Sequelize.TINYINT,
      allowNull: false,
      comment: '0 2行独立；1 2行；2 3列；3 1:2且2行；4 1:2且2列；5 2:1且2行；6 2:1且两列',
    },
    forecast: {
      type: Sequelize.TINYINT,
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
    comment: '高级布局数据',
  });
};
