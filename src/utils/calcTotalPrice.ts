import { CartItems } from '../Redux/slices/cart/types'

export const calcTotalPrice =(items: CartItems[])=> {
return items.reduce((sum, obj)=> obj.price * obj.count + sum,0)

}