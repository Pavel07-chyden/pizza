import React from 'react'

import { Categories } from '../Components/Categories'
import { SortPopup } from '../Components/SortsPopup'
import { Skeleton } from '../Components/PizzaBlock/Skeleton'
import { PizzaBlock } from '../Components/PizzaBlock'
import { Pagination } from '../Components/Pagination'
import { useDispatch, useSelector } from 'react-redux'

import { selectFilter, selectSortFilter } from '../Redux/slices/filter/selector'
import { selectPizzaData } from '../Redux/slices/pizza/selector'
import { setCategoryId, setCurrentPage } from '../Redux/slices/filter/slice'
import { axiosPizzas } from '../Redux/slices/pizza/slice'
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
	/*React.useEffect(() => {
		if (window.location.search) {
			const params = (qs.parse(window.location.search.substring(1)) as unknown) as  SearchPizzaParams
			const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
			dispatch(setFilter({
				         searchValue: params.search,
				         categoryId: Number(params.category),
				         currentPage: Number(params.currentPage),
				         sort: sort || sortList[0],
			}))
		}
	}, [])
	*/
	/*React.useEffect(() => {
	const queryString = qs.stringify({
		sortType,
		categoryId,
		currentPage
	})
	navigate(`?${queryString}`)
}, [categoryId, sortType, currentPage])
 */
	const getAPI = async () => {
		const sortBy = sortType.replace('-', '')
		const order = sortType.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''
		dispatch(
			//@ts-ignore
			axiosPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage)
			})
		)
	}
	React.useEffect(() => {
		getAPI()
		window.scroll(0, 0)
	}, [currentPage, categoryId, searchValue, sortType])


	const pizzas = items
		.map((el:any) => (
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
			<Pagination currentPage={currentPage} onChange={onCahngePage} />
		</div>
	)
}
