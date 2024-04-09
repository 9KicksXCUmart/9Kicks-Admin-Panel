<script lang="ts">
	export let data;
	import Modal from './Modal.svelte';
	import AddModal from './AddModal.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { PUBLIC_GO_BACKEND_URL } from '$env/static/public';
	import ViewButton from '../../../components/button/ViewButton.svelte';
	import EditButton from '../../../components/button/EditButton.svelte';
	import AddButton from '../../../components/button/AddButton.svelte';

	let selectedProduct: productDetail | null = null;

	interface productDetail {
		id: string;
		brand: string;
		name: string;
		category: string;
		price: number;
		discountPrice: number;
		isDiscount: boolean;
		imageUrl: string;
		publishDate: string;
		reviewIdList: Array<string>;
		buyCount: number;
		size: object;
	}
	let products: productDetail[] = [];
	let add = false;
	function addPoductModal() {
		add = true;
	}

	function openProductModal(product: productDetail) {
		selectedProduct = { ...product };
	}

	async function getProducts() {
		const response = await fetch(
			`${PUBLIC_GO_BACKEND_URL}/v1/products?pageNum=` + $page.url.searchParams.get('pageNum'),
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.jwtToken}`
				}
			}
		);
		const result = await response.json();
		return result.data.products;
	}
	onMount(async () => {
		products = await getProducts();
	});

	async function updateProduct() {
		if (selectedProduct) {
			const index = products.findIndex((p) => p.id === selectedProduct!!.id);
			if (index !== -1) {
				console.log(selectedProduct);
				products[index] = { ...selectedProduct };
			}
			const response = await fetch(`${PUBLIC_GO_BACKEND_URL}/v1/products/update-detail`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.jwtToken}`
				},
				body: JSON.stringify(products[index])
			});
		}
		selectedProduct = null;
	}
</script>

<svelte:head>
	<title>Product Management</title>
</svelte:head>
<div class=" mb-4 py-5 text-center text-3xl font-bold">Product Management</div>
<AddButton on:click={() => addPoductModal()} />
<table class="table-auto">
	<thead>
		<tr class="bg-gray-200 text-sm leading-normal text-gray-600">
			<th class="px-6 py-3">Name</th>
			<th class="px-6 py-3">Brand</th>
			<th class="px-6 py-3">Category</th>
			<th class="px-6 py-3">Price</th>
			<th class="px-6 py-3">Discount</th>
			<th class="px-6 py-3">Discount Price</th>
			<th class="px-6 py-3">Size & Stock</th>
			<th class="px-6 py-3">Publish Date</th>
			<th class="border px-6 py-3">Preview Image</th>
			<th class="border px-6 py-3">Review</th>
			<th class="border px-6 py-3">Edit</th>
		</tr>
	</thead>
	<tbody class="text-sm font-light text-gray-600">
		{#each products as product}
			<tr class="cursor-pointer border-b border-gray-200 hover:bg-gray-100">
				<td class="px-6 py-3">{product.name}</td>
				<td class="px-6 py-3">{product.brand}</td>
				<td class="px-6 py-3">{product.category}</td>
				<td class="px-6 py-3">${product.price.toFixed(2)}</td>
				<td class="px-6 py-3">{product.isDiscount ? 'Yes' : 'No'}</td>
				<td class="px-6 py-3">{product.discountPrice}</td>
				<td class="max-w-sm truncate border border-red-500 px-6 py-3">
					{JSON.stringify(product.size)}
				</td>
				<td class="px-6 py-1">{product.publishDate.replace('T00:00:00', '')}</td>
				<td class=" px-6 py-3">{product.imageUrl}</td>
				<td class=" px-6 py-3"><ViewButton on:click={() => openProductModal(product)} /></td>
				<td class=" px-6 py-3"><EditButton on:click={() => openProductModal(product)} /></td>
			</tr>
		{/each}
	</tbody>
</table>

{#if selectedProduct}
	<Modal
		{selectedProduct}
		on:close={() => (selectedProduct = null)}
		on:updateProduct={updateProduct}
	/>
{/if}

{#if add}
	<AddModal on:close={() => (selectedProduct = null)} on:updateProduct={updateProduct} />
{/if}

<!-- <div class="container mx-auto py-4"> -->

<!-- 	<div class="overflow-x-auto rounded-lg bg-white shadow-md"> -->
<!-- 		<table class="w-full table-auto"> -->
<!-- 			<thead> -->
<!-- 				<tr class="bg-gray-200 text-sm uppercase leading-normal text-gray-600"> -->
<!-- 					<th class="px-6 py-3">Name</th> -->
<!-- 					<th class="px-6 py-3">Brand</th> -->
<!-- 					<th class="px-6 py-3">Category</th> -->
<!-- 					<th class="px-6 py-3">Price</th> -->
<!-- 					<th class="px-6 py-3">isDiscount</th> -->
<!-- 					<th class="px-6 py-3">DiscountPrice</th> -->
<!-- 				</tr> -->
<!-- 			</thead> -->
<!-- 			<tbody class="text-sm font-light text-gray-600"> -->
<!-- 				<tr class="border-b border-gray-200 hover:bg-gray-100"> -->
<!-- 					<td class="px-6 py-3">Product A</td> -->
<!-- 					<td class="px-6 py-3">Brand X</td> -->
<!-- 					<td class="px-6 py-3">Electronics</td> -->
<!-- 					<td class="px-6 py-3">$99.99</td> -->
<!-- 					<td class="px-6 py-3">Yes</td> -->
<!-- 					<td class="px-6 py-3">$89.99</td> -->
<!-- 				</tr> -->
<!-- 				<tr class="border-b border-gray-200 hover:bg-gray-100"> -->
<!-- 					<td class="px-6 py-3">Product B</td> -->
<!-- 					<td class="px-6 py-3">Brand Y</td> -->
<!-- 					<td class="px-6 py-3">Clothing</td> -->
<!-- 					<td class="px-6 py-3">$49.99</td> -->
<!-- 					<td class="px-6 py-3">Yes</td> -->
<!-- 					<td class="px-6 py-3">$39.99</td> -->
<!-- 				</tr> -->
<!-- 				 Add more product rows here -->
<!-- 			</tbody> -->
<!-- 		</table> -->
<!-- 	</div> -->
<!-- 	<div class="mt-4 flex justify-end"> -->
<!-- 		<nav aria-label="Pagination"> -->
<!-- 			<ul class="flex"> -->
<!-- 				<li> -->
<!-- 					<a -->
<!-- 						href="/" -->
<!-- 						class="rounded-l border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700" -->
<!-- 						>Previous</a -->
<!-- 					> -->
<!-- 				</li> -->
<!-- 				<li> -->
<!-- 					<a -->
<!-- 						href="/" -->
<!-- 						class="border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700" -->
<!-- 						>1</a -->
<!-- 					> -->
<!-- 				</li> -->
<!-- 				<li> -->
<!-- 					<a -->
<!-- 						href="/" -->
<!-- 						class="border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700" -->
<!-- 						>2</a -->
<!-- 					> -->
<!-- 				</li> -->
<!-- 				<li> -->
<!-- 					<a -->
<!-- 						href="/" -->
<!-- 						class="rounded-r border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700" -->
<!-- 						>Next</a -->
<!-- 					> -->
<!-- 				</li> -->
<!-- 			</ul> -->
<!-- 		</nav> -->
<!-- 	</div> -->
<!-- </div> -->
