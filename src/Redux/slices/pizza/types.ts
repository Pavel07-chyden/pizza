
export type Pizza ={
	id:string,
	name:string,
	imageUrl:string,
	price:number,
	types:number[],
	sizes:number[]
	rating:number
}
export enum Status {
	LOADING= 'loading',
	SUCCESS='success',
	ERROR='error',
}
export interface PizzaSliceState{
	items:Pizza[],
	status: 'success' | 'error' | 'loading'
}
export type SearchPizzaParams ={
	sortBy:string, order:string, category:string, search:string, currentPage:string
}