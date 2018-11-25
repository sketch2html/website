'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  return app.model.layout.define('row', {
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
      comment: '0等分行；1非等分行',
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
        name: 'row',
        fields: ['row'],
      },
      {
        name: 'classify_row',
        fields: ['classify', 'row'],
      },
    ],
    comment: '等分行布局数据',
  });
};
