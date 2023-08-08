<script setup lang="ts">
import { message, type FormInstance } from 'ant-design-vue'
import axios from '@/api/axios'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { OrderRes } from '@/api/res/order'

const { t } = useI18n()

const props = defineProps({
  upsertOrder: Object
})
const emit = defineEmits(['closeModal'])

const formRef = ref<FormInstance>()

const formState = reactive<OrderRes>(
  Object.assign(
    {},
    { id: props.upsertOrder!.id, status: props.upsertOrder!.status },
    props.upsertOrder!.status === 'client_cost_to_be_record'
      ? { unit_price: props.upsertOrder!.unit_price, packing_cost: props.upsertOrder!.packing_cost }
      : props.upsertOrder!.status === 'warehouse_cost_to_be_record'
      ? {
          stuffing_number: props.upsertOrder!.stuffing_number,
          warehouse_size_length: props.upsertOrder!.warehouse_size_length,
          warehouse_size_width: props.upsertOrder!.warehouse_size_width,
          warehouse_size_height: props.upsertOrder!.warehouse_size_height,
          cost_unit_price: props.upsertOrder!.cost_unit_price,
          cost_packing_cost: props.upsertOrder!.cost_packing_cost
        }
      : props.upsertOrder!.status === 'finance_cost_to_be_record'
      ? {
          good_value: props.upsertOrder!.good_value,
          rate: props.upsertOrder!.rate,
          disbursements: props.upsertOrder!.disbursements,
          compensate: props.upsertOrder!.compensate
        }
      : props.upsertOrder!.status === 'cost_to_be_pay'
      ? { payed_date: props.upsertOrder!.payed_date, pay_currency: props.upsertOrder!.pay_currency }
      : {}
  ) as any
)

const handleOk = async () => {
  try {
    // 校验表单
    await formRef.value!.validateFields()
    // 提交数据
    try {
      await axios.put(`/order/${formState.id}`, Object.assign({}, formState))
      message.success(t('upsertOrderModal.message.updateOrderSuccess'))
      close()
      window.location.reload()
    } catch (error: any) {
      switch (error?.response?.data?.message) {
        case '无权限': {
          message.error(t('common.message.noAuth'))
          break
        }
        case '订单不可修改': {
          message.error(t('upsertOrderModal.message.orderCanNotUpdate'))
          break
        }
        case '货值和费率需同时填写': {
          message.error(t('upsertOrderModal.message.rateAndInsuranceShouldTogether'))
          break
        }
        default: {
          message.error(t('upsertOrderModal.message.updateOrderFailed'))
        }
      }
    }
  } catch (error) {}
}

const handleCancel = () => {
  close()
}

const close = () => {
  emit('closeModal')
}
</script>

