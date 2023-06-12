import React from 'react'

import { Categories } from '../Components/Categories'
import { SortPopup } from '../Components/SortsPopup'
import { Skeleton } from '../Components/PizzaBlock/Skeleton'
import { PizzaBlock, PizzaBlockType } from '../Components/PizzaBlock'
import { Pagination } from '../Components/Pagination'
import { useDispatch, useSelector } from 'react-redux'

import { selectFilter, selectSortFilter } from '../Redux/slices/filter/selector'
import { selectPizzaData } from '../Redux/slices/pizza/selector'
import { setCategoryId, setCurrentPage } from '../Redux/slices/filter/slice'
import { axiosPizzas } from '../Redux/slices/pizza/slice'
import { Status } from '../Redux/slices/pizza/types'
import { AnyAction } from '@reduxjs/toolkit'
export const Home = () => {
	const dispatch = useDispatch()
	const { categoryId, currentPage, searchValue,sort } = useSelector(selectFilter)
	const sortType = useSelector(selectSortFilter)
	const { items, status } = useSelector(selectPizzaData)
	const onClickCategory = React.useCallback((id:number) => {
		dispatch(setCategoryId(id))
	},[])
	const onCahngePage = (page:number) => {
		dispatch(setCurrentPage(page))
	}
	const getAPI = async () => {
		const sortBy = sortType.replace('-', '')
		const order = sortType.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''
		dispatch(
			axiosPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage)
			})as unknown as AnyAction
		)
	}
	React.useEffect(() => {
		getAPI()
		window.scroll(0, 0)
	}, [currentPage, categoryId, searchValue, sortType])


	const pizzas = items
		.map((el:PizzaBlockType) => (
				<PizzaBlock key={el.id}  {...el} />
		))

	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<SortPopup value={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === Status.ERROR ? (
				<div className='content__error-info'>
					<h2>
						Произошла ошибка <span>😕</span>
					</h2>
					<p>Не удалось получить пиццы. Попрбуйте повторить попытку позже</p>
				</div>
			) : (
				<div className='content__items'>
					{status === Status.LOADING ? skeletons : pizzas}
				</div>
			)}
			<Pagination currentPage={currentPage} onChange={onCahngePage} />
		</div>
	)
}
