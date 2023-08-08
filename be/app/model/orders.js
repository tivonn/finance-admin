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
        type: "DOUBLE",
        allowNull: false,
      },
      inner_size_length: {
        type: "DOUBLE",
        allowNull: true,
      },
      inner_size_width: {
        type: "DOUBLE",
        allowNull: true,
      },
      inner_size_height: {
        type: "DOUBLE",
        allowNull: false,
      },
      volume: {
        type: "DOUBLE",
        allowNull: false,
      },
      unit_price: {
        type: "DOUBLE",
        allowNull: true,
      },
      packing_cost: {
        type: "DOUBLE",
        allowNull: true,
      },
      client_freight: {
        type: "DOUBLE",
        allowNull: true,
      },
      stuffing_number: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      warehouse_size_length: {
        type: "DOUBLE",
        allowNull: true,
      },
      warehouse_size_width: {
        type: "DOUBLE",
        allowNull: true,
      },
      warehouse_size_height: {
        type: "DOUBLE",
        allowNull: true,
      },
      warehouse_volumn: {
        type: "DOUBLE",
        allowNull: true,
      },
      cost_unit_price: {
        type: "DOUBLE",
        allowNull: true,
      },
      cost_packing_cost: {
        type: "DOUBLE",
        allowNull: true,
      },
      warehouse_freight: {
        type: "DOUBLE",
        allowNull: true,
      },
      payed_date: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      pay_currency: {
        type: DataTypes.ENUM("CNY", "THB"),
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
      status: {
        type: DataTypes.ENUM(
          "client_cost_to_be_record",
          "warehouse_cost_to_be_record",
          "finance_cost_to_be_record",
          "cost_to_be_pay",
          "cost_has_payed"
        ),
        allowNull: false,
        defaultValue: "client_cost_to_be_record",
      },
      pay_currency: {
        type: DataTypes.ENUM("CNY", "THB"),
        allowNull: true,
      },
      good_value: {
        type: "DOUBLE",
        allowNull: true,
      },
      rate: {
        type: "DOUBLE",
        allowNull: true,
      },
      insurance: {
        type: "DOUBLE",
        allowNull: true,
      },
      disbursements: {
        type: "DOUBLE",
        allowNull: true,
      },
      compensate: {
        type: "DOUBLE",
        allowNull: true,
      },
    },
    {
      tableName: "orders",
    }
  );

  Model.associate = function () {};

  return Model;
};
