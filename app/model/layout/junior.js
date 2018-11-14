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
    num: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    classify: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '0非行列；1普行；2普列；3普行列取普行；4组行；5组列；6组行列',
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
        name: 'num',
        fields: ['num'],
      },
      {
        name: 'classify_num',
        fields: ['classify', 'num'],
      },
    ],
    comment: '初级布局数据',
  });
};
