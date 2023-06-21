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
  weight: number
  inner_size_length: number
  inner_size_width: number
  inner_size_height: number
  volume: number
  unit_price: number
  packing_cost: number
  client_freight: number
  stuffing_number: string
  warehouse_size_length: number
  warehouse_size_width: number
  warehouse_size_height: number
  warehouse_volumn: number
  cost_unit_price: number
  cost_packing_cost: number
  warehouse_freight: number
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
