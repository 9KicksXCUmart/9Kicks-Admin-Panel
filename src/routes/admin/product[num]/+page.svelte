<script lang="ts">
	export let data;
	import Modal from './Modal.svelte';
	import AddModal from './AddModal.svelte';
	import ReviewModal from './ReviewModal.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { PUBLIC_GO_BACKEND_URL } from '$env/static/public';
	import ViewButton from '../../../components/button/ViewButton.svelte';
	import EditButton from '../../../components/button/EditButton.svelte';
	import AddButton from '../../../components/button/AddButton.svelte';
	import { goto, invalidateAll } from '$app/navigation';

	let selectedProduct: productDetail | null = null;
	let selectedProductReview: string | null = null;
	let currentPage = Number($page.params.num);
	interface data {
		products: [
			{
				id: string;
				brand: string;
				name: string;
				category: string;
				price: number;
				discountPrice: number;
				isDiscount: boolean;
				imageUrl: string;
				publishDate: string;
				buyCount: number;
				size: object;
			}
		];
		jwtToken: string;
	}
	let products = data.products;
	let add = false;

	function addPoductModal() {
		add = true;
	}

	function openProductModal(product: productDetail) {
		selectedProduct = { ...product };
	}

	function openReviewModal(id: string) {
		selectedProductReview = id;
	}

	$: if (currentPage !== Number($page.params.num)) {
		goto('/admin/product' + currentPage);
		products = data.products;
	}

	function goBack() {
		if (currentPage > 1) {
			currentPage = currentPage - 1;
		}
	}

	function goFront() {
		currentPage = currentPage + 1;
	}

	async function updateProduct() {
		if (selectedProduct) {
			const index = products.findIndex((p) => p.id === selectedProduct!!.id);
			if (index !== -1) {
				products[index] = { ...selectedProduct };
			}
			console.log(products[index]);
			await fetch(`${PUBLIC_GO_BACKEND_URL}/v1/products/update-detail`, {
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

	async function createProduct(event: any) {
		const formData = new FormData();
		formData.append('image', event.detail.files[0]);
		let info: string = JSON.stringify(event.detail.createdProduct);
		formData.append('info', info);
		const response = await fetch(`${PUBLIC_GO_BACKEND_URL}/v1/products/create`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${data.jwtToken}`
			},
			body: formData
		});
	}

	async function handleDelete(productId: string) {
		const response = await fetch(`${PUBLIC_GO_BACKEND_URL}/v1/products/` + productId, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${data.jwtToken}`
			}
		});
		invalidateAll();
	}
</script>

<svelte:head>
	<title>Product Management</title>
</svelte:head>
<div class=" mb-4 py-5 text-center text-3xl font-bold">Product Management</div>
<div class="mr-10 flex w-full flex-col items-end p-4">
	<AddButton on:click={() => addPoductModal()} />
</div>
<table class="w-full table-auto">
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
			<th class="border px-6 py-3">Delete</th>
		</tr>
	</thead>
	<tbody class="text-sm font-light text-gray-600">
		{#if data.products !== null}
			{#each products as product}
				<tr class="cursor-pointer border-b border-gray-200 hover:bg-gray-100">
					<td class="px-6 py-3">{product.name}</td>
					<td class="px-6 py-3">{product.brand}</td>
					<td class="px-6 py-3">{product.category}</td>
					<td class="px-6 py-3">${product.price}</td>
					<td class="px-6 py-3">{product.isDiscount ? 'Yes' : 'No'}</td>
					<td class="px-6 py-3">{product.discountPrice}</td>
					<td class="max-w-80 break-words px-6 py-3">
						{JSON.stringify(product.size)}
					</td>
					<td class="px-6 py-1">{product.publishDate.replace('T00:00:00', '')}</td>
					<td class=" max-w-80 break-words px-6 py-3">{product.imageUrl}</td>
					<td class=" px-6 py-3"><ViewButton on:click={() => openReviewModal(product.id)} /></td>
					<td class=" px-6 py-3"><EditButton on:click={() => openProductModal(product)} /></td>
					<td class=" px-6 py-3"
						><button
							on:click={() => {
								handleDelete(product.id);
							}}>Delete</button
						></td
					>
				</tr>
			{/each}
		{/if}
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
	<AddModal on:close={() => (add = false)} on:createProduct={createProduct} />
{/if}

{#if selectedProductReview}
	<ReviewModal
		{selectedProductReview}
		jwt={data.jwtToken}
		on:close={() => (selectedProductReview = null)}
	/>
{/if}

<div class="xs:flex-row xs:justify-between flex flex-col items-center p-5">
	<div class="flex items-center">
		<button
			type="button"
			class="w-full rounded-l-xl border bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
			on:click={goBack}
		>
			<svg
				width="9"
				fill="currentColor"
				height="8"
				class=""
				viewBox="0 0 1792 1792"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
				/>
			</svg>
		</button>
		<button
			type="button"
			class="w-full border-y bg-white px-4 py-2 text-base text-indigo-500 hover:bg-gray-100"
		>
			{currentPage}
		</button>
		<button
			type="button"
			class="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
			on:click={() => {
				currentPage = currentPage + 1;
			}}
		>
			{currentPage + 1}
		</button>
		<button
			type="button"
			class="w-full border-y bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
			on:click={() => {
				currentPage = currentPage + 2;
			}}
		>
			{currentPage + 2}
		</button>
		<button
			type="button"
			class="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
			on:click={() => {
				currentPage = currentPage + 3;
			}}
		>
			{currentPage + 3}
		</button>
		<button
			type="button"
			class="w-full rounded-r-xl border-y border-r bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
			on:click={goFront}
		>
			<svg
				width="9"
				fill="currentColor"
				height="8"
				class=""
				viewBox="0 0 1792 1792"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
				/>
			</svg>
		</button>
	</div>
</div>
