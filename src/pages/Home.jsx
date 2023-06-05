import React from 'react'

import { Categories } from '../Components/Categories'
import { Sort, sortList } from '../Components/Sorts'
import { Skeleton } from '../Components/PizzaBlock/Skeleton'
import { PizzaBlock } from '../Components/PizzaBlock'
import { Pagination } from '../Components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectFilter,
	selectSortFilter,
	setCategoryId,
	setCurrentPage,
	setFilter
} from '../Redux/slices/filterSlice'
import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom'
import { axiosPizzas } from '../Redux/slices/pizzaSlice'
export const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { categoryId, currentPage, searchValue } = useSelector(selectFilter)
	const sortType = useSelector(selectSortFilter)
	const { items, status } = useSelector(state => state.pizza)
	const onClickCategory = id => {
		dispatch(setCategoryId(id))
	}
	const onClickCount = number => {
		dispatch(setCurrentPage(number))
	}
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = sortList.find(obj => obj.sortProperty === params.sortType)
			dispatch(setFilter({ ...params, sort }))
		}
	}, [])
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
				currentPage
			})
		)
	}

	React.useEffect(() => {
		getAPI()
		window.scroll(0, 0)
	}, [currentPage, categoryId, searchValue, sortType])

	React.useEffect(() => {
		const queryString = qs.stringify({
			sortType,
			categoryId,
			currentPage
		})
		navigate(`?${queryString}`)
	}, [categoryId, sortType, currentPage])
	const pizzas = items
		.filter(obj => {
			if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
				return true
			}
			return false
		})
		.map((el, i) => (
			<Link key={el.id} to={`/pizza/${el.id}`}>
				<PizzaBlock {...el} />
			</Link>
		))

	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>
						Произошла ошибка <span>😕</span>
					</h2>
					<p>Не удалось получить пиццы. Попрбуйте повторить попытку позже</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}

			<Pagination currentPage={currentPage} onChange={onClickCount} />
		</div>
	)
}
