/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('profit_reports', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    project: {
      type: DataTypes.ENUM('append', 'business_besides_in', 'business_besides_out', 'income'),
      allowNull: true
    },
    money: {
      type: "DOUBLE",
      allowNull: true
    },
    create_at: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'profit_reports'
  });

  Model.associate = function () {

  }

  return Model;
};
