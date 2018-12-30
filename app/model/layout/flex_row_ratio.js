'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  return app.model.layout.define('flex_row_ratio', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    w1: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    w2: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    space: {
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
        name: 'w1_w2_space',
        fields: ['w1', 'w2', 'space'],
      },
      {
        name: 'classify',
        fields: ['classify'],
      },
    ],
    comment: '等分列数据',
  });
};
