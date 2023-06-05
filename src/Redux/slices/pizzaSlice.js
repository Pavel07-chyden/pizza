import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const axiosPizzas = createAsyncThunk(
	'pizza/axiosStatus',
	async (params, thunkAPI) => {
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get(
			`https://647503467de100807b1c10f4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)
export const initialState = {
	items: [],
	status: 'loading' //success | error | loading
}
const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {},
	extraReducers: {
		[axiosPizzas.pending]: state => {
			state.status = 'loading'
			state.items = []
		},
		[axiosPizzas.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'success'
		},
		[axiosPizzas.rejected]: (state, action) => {
			state.status = 'error'
			state.items = []
		}
	}
})
export const selectPizzaData = state => state.pizza
export const {} = pizzaSlice.actions
export default pizzaSlice.reducer
