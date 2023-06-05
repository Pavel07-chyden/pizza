import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности (DESC)',
		sortProperty: 'rating'
	}
}
const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload
		},
		setSortItems(state, action) {
			state.sort = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setFilter(state, action) {
			state.sort = action.payload.sort
			state.currentPage = Number(action.payload.currentPage)
			state.categoryId = Number(action.payload.categoryId)
		}
	}
})
export const selectFilter = state => state.filter
export const selectSortFilter = state => state.filter.sort.sortProperty
export const {
	setCategoryId,
	setSearchValue,
	setFilter,
	setCurrentPage,
	setSortItems
} = filterSlice.actions

export default filterSlice.reducer