<template>
  <a-modal
    class="upsert-order-modal"
    :visible="true"
    :title="$t('upsertOrderModal.info.updateOrder')"
    :cancelText="$t('common.actions.cancel')"
    :okText="$t('common.actions.confirm')"
    @ok="() => handleOk()"
    @cancel="() => handleCancel()"
  >
    <!-- 客户费用待录入 -->
    <a-form
      v-if="(props.upsertOrder!.status === 'client_cost_to_be_record')"
      ref="formRef"
      :model="formState"
      :label-col="{ offset: 1, span: 5 }"
      :wrapper-col="{ offset: 1, span: 16 }"
    >
      <!-- 单价 -->
      <a-form-item
        :label="$t('orderView.info.unit_price')"
        name="unit_price"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertOrderModal.message.unitPriceInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.unit_price"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.unitPricePlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 打包费 -->
      <a-form-item
        :label="$t('orderView.info.packing_cost')"
        name="packing_cost"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertOrderModal.message.packingCostInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.packing_cost"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.packingCostPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>

    <!-- 库房费用待录入 -->
    <a-form
      v-if="(props.upsertOrder!.status === 'warehouse_cost_to_be_record')"
      ref="formRef"
      :model="formState"
      :label-col="{ offset: 1, span: 5 }"
      :wrapper-col="{ offset: 1, span: 16 }"
    >
      <!-- 装柜号 -->
      <a-form-item
        :label="$t('orderView.info.stuffing_number')"
        name="stuffing_number"
        :rules="[
          {
            required: true,
            message: $t('upsertOrderModal.message.stuffingNumberInvalid')
          }
        ]"
      >
        <a-input
          v-model:value="formState.stuffing_number"
          :placeholder="$t('upsertOrderModal.info.stuffingNumberPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 库房尺寸/CM（长） -->
      <a-form-item
        :label="$t('orderView.info.warehouse_size_length')"
        name="warehouse_size_length"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertOrderModal.message.warehouseSizeLengthInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.warehouse_size_length"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.warehouseSizeLengthPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 库房尺寸/CM（宽） -->
      <a-form-item
        :label="$t('orderView.info.warehouse_size_width')"
        name="warehouse_size_width"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertOrderModal.message.warehouseSizeWidthInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.warehouse_size_width"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.warehouseSizeWidthPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 库房尺寸/CM（高） -->
      <a-form-item
        :label="$t('orderView.info.warehouse_size_height')"
        name="warehouse_size_height"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertOrderModal.message.warehouseSizeHeightInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.warehouse_size_height"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.warehouseSizeHeightPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 成本单价 -->
      <a-form-item
        :label="$t('orderView.info.cost_unit_price')"
        name="cost_unit_price"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertOrderModal.message.costUnitPriceInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.cost_unit_price"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.costUnitPricePlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 成本打包费 -->
      <a-form-item
        :label="$t('orderView.info.cost_packing_cost')"
        name="cost_packing_cost"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertOrderModal.message.costPackingCostInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.cost_packing_cost"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.costPackingCostPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>

    <!-- 财务信息待录入 -->
    <a-form
      v-if="(props.upsertOrder!.status === 'finance_cost_to_be_record')"
      ref="formRef"
      :model="formState"
      :label-col="{ offset: 1, span: 5 }"
      :wrapper-col="{ offset: 1, span: 16 }"
    >
      <!-- 货值 -->
      <a-form-item
        :label="$t('orderView.info.good_value')"
        name="good_value"
        :rules="[
          {
            required: false,
            type: 'number'
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.good_value"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.goodValuePlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 费率 -->
      <a-form-item
        :label="$t('orderView.info.rate')"
        name="rate"
        :rules="[
          {
            required: false,
            type: 'number'
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.rate"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.ratePlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 垫付 -->
      <a-form-item
        :label="$t('orderView.info.disbursements')"
        name="disbursements"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertOrderModal.message.disbursementsInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.disbursements"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.disbursementsPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 赔付 -->
      <a-form-item
        :label="$t('orderView.info.compensate')"
        name="compensate"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertOrderModal.message.compensateInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.compensate"
          :controls="false"
          :placeholder="$t('upsertOrderModal.info.compensatePlaceholder')"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>

    <!-- 待付款 -->
    <a-form
      v-if="(props.upsertOrder!.status === 'cost_to_be_pay')"
      ref="formRef"
      :model="formState"
      :label-col="{ offset: 1, span: 5 }"
      :wrapper-col="{ offset: 1, span: 16 }"
    >
      <!-- 付款日期 -->
      <a-form-item
        :label="$t('orderView.info.payed_date')"
        name="payed_date"
        :rules="[
          {
            required: true,
            type: 'date',
            message: $t('upsertOrderModal.message.payedDateInvalid')
          }
        ]"
      >
        <a-date-picker
          v-model:value="formState.payed_date"
          :placeholder="$t('upsertOrderModal.info.payedDatePlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 付款币种 -->
      <a-form-item
        :label="$t('orderView.info.pay_currency')"
        name="pay_currency"
        :rules="[
          {
            required: true,
            type: 'string',
            message: $t('upsertOrderModal.message.payCurrencyInvalid')
          }
        ]"
      >
        <a-radio-group v-model:value="formState.pay_currency" size="small" style="width: 100%">
          <a-radio-button value="CNY">{{ $t('upsertOrderModal.info.CNY') }}</a-radio-button>
          <a-radio-button value="THB">{{ $t('upsertOrderModal.info.THB') }}</a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less">
.upsert-order-modal {
  width: 640px;
}
</style>
