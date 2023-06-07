import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types'



export const initialState:PizzaSliceState = {
	items: [],
	status: Status.LOADING
}
export const axiosPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/axiosStatus',
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get<Pizza[]>(
			`https://647503467de100807b1c10f4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)
const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state,action:PayloadAction<Pizza[]>){
			state.items= action.payload
		}
	},
	extraReducers: (builder)=>{
		builder.addCase(axiosPizzas.pending, (state, action)=>{
			state.status = Status.LOADING
			state.items = []
		})
		builder.addCase(axiosPizzas.fulfilled, (state, action)=>{
			state.items = action.payload
			state.status = Status.SUCCESS
		})
		builder.addCase(axiosPizzas.rejected, (state)=>{
			state.status = Status.ERROR
			state.items = []
		});
	}
})

export const {} = pizzaSlice.actions
export default pizzaSlice.reducer

