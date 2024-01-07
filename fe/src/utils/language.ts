import { getLocalStorage } from '@/utils/common'
import { createI18n } from 'vue-i18n'

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLocalStorage('language'),
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': {
      common: {
        info: {
          action: '操作'
        },
        actions: {
          confirm: '确定',
          cancel: '取消',
          reset: '重置',
          search: '搜索',
          monthSelectPlaceholder: '请选择月份',
          yearSelectPlaceholder: '请选择年份',
          updateUser: '编辑资料',
          logout: '退出登录'
        },
        message: {
          netError: '系统错误',
          noAuth: '无权限',
          logoutFailed: '退出登录失败',
          noModifiedPassword: '首次登录请修改密码'
        }
      },
      commonBiz: {
        user: {
          username: '用户名',
          account: '账号',
          password: '密码',
          confirmPassword: '确认密码',
          role: '角色',
          roles: {
            admin: '管理员',
            staff: '内部员工',
            finance: '财务',
            external: '外部用户'
          },
          phoneNumber: '电话号码'
        }
      },
      route: {
        overview: '总览',
        order: '订单详情',
        report: '财务报表',
        reports: {
          bankReport: '银行账',
          subjectCollect: "科目汇总",
          profit: "利润",
          subjectRemain: "科目余额",
          debt: "资产负债"
        },
        manage: '管理',
        manages: { manageUser: '用户管理' }
      },
      updateUserModal: {
        info: {
          updateUser: '编辑资料',
          phoneNumberPlaceholder: '请输入电话号码',
          passwordPlaceholder: '请输入新密码（仅需修改密码时填写）',
          confirmPasswordPlaceholder: '请重新输入新密码（仅需修改密码时填写）'
        },
        message: {
          passwordInvalid: '密码必填',
          passwordPatternInvalid: '密码要求由字母、数字组成，长度在8-20个字符',
          confirmPasswordInvalid: '两次密码输入需要一致',
          updateUserSuccess: '编辑资料成功',
          updateUserFailed: '编辑资料失败'
        }
      },
      loginView: {
        info: {
          accountPlaceholder: '请输入账号',
          passwordPlaceholder: '请输入密码'
        },
        actions: {
          login: '登录'
        },
        message: {
          formInValid: '请输入正确的账号密码',
          loginFailed: '登录失败'
        }
      },
      orderView: {
        info: {
          user_code: '用户代号',
          receive_goods_date: '收货日期',
          warehouse: '仓库',
          waybill_number: '运单号',
          goods_number: '货号',
          goods_name: '货物名称',
          transport_mode: '运输方式',
          count: '数量',
          number: '件数',
          description: '备注',
          weight: '重量/KG',
          inner_size_length: '内部尺寸/CM（长）',
          inner_size_width: '内部尺寸/CM（宽）',
          inner_size_height: '内部尺寸/CM（高）',
          volume: '体积/CBM',
          unit_price: '单价',
          good_value: '货值',
          rate: '费率',
          insurance: '保险',
          packing_cost: '打包费',
          disbursements: '垫付',
          compensate: '赔付',
          client_freight: '客户运费',
          stuffing_number: '装柜号',
          warehouse_size_length: '库房尺寸/CM（长）',
          warehouse_size_width: '库房尺寸/CM（宽）',
          warehouse_size_height: '库房尺寸/CM（高）',
          warehouse_volumn: '库房体积/CBM',
          cost_unit_price: '成本单价',
          cost_packing_cost: '成本打包费',
          warehouse_freight: '库房运费',
          payed_date: '付款日期',
          pay_currency: '付款币种',
          bank_out: '银行支出',
          CNY: '人民币',
          THB: '泰铢',
          status: '状态',
          client_cost_to_be_record: '客户费用待录入',
          warehouse_cost_to_be_record: '库房费用待录入',
          finance_cost_to_be_record: '财务费用待录入',
          cost_to_be_pay: '待付款',
          cost_has_payed: '已付款'
        },
        actions: {
          downloadTemplate: '下载模版',
          uploadExcel: '上传表格',
          downloadDeliveryBill: '导出送货单',
          confirmDeleteOrder: '确定删除订单？'
        },
        message: {
          downloadTemplateFailed: '下载模板失败',
          uploadSuccess: '表格上传成功',
          excelInvalid: '表格不符合模板要求',
          uploadFailed: '表格上传失败',
          deleteOrderSuccess: '删除订单成功',
          deleteOrderFailed: '删除订单失败',
          downloadDeliveryBillSuccess: '导出送货单成功',
          downloadDeliveryBillNoOrderFailed: '未选中订单',
          downloadDeliveryBillStatusFailed: '订单状态要求为待付款/已付款',
          downloadDeliveryBillUserCodeFailed: '用户代号要求为同一个',
          downloadDeliveryBillStuffingNumberFailed: '装柜号要求为同一个',
          downloadDeliveryBillFailed: '导出送货单失败'
        }
      },
      upsertOrderModal: {
        info: {
          updateOrder: '编辑订单',
          unitPricePlaceholder: '请输入单价',
          goodValuePlaceholder: '请输入货值',
          ratePlaceholder: '请输入费率',
          packingCostPlaceholder: '请输入打包费',
          disbursementsPlaceholder: '请输入垫付',
          compensatePlaceholder: '请输入赔付',
          stuffingNumberPlaceholder: '请输入装柜号',
          warehouseSizeLengthPlaceholder: '请输入库房尺寸/CM（长）',
          warehouseSizeWidthPlaceholder: '请输入库房尺寸/CM（宽）',
          warehouseSizeHeightPlaceholder: '请输入库房尺寸/CM（高）',
          costUnitPricePlaceholder: '请输入成本单价',
          costPackingCostPlaceholder: '请输入成本打包费',
          payedDatePlaceholder: '请输入付款日期',
          bankOutPlaceholder: '请输入银行支出',
          descriptionPlaceholder: '请输入备注',
          CNY: '人民币',
          THB: '泰铢'
        },
        message: {
          unitPriceInvalid: '单价必填',
          packingCostInvalid: '打包费必填',
          disbursementsInvalid: '垫付必填',
          compensateInvalid: '赔付必填',
          stuffingNumberInvalid: '装柜号必填',
          warehouseSizeLengthInvalid: '库房尺寸/CM（长）必填',
          warehouseSizeWidthInvalid: '库房尺寸/CM（宽）必填',
          warehouseSizeHeightInvalid: '库房尺寸/CM（高）必填',
          costUnitPriceInvalid: '成本单价必填',
          costPackingCostInvalid: '成本打包费必填',
          payedDateInvalid: '付款日期必填',
          payCurrencyInvalid: '付款币种必填',
          bankOutInvalid: '银行支出必填',
          updateOrderSuccess: '编辑订单成功',
          updateOrderFailed: '编辑订单失败',
          orderCanNotUpdate: '订单不可修改',
          rateAndInsuranceShouldTogether: '货值和费率需同时填写'
        }
      },
      reportView: {
        info: {
          empty: '财务报表页开发中'
        }
      },
      bankReportView: {
        info: {
          bankReportDate: '付款日期',
          bankIn: '银行入账',
          bankOut: '银行支出',
          remain: '余额',
          description: '备注',
          firstLevelClassify: '分类一级',
          secondLevelDetail: '二级明细',
          project: "项目",
          exchangeRate: '汇率',
          rmbIn: '人民币入账',
          rmbOut: '人民币支出',
          rmbRemain: '人民币余额',
          firstLevelClassifyFilter: { 'manage_cost': '管理费用', 'business_cost': '营业费用', 'finance_cost': '财务费用', 'bonus': '分红', 'cost_receivable': '应收账款', 'cost_payable': '应付账款', 'other_cost_receivable': '其他应收款', 'cost_allot': '利润分配', 'cost_real_in': '实收资本', 'short_borrow_cost': '短期借款', 'other_cost_in': '其他业务收入', 'accrual_in': '利息收入', 'bonus_payable': '应付分红', 'other_cost_payable': '其他应付款', 'other_cost_out': '其他业务支出' },
          secondLevelDetailFilter: {
            'work_cost': '办公费', 'tel_cost': '电信费', 'salary_cost': '工资', 'social_security_cost': '社保费', 'rent_cost': '租金', 'packing_cost': '打包材料', 'royalty_cost': '提成', 'cash': '现金', 'middle_cost': '中间费', 'accrual_cost': '利息', 'service_cost': '手续费', 'all_profit_cost': '汇兑损益', 'accrual_in_cost': '利息收入', 'bonus': '分红', 'th_cost': '泰铢', 'freight_cost': '运费', 'cash_pledge': '押金', 'last_not_pay': '上家未付款', 'not_allot_profit': '未分配利润', 'other': '其他'
          },
        },
        actions: {
          selectCNYBankReport: '中国银行',
          selectTHBBankReport: '泰国银行',
          addBankReport: "新增",
          downloadBankReport: "导出",
          deleteBankReport: "删除",
          viewInBankReport: "只看进账",
          viewOutBankReport: "只看支出"
        },
      },
      upsertBankReportModal: {
        info: {
          createBankReport: '创建银行账',
          updateBankReport: '编辑银行账',
          bankReportDatePlaceholder: '请输入付款日期',
          bankInPlaceholder: '请输入银行入账',
          bankOutPlaceholder: '请输入银行支出',
          descriptionPlaceholder: '请输入备注',
          firstLevelClassifyPlaceholder: '请选择分类一级',
          secondLevelDetailPlaceholder: '请选择二级明细',
        },
        message: {
          bankReportDateInvalid: '付款日期必填',
          bankInInvalid: '银行入账必填',
          bankOutInvalid: '银行支出必填',
          firstLevelClassifyInvalid: '分类一级必填',
          secondLevelDetailInvalid: '二级明细必填',
          createBankReportSuccess: '创建银行账成功',
          createBankReportFailed: '创建银行账失败',
        }
      },
      subjectCollectView: {
        info: {
          bankReportDate: '付款日期',
          subjectCollectProject: '项目',
          accountingSubject: '会计科目',
          detail: '明细',
          inPrice: '收款金额',
          outPrice: '支出金额',
          subjectCollectProjectFilters: {
            'manage_cost': '管理费用',
            'business_cost': '营业费用',
            'finance_cost': '财务费用',
            'bonus': '投资收益',    // 特例
            'cost_receivable': '应收账款',
            'cost_payable': '应付账款',
            'other_cost_receivable': '其他应收款',
            'cost_allot': '利润分配',
            'cost_real_in': '实收资本',
            'short_borrow_cost': '短期借款',
            'other_cost_in': '其他业务收入',
            'accrual_in': '利息收入',
            'bonus_payable': '应付分红',
            'other_cost_payable': '其他应付款',
            'other_cost_out': '其他业务支出'
          },
          total: '汇总'
        },
        actions: {
          selectCNYBankReport: '中国银行',
          selectTHBBankReport: '泰国银行',
          addBankReport: "新增",
          downloadBankReport: "导出",
          deleteBankReport: "删除",
          viewInBankReport: "只看进账",
          viewOutBankReport: "只看支出"
        }
      },
      profitView: {
        info: {
          project: "项目",
          row: "行次",
          money: '金额',
          january: '1月',
          february: '2月',
          march: '3月',
          april: '4月',
          may: '5月',
          june: '6月',
          july: '7月',
          august: '8月',
          september: '9月',
          october: '10月',
          november: '11月',
          december: '12月',
          total: '合计金额'
        },
        actions: {
          upsertProfitReport: '编辑'
        }
      },
      upsertProfitReportModal: {
        info: {
          updateProfitReport: '编辑利润表',
          year: '年份',
          month: '月份',
          monthPlaceholder: '请选择月份',
          project: '项目',
          projectPlaceholder: '请选择项目',
          money: '金额',
          moneyPlaceholder: '请填写金额',
          january: '1月',
          february: '2月',
          march: '3月',
          april: '4月',
          may: '5月',
          june: '6月',
          july: '7月',
          august: '8月',
          september: '9月',
          october: '10月',
          november: '11月',
          december: '12月',
          append: '附加',
          business_besides_in: '营业外收入',
          business_besides_out: "营业外支出",
          income: '所得税'
        },
        message: {
          monthInvalid: '月份必填',
          projectInvalid: '项目必填',
          moneyInvalid: '金额必填',
          updateProfitReportSuccess: '编辑利润表成功',
          updateProfitReportFailed: '编辑利润表失败'
        }
      },
      manageUserView: {
        info: {
          action: '操作'
        },
        actions: {
          addUser: '新增用户',
          confirmDeleteUser: '确定删除用户？'
        },
        message: {
          deleteUserSuccess: '删除用户成功',
          deleteUserFailed: '删除用户失败'
        }
      },
      upsertUserModal: {
        info: {
          createUser: '创建用户',
          updateUser: '编辑用户',
          usernamePlaceholder: '请输入用户名',
          accountPlaceholder: '请输入账号',
          phoneNumberPlaceholder: '请输入电话号码'
        },
        message: {
          usernameInvalid: '用户名必填',
          accountInvalid: '账号必填',
          accountPatternInvalid: '账号要求由字母、数字、下划线组成，长度在6-20个字符',
          roleInvalid: '角色必填',
          phoneNumberInvalid: '电话号码必填',
          phoneNumberPatternInvalid: '请输入正确的电话号码',
          accountIsExist: '账号已存在',
          createUserSuccess: '创建用户成功',
          createUserFailed: '创建用户失败',
          updateUserSuccess: '编辑用户成功',
          updateUserFailed: '编辑用户失败',
          accountCanNotUpdate: '账号不可修改'
        }
      }
    },
    th: {
      common: {
        info: {
          action: 'การดำเนินการ'
        },
        actions: {
          confirm: 'ยืนยัน',
          cancel: 'ยกเลิก',
          reset: 'รีเซ็ต',
          search: 'ค้นหา',
          monthSelectPlaceholder: 'เลือกเดือน',
          yearSelectPlaceholder: 'โปรดเลือกปี',
          updateUser: 'แก้ไขข้อมูล',
          logout: 'ออกจากระบบ'
        },
        message: {
          netError: 'ข้อผิดพลาดของระบบ',
          noAuth: 'ไม่มีสิทธิ์',
          logoutFailed: 'ล้มเหลวในการออกจากระบบ',
          noModifiedPassword: 'กรุณาเปลี่ยนรหัสผ่านเมื่อเข้าสู่ระบบครั้งแรก'
        }
      },
      commonBiz: {
        user: {
          username: 'ชื่อผู้ใช้',
          account: 'บัญชี',
          password: 'รหัสผ่าน',
          confirmPassword: 'ยืนยันรหัสผ่าน',
          role: 'บทบาท',
          roles: {
            admin: 'ผู้ดูแลระบบ',
            staff: 'พนักงานในองค์กร',
            finance: 'บัญชีภาษี',
            external: 'ผู้ใช้ภายนอก'
          },
          phoneNumber: 'เบอร์โทรศัพท์'
        }
      },
      route: {
        overview: 'ภาพรวม',
        order: 'รายละเอียดของคำสั่งซื้อ',
        report: 'รายงานการเงิน',
        reports: { bankReport: 'บัญชีธนาคาร', subjectCollect: "รวมบัญชีหมวด", profit: "กำไร", subjectRemain: "ยอดคงเหลือบัญชีหมวด", debt: "สินทรัพย์และหนี้สิน" },
        manage: 'การจัดการ',
        manages: { manageUser: 'การจัดการผู้ใช้' }
      },
      updateUserModal: {
        info: {
          updateUser: 'แก้ไขข้อมูล',
          phoneNumberPlaceholder: 'โปรดป้อนเบอร์โทรศัพท์',
          passwordPlaceholder: 'โปรดป้อนรหัสผ่านใหม่ (กรุณากรอกเมื่อต้องการเปลี่ยนรหัสผ่าที่)',
          confirmPasswordPlaceholder: 'โปรดกรอกรหัสผ่านใหม่อีกครั้ง (กรุณากรอกเมื่อต้องการเปลี่ยนรหัสผ่าที่)'
        },
        message: {
          passwordInvalid: 'รหัสผ่านจำเป็น',
          passwordPatternInvalid: 'รหัสผ่านต้องมีอักษรและตัวเลขอย่างน้อย 8 ตัวอักษรและ 20 ตัว',
          confirmPasswordInvalid: 'รหัสผ่านทั้งสองครั้งต้องตรงกัน',
          updateUserSuccess: 'แก้ไขข้อมูลสำเร็จ',
          updateUserFailed: 'แก้ไขข้อมูลล้มเหลว'
        }
      },
      loginView: {
        info: {
          accountPlaceholder: 'โปรดป้อนบัญชี',
          passwordPlaceholder: 'โปรดป้อนรหัสผ่าน'
        },
        actions: {
          login: 'เข้าสู่ระบบ'
        },
        message: {
          formInValid: 'โปรดป้อนรหัสผ่านและชื่อบัญชีที่ถูกต้อง',
          loginFailed: 'การเข้าสู่ระบบล้มเหลว'
        }
      },
      orderView: {
        info: {
          user_code: 'รหัสผู้ใช้',
          receive_goods_date: 'วันที่รับสินค้า',
          warehoust: 'โกดัง',
          waybill_number: 'เลขที่สัญญา',
          goods_number: 'เลขที่สินค้า',
          goods_name: 'ชื่อสินค้า',
          transport_mode: 'รูปแบบการขนส่ง',
          count: 'จำนวน',
          number: 'จำนวน',
          description: 'หมายเหตุ',
          weight: 'น้ำหนัก/กก',
          inner_size_length: 'ขนาดภายใน/CM (ยาว)',
          inner_size_width: 'ขนาดภายใน/CM (กว้าง)',
          inner_size_height: 'ขนาดภายใน/CM (สูง)',
          volume: 'ปริมาณ/CBM',
          unit_price: 'ราคาต่อหน่วย',
          good_value: 'มูลค่าสินค้า',
          rate: 'อัตรา',
          insurance: 'ประกัน',
          packing_cost: 'ค่าแพ็ค',
          disbursements: 'ค่าใช้จ่ายที่ชำระเครื่อง',
          compensate: 'การเสียหาย',
          client_freight: 'ค่าขนส่งของลูกค้า',
          stuffing_number: 'เลขที่การเก็บของ',
          warehouse_size_length: 'ขนาดของคลัง/CM (ยาว)',
          warehouse_size_width: 'ขนาดของคลัง/CM (กว้าง)',
          warehouse_size_height: 'ขนาดของคลัง/CM (สูง)',
          warehouse_volumn: 'ปริมาณของคลัง/CBM',
          cost_unit_price: 'ราคาต่อหน่วยค่าใช้จ่าย',
          cost_packing_cost: 'ค่าแพ็คค่าใช้จ่าย',
          warehouse_freight: 'ค่าขนส่งคลัง',
          payed_date: 'วันที่ชำระเงิน',
          pay_currency: 'สกุลเงินที่ชำระ',
          bank_out: 'ธนาคารที่ออก',
          CNY: 'หยวน',
          THB: 'บาท',
          status: 'สถานะ',
          client_cost_to_be_record: 'ค่าใช้จ่ายของลูกค้าที่ต้องบันทึก',
          warehouse_cost_to_be_record: 'ค่าใช้จ่ายของคลังที่ต้องบันทึก',
          finance_cost_to_be_record: 'ค่าใช้จ่ายทางการเงินที่ต้องบันทึก',
          cost_to_be_pay: 'ค่าใช้จ่ายที่ต้องชำระ',
          cost_has_payed: 'ค่าใช้จ่ายที่ได้ชำระแล้ว'
        },
        actions: {
          downloadTemplate: 'ดาวน์โหลดเทมเพลต',
          uploadExcel: 'อัปโหลดไฟล์ Excel',
          downloadDeliveryBill: 'ดาวน์โหลดใบส่งของ',
          confirmDeleteOrder: 'ยืนยันการลบคำสั่ง'
        },
        message: {
          downloadTemplateFailed: 'การดาวน์โหลดเทมเพลตล้มเหลว',
          uploadSuccess: 'อัปโหลดไฟล์เสร็จสมบูรณ์',
          excelInvalid: 'ไฟล์ Excel ไม่ตรงกับเงื่อนไขของเทมเพลต',
          uploadFailed: 'อัปโหลดไฟล์ล้มเหลว',
          deleteOrderSuccess: 'ลบคำสั่งลบสำเร็จ',
          deleteOrderFailed: 'ลบคำสั่งล้มเหลว',
          downloadDeliveryBillSuccess: 'ดาวน์โหลดใบส่งของสำเร็จ',
          downloadDeliveryBillNoOrderFailed: 'ไม่มีคำสั่งเลือก',
          downloadDeliveryBillStatusFailed: 'สถานะคำสั่งต้องเป็น "เงินสด/ชำระแล้ว"',
          downloadDeliveryBillUserCodeFailed: 'รหัสผู้ใช้งานต้องเหมือนกัน',
          downloadDeliveryBillStuffingNumberFailed: 'เลขที่ของกล่องต้องเหมือนกัน',
          downloadDeliveryBillFailed: 'ดาวน์โหลดใบส่งของล้มเหลว'
        }
      },
      upsertOrderModal: {
        info: {
          updateOrder: 'แก้ไขคำสั่ง',
          unitPricePlaceholder: 'กรุณากรอกราคาต่อหน่วย',
          goodValuePlaceholder: 'กรุณากรอกมูลค่าสินค้า',
          ratePlaceholder: 'กรุณากรอกอัตรา',
          packingCostPlaceholder: 'กรุณากรอกค่าจัดส่ง',
          disbursementsPlaceholder: 'กรุณากรอกค่าใช้จ่ายที่โอนเงินล่วงหน้า',
          compensatePlaceholder: 'กรุณากรอกค่ายอดเสีย',
          stuffingNumberPlaceholder: 'กรุณากรอกเลขที่ของกล่อง',
          warehouseSizeLengthPlaceholder: 'กรุณากรอกขนาดของที่ระเบียบสินค้า/CM (ยาว)',
          warehouseSizeWidthPlaceholder: 'กรุณากรอกขนาดของที่ระเบียบสินค้า/CM (กว้าง)',
          warehouseSizeHeightPlaceholder: 'กรุณากรอกขนาดของที่ระเบียบสินค้า/CM (สูง)',
          costUnitPricePlaceholder: 'กรุณากรอกราคาต่อหน่วยสินค้า',
          costPackingCostPlaceholder: 'กรุณากรอกค่าจัดส่งสินค้า',
          paidDatePlaceholder: 'กรุณากรอกวันที่ที่จ่ายเงิน',
          bankOutPlaceholder: 'กรุณากรอกภาษีที่ออกจากธนาคาร',
          descriptionPlaceholder: 'กรุณากรอกหมายเหตุ',
          CNY: 'หยวน',
          THB: 'บาท'
        },
        message: {
          unitPriceInvalid: 'ราคาต่อหน่วยต้องกรอก',
          packingCostInvalid: 'ค่าเก็บแช่เก็บต้องกรอก',
          disbursementsInvalid: 'การชำระเงินล่วงหน้าต้องกรอก',
          compensateInvalid: 'การประนีนค่าต้องกรอก',
          stuffingNumberInvalid: 'เลขที่ของกลุ่มต้องกรอก',
          warehouseSizeLengthInvalid: 'ขนาดของคลังสินค้า/CM (ยาว) ต้องกรอก',
          warehouseSizeWidthInvalid: 'ขนาดของคลังสินค้า/CM (กว้าง) ต้องกรอก',
          warehouseSizeHeightInvalid: 'ขนาดของคลังสินค้า/CM (สูง) ต้องกรอก',
          costUnitPriceInvalid: 'ราคาต่อหน่วยความสูงต้องกรอก',
          costPackingCostInvalid: 'ค่าเก็บแช่เก็บความสูงต้องกรอก',
          payedDateInvalid: 'วันที่ชำระเงินต้องกรอก',
          payCurrencyInvalid: 'สกุลเงินที่ชำระเงินต้องกรอก',
          bankOutInvalid: 'การใช้จ่ายทางธนาคารต้องกรอก',
          updateOrderSuccess: 'แก้ไขคำสั่งซื้อสำเร็จ',
          updateOrderFailed: 'แก้ไขคำสั่งซื้อล้มเหลว',
          orderCanNotUpdate: 'คำสั่งซื้อไม่สามารถแก้ไขได้',
          rateAndInsuranceShouldTogether: 'มูลค่าและประกันต้องกรอกพร้อมกัน'
        }
      },
      reportView: {
        info: {
          empty: 'เพิ่มข้อมูลในหน้ารายงานการเงินอยู่ระหว่างการพัฒนา'
        }
      },
      bankReportView: {
        info: {
          bankReportDate: 'วันที่รายงานธนาคาร',
          bankIn: 'เงินเข้าธนาคาร',
          bankOut: 'เงินออกธนาคาร',
          remain: 'ยอดเหลือ',
          description: 'หมายเหตุ',
          firstLevelClassify: 'ประเภทหนัก',
          secondLevelDetail: 'รายละเอียดย่อย',
          project: "โครงการ",
          exchangeRate: 'อัตราแลกเปลี่ยน',
          rmbIn: 'เงินรัมบีลเข้าธนาคาร',
          rmbOut: 'เงินรัมบีลออกธนาคาร',
          rmbRemain: 'ยอดเหลือรัมบีล',
          firstLevelClassifyFilter: { 'manage_cost': 'ค่าบริการการจัดการ', 'business_cost': 'ค่าใช้จ่ายในการประมวลผลงาน', 'finance_cost': 'ค่าใช้จ่ายทางการเงิน', 'bonus': 'ค่าเดินเงินปันผล', 'cost_receivable': 'ค่าออกบัญชีค้า', 'cost_payable': 'ค่าบัญชีค้าที่ต้องจ่าย', 'other_cost_receivable': 'ค่าอื่นที่ได้รับ', 'cost_allot': 'การกำหรับผลกำไร', 'cost_real_in': 'ผลกำไรจากการเงินต้น', 'short_borrow_cost': 'ค่าขยายเพื่อลงทุนงาน', 'other_cost_in': 'ค่าอื่นที่เข้า', 'accrual_in': 'ค่าเงินดอกเบี้ย', 'bonus_payable': 'ค่าเงินปันผลที่ต้องจ่าย', 'other_cost_payable': 'ค่าอื่นที่ต้องจ่าย', 'other_cost_out': 'ค่าอื่นที่ออก' },
          secondLevelDetailFilter: {
            'work_cost': 'ค่าใช้จ่ายในการทำงาน', 'tel_cost': 'ค่าใช้จ่ายโทรศัพท์', 'salary_cost': 'ค่าเงินเดือน', 'social_security_cost': 'ค่าประกันสังคม', 'rent_cost': 'ค่าเช่าที่พัก', 'packing_cost': 'ค่าผงแบบ', 'royalty_cost': 'ค่าความช่วยเหลือ', 'cash': 'เงินสด', 'middle_cost': 'ค่าธรรมเนียม', 'accrual_cost': 'ค่าดอกเบี้ย', 'service_cost': 'ค่าบริการ', 'all_profit_cost': 'กำไรทั้งหมดที่ไม่ได้กำหรับผลกำไร', 'accrual_in_cost': 'รวมดอกเบี้ย', 'bonus': 'สิทธิปันสังคม', 'th_cost': 'บาทไทย', 'freight_cost': 'ค่าขนส่ง', 'cash_pledge': 'เงินมัดจำ', 'last_not_pay': 'ค่ายังไม่ได้ชำระจากผู้ขายที่เก่า', 'not_allot_profit': 'กำไรที่ไม่ได้แบ่ง', 'other': 'อื่นๆ'
          }
        },
        actions: {
          selectCNYBankReport: 'ธนาคารจีน',
          selectTHBBankReport: 'ธนาคารไทย',
          addBankReport: "เพิ่ม",
          downloadBankReport: "ดาวน์โหลด",
          deleteBankReport: "ลบ",
          viewInBankReport: "ดูเฉพาะรายการเข้า",
          viewOutBankReport: "ดูเฉพาะรายการออก"
        }
      },
      upsertBankReportModal: {
        info: {
          createBankReport: 'สร้างบัญชีธนาคาร',
          updateBankReport: 'แก้ไขบัญชีธนาคาร',
          bankReportDatePlaceholder: 'กรุณาใส่วันที่ชำระเงิน',
          bankInPlaceholder: 'กรุณาใส่การเข้าธนาคาร',
          bankOutPlaceholder: 'กรุณาใส่การออกธนาคาร',
          descriptionPlaceholder: 'กรุณาใส่หมายเหตุ',
          firstLevelClassifyPlaceholder: 'กรุณาเลือกประเภทชั้นหนึ่ง',
          secondLevelDetailPlaceholder: 'กรุณาเลือกรายละเอียดชั้นสอง',
        },
        message: {
          bankReportDateInvalid: 'กรุณาใส่วันที่ชำระเงิน',
          bankInInvalid: 'กรุณาใส่การเข้าธนาคาร',
          bankOutInvalid: 'กรุณาใส่การออกธนาคาร',
          firstLevelClassifyInvalid: 'กรุณาใส่ประเภทชั้นหนึ่ง',
          secondLevelDetailInvalid: 'กรุณาใส่รายละเอียดชั้นสอง',
          createBankReportSuccess: 'สร้างบัญชีธนาคารสำเร็จ',
          createBankReportFailed: 'สร้างบัญชีธนาคารล้มเหลว',
        }
      },
      subjectCollectView: {
        info: {
          bankReportDate: 'วันที่รับเงิน',
          subjectCollectProject: 'โครงการ',
          accountingSubject: 'หัวข้อบัญชี',
          detail: 'รายละเอียด',
          inPrice: 'รับเงิน',
          outPrice: 'จ่ายเงิน',
          subjectCollectProjectFilters: {
            'manage_cost': 'ค่าบริการการจัดการ',
            'business_cost': 'ค่าใช้จ่ายในการดำเนินธุรกิจ',
            'finance_cost': 'ค่าใช้จ่ายทางการเงิน',
            'bonus': 'ผลกำไรทุน',
            'cost_receivable': 'ค่าออุดัม',
            'cost_payable': 'ค่าใช้จ่ายที่ต้องชำระ',
            'other_cost_receivable': 'ค่าอื่นที่รับเงิน',
            'cost_allot': 'การแบ่งกำไร',
            'cost_real_in': 'สิทธิปันสังคม',
            'short_borrow_cost': 'ค่ากู้สั้น',
            'other_cost_in': 'รายได้ที่เกิดจากงานอื่น',
            'accrual_in': 'รายได้ดอกเบี้ย',
            'bonus_payable': 'ผลกำไรที่ต้องจ่าย',
            'other_cost_payable': 'ค่าใช้จ่ายอื่นที่ต้องชำระ',
            'other_cost_out': 'ค่าใช้จ่ายอื่น',
          },
          total: 'รวม'
        },
        actions: {
          selectCNYBankReport: 'ธนาคารจีน',
          selectTHBBankReport: 'ธนาคารไทย',
          addBankReport: "เพิ่ม",
          downloadBankReport: "ดาวน์โหลด",
          deleteBankReport: "ลบ",
          viewInBankReport: "ดูเฉพาะรายการเข้า",
          viewOutBankReport: "ดูเฉพาะรายการออก"
        }
      },
      manageUserView: {
        info: {
          action: 'การดำเนินงาน'
        },
        actions: {
          addUser: 'เพิ่มผู้ใช้',
          confirmDeleteUser: 'ยืนยันการลบผู้ใช้'
        },
        message: {
          deleteUserSuccess: 'ลบผู้ใช้สำเร็จ',
          deleteUserFailed: 'ลบผู้ใช้ล้มเหลว'
        }
      },
      upsertUserModal: {
        info: {
          createUser: 'สร้างผู้ใช้',
          updateUser: 'แก้ไขผู้ใช้',
          usernamePlaceholder: 'กรุณาใส่ชื่อผู้ใช้',
          accountPlaceholder: 'กรุณาใส่บัญชี',
          phoneNumberPlaceholder: 'กรุณาใส่เบอร์โทรศัพท์'
        },
        message: {
          usernameInvalid: 'ชื่อผู้ใช้จำเป็น',
          accountInvalid: 'บัญชีจำเป็น',
          accountPatternInvalid: 'บัญชีต้องเป็นอักขระ ตัวเลข และลงค์ อย่างน้อย 6-20 ตัวอักขระ',
          roleInvalid: 'ตำแหน่งจำเป็น',
          phoneNumberInvalid: 'เบอร์โทรศัพท์จำเป็น',
          phoneNumberPatternInvalid: 'กรุณาใส่เบอร์โทรศัพท์ที่ถูกต้อง',
          accountIsExist: 'บัญชีมีอยู่แล้ว',
          createUserSuccess: 'สร้างผู้ใช้สำเร็จ',
          createUserFailed: 'สร้างผู้ใช้ล้มเหลว',
          updateUserSuccess: 'แก้ไขผู้ใช้สำเร็จ',
          updateUserFailed: 'แก้ไขผู้ใช้ล้มเหลว',
          accountCanNotUpdate: 'บัญชีไม่สามารถแก้ไขได้'
        }
      }
    }
  }
})
