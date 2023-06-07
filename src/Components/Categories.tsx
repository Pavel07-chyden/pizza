import React from 'react'

type CategoriesType={
	value:number,
	onClickCategory:(i:number)=>void
}

export const Categories:React.FC<CategoriesType> = React.memo(({ value, onClickCategory }) =>{
	const categories = [
			'Все',
			'Мясные',
			'Вегетарианская',
			'Гриль',
			'Острые',
			'Закрытые'
		]
		return (
			<div className='categories'>
				<ul>
					{categories.map((el, i) => (
						<li
							key={i}
							onClick={() => onClickCategory(i)}
							className={value === i ? 'active' : ''}
						>
							{el}
						</li>
					))}
				</ul>
			</div>
		)
	}
)