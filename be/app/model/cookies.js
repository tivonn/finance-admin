/* indent size: 2 */

module.exports = (app) => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    "cookies",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      cookie: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      expires: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      create_at: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      },
      update_at: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "cookies",
    }
  );

  Model.associate = function () {};

  return Model;
};
