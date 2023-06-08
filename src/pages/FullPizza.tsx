import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import * as React from 'react'
export const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string
		title: string
		price: number
	}>({ imageUrl: '', title: '', price: 0 })
	const { id } = useParams()
	const navigate = useNavigate()

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://647503467de100807b1c10f4.mockapi.io/items/' + id
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при получении пиццы!')
				navigate('/')
			}
		}
		fetchPizza()
	}, [])
	if (!pizza) {
		return <>Loader...</>
	}
	return (
		<div className="container">
			<img src={pizza.imageUrl} />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
			<Link to="/">
				<button className="button button--outline button--add">
					<span>Назад</span>
				</button>
			</Link>
		</div>
	);
};
