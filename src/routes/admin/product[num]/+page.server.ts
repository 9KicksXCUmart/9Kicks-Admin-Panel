import type { PageServerLoad } from './$types';
import { PUBLIC_GO_BACKEND_URL } from '$env/static/public';

export const load = (async ({ cookies, params }) => {
	// get jwt token from cookies
	const jwtToken = cookies.get('jwt');
	// get product details from backend
	async function getProducts() {
		const response = await fetch(`${PUBLIC_GO_BACKEND_URL}/v1/products?pageNum=` + params.num, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`
			}
		});
		const result = await response.json();
		return result.data.products;
	}
	return {
		jwtToken: jwtToken,
		products: await getProducts()
	};
}) satisfies PageServerLoad;
