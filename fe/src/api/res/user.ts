export interface UserRes {
  id: number
  username: string
  account: string
  role: 'admin' | 'staff' | 'finance' | 'user'
}
