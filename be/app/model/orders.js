/* indent size: 2 */

module.exports = (app) => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_code: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      receive_goods_date: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      waybill_number: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      goods_number: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      goods_name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      transport_mode: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(2048),
        allowNull: true,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      inner_size_length: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      inner_size_width: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      inner_size_height: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      volume: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      packing_cost: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      client_freight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      stuffing_number: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      warehouse_size_length: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      warehouse_size_width: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      warehouse_size_height: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      warehouse_volumn: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cost_unit_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cost_packing_cost: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      warehouse_freight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "client_cost_to_be_record",
          "cost_to_be_record",
          "cost_to_be_pay",
          "cost_has_payed"
        ),
        allowNull: false,
        defaultValue: "cost_to_be_record",
      },
      payed_at: {
        type: DataTypes.TIME,
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
    },
    {
      tableName: "orders",
    }
  );

  Model.associate = function () {};

  return Model;
};
