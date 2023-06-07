import { RootState } from '../../store'

export const selectFilter = (state:RootState) => state.filter
export const selectSortFilter = (state:RootState) => state.filter.sort.sortProperty