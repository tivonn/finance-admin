/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('bank_reports', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    bank_report_date: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    bank_in: {
      type: "DOUBLE",
      allowNull: false
    },
    bank_out: {
      type: "DOUBLE",
      allowNull: false
    },
    remain: {
      type: "DOUBLE",
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    first_level_classify: {
      type: DataTypes.ENUM('manage_cost', 'business_cost', 'finance_cost', 'bonus', 'cost_receivable', 'cost_payable', 'other_cost_receivable', 'cost_allot', 'cost_real_in', 'short_borrow_cost', 'bank_save_cost', 'other_cost_in'),
      allowNull: true
    },
    second_level_detail: {
      type: DataTypes.ENUM('work_cost', 'tel_cost', 'salary_cost', 'social_security_cost', 'rent_cost', 'packing_cost', 'royalty_cost', 'cash', 'middle_cost', 'accrual_cost', 'service_cost', 'all_profit_cost', 'accrual_in_cost', 'bonus', 'th_cost', 'freight_cost'),
      allowNull: true
    },
    project: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    exchange_rate: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '5'
    },
    rmb_in: {
      type: "DOUBLE",
      allowNull: true
    },
    rmb_out: {
      type: "DOUBLE",
      allowNull: true
    },
    rmb_remain: {
      type: "DOUBLE",
      allowNull: true
    },
    pay_currency: {
      type: DataTypes.ENUM('CNY', 'THB'),
      allowNull: false
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
    },
    is_delete: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'bank_reports'
  });

  Model.associate = function () {

  }

  return Model;
};
