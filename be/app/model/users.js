/* indent size: 2 */

module.exports = (app) => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      account: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("admin", "finance", "staff", "external"),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(64),
        allowNull: true,
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
      is_delete: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: "0",
      },
      phone_number: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      tableName: "users",
    }
  );

  Model.associate = function () {};

  return Model;
};
