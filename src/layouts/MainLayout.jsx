import React from 'react'
import { Header } from '../Components/Header'
import { Outlet, useNavigate } from 'react-router-dom'

export const MainLayout = () => {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Outlet />
			</div>
		</div>
	)
}