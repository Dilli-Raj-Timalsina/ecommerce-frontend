const sortBy = ['Sort By',
	'Newest',
	'Price (High to Low)',
	'Price (Low to High)',
	'Name (A-Z)',
	'Name (Z-A)'
]

const sortHtL = (products: any[]) => {
	let itemsToDisplay = products.sort((A, B) => { return B.price - A.price })
	return itemsToDisplay
}

const sortLtH = (products: any[]) => {
	let itemsToDisplay = products.sort((A, B) => { return A.price - B.price })
	return itemsToDisplay
}

const sortAtZ = (products: any[]) => {
	let itemsToDisplay = products.sort((A, B) => { return (A.title).localeCompare(B.title) })
	return itemsToDisplay
}

const sortZtA = (products: any[]) => {
	let itemsToDisplay = products.sort((A, B) => { return (B.title).localeCompare(A.title) })
	return itemsToDisplay
}

export default function sortProduct({ products, type }: { products: any[], type: number }) {
	let sortedArr = products;
	switch (sortBy[type]) {
		case 'Newest':
			break;
		case 'Price (High to Low)':
			sortedArr = sortHtL(products);
			break;
		case 'Price (Low to High)':
			sortedArr = sortLtH(products);
			break;
		case 'Name (A-Z)':
			sortedArr = sortAtZ(products);
			break;
		case 'Name (Z-A)':
			sortedArr = sortZtA(products);
			break;
		default:
			break;
	}
	return sortedArr
}