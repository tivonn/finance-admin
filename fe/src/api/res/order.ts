export interface OrderRes {
  id: number
  user_code: string
  receive_goods_date: string
  waybill_number: string
  goods_number: string
  goods_name: string
  transport_mode: string
  count: number
  number: number
  description: string
  weight: string
  inner_size_length: string
  inner_size_width: string
  inner_size_height: string
  volume: string
  unit_price: string
  packing_cost: string
  client_freight: string
  stuffing_number: string
  warehouse_size_length: string
  warehouse_size_width: string
  warehouse_size_height: string
  warehouse_volumn: string
  cost_unit_price: string
  cost_packing_cost: string
  warehouse_freight: string
  status:
    | 'client_cost_to_be_record'
    | 'warehouse_cost_to_be_record'
    | 'cost_to_be_pay'
    | 'cost_has_payed'
  payed_date: string
  create_at: string
  update_at: string
  is_delete: boolean
}
