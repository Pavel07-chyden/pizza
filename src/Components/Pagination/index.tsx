import ReactPaginate from 'react-paginate'
import React from 'react'
import styles from './Pagination.module.scss'

type PaginationType={
	currentPage:number
	onChange:(page:number)=>void,
}
export const Pagination:React.FC<PaginationType> = ({ onChange, currentPage }) =>
			<ReactPaginate
				className={styles.root}
				breakLabel='...'
				nextLabel=' >'
				previousLabel='< '
				onPageChange={event => onChange(event.selected + 1)}
				pageRangeDisplayed={4}
				pageCount={3}
				forcePage={currentPage - 1}

/>


