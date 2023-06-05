import ReactPaginate from 'react-paginate'
import React from 'react'
import styles from './Pagination.module.scss'
export const Pagination = ({ onChange, currentPage }) => {
	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel='...'
				nextLabel=' >'
				previousLabel='< '
				onPageChange={event => onChange(event.selected + 1)}
				pageRangeDisplayed={8}
				pageCount={3}
				forcePage={currentPage - 1}
				renderOnZeroPageCount={null}
			/>
		</>
	)
}
