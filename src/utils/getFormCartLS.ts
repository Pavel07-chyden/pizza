import { calcTotalPrice } from './calcTotalPrice'
import { CartItems } from '../Redux/slices/cart/types'

export const getCartFromLS =()=> {
	const data = localStorage.getItem('cart')
	const items = data ? JSON.parse(data) : []
	const totalPrice = calcTotalPrice(items)
	return {
		items: items as CartItems[],
		totalPrice
	}
}