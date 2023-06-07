
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, SortPropertyEnum } from './types'


export const initialState:FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности (DESC)',
		sortProperty: SortPropertyEnum.RATING_DESC
	}
}
const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action:PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action:PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setSortItems(state, action:PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action:PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilter(state, action:PayloadAction<FilterSliceState>) {
			if(Object.keys(action.payload).length){
				state.sort = action.payload.sort
				state.currentPage = Number(action.payload.currentPage)
				state.categoryId = Number(action.payload.categoryId)
			}else{
				state.currentPage = 1
				state.categoryId=0
				state.sort={
					name: 'популярности (DESC)',
					sortProperty: SortPropertyEnum.RATING_DESC
				}
			}
		}
	}})

export const {
	setCategoryId,
	setSearchValue,
	setFilter,
	setCurrentPage,
	setSortItems
} = filterSlice.actions

export default filterSlice.reducer
