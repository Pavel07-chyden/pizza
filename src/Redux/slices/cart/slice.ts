import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../../utils/getFormCartLS'
import { CartItems, CartSliceState } from './types'
import { calcTotalPrice } from '../../../utils/calcTotalPrice'


const {items, totalPrice} = getCartFromLS()
export const initialState:CartSliceState = {
	totalPrice: totalPrice,
	items: items
}
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItems(state, action:PayloadAction<CartItems>) {
			const findItem = state.items.find(obj => obj.id === action.payload.id)
			if (findItem) {
				findItem.count++
			} else {
				state.items.push({ ...action.payload, count: 1 })
			}
			state.totalPrice = calcTotalPrice(state.items)
		},
		removeItems(state, action:PayloadAction<string>) {
			state.items = state.items.filter(el => el.id !== action.payload)
		},
		minusItems(state, action:PayloadAction<string>) {
			const findItem = state.items.find(obj => obj.id === action.payload)
			if (findItem) {
				findItem.count--
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum
			}, 0)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
		}
	}
})

export const { addItems, removeItems, minusItems, clearItems } =
	cartSlice.actions

export default cartSlice.reducer
