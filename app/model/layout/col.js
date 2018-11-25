'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  return app.model.layout.define('col', {
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
    classify: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '0等分列；1非等分列',
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
        name: 'col',
        fields: ['col'],
      },
      {
        name: 'classify_col',
        fields: ['classify', 'col'],
      },
    ],
    comment: '等分列布局数据',
  });
};
