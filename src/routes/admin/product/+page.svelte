<script lang="ts">
	import Modal from './Modal.svelte';

	interface Product {
		id: number;
		name: string;
		brand: string;
		category: string;
		price: number;
		isDiscount: boolean;
	}

	let products: Product[] = [
		{
			id: 1,
			name: 'Product A',
			brand: 'Brand X',
			category: 'Electronics',
			price: 99.99,
			isDiscount: false
		},
		{
			id: 2,
			name: 'Product B',
			brand: 'Brand Y',
			category: 'Clothing',
			price: 49.99,
			isDiscount: true
		}
		// Add more products here
	];

	let selectedProduct: Product | null = null;

	function openModal(product: Product) {
		selectedProduct = { ...product };
	}

	function updateProduct() {
		if (selectedProduct) {
			const index = products.findIndex((p) => p.id === selectedProduct.id);
			if (index !== -1) {
				products[index] = { ...selectedProduct };
			}
		}
		selectedProduct = null;
	}
</script>

<svelte:head>
	<title>Product Management</title>
</svelte:head>

<table class="w-full table-auto">
	<thead>
		<tr class="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
			<th class="px-6 py-3">Name</th>
			<th class="px-6 py-3">Brand</th>
			<th class="px-6 py-3">Category</th>
			<th class="px-6 py-3">Price</th>
			<th class="px-6 py-3">Discount</th>
		</tr>
	</thead>
	<tbody class="text-sm font-light text-gray-600">
		{#each products as product}
			<tr
				class="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
				on:click={() => openModal(product)}
			>
				<td class="px-6 py-3">{product.name}</td>
				<td class="px-6 py-3">{product.brand}</td>
				<td class="px-6 py-3">{product.category}</td>
				<td class="px-6 py-3">${product.price.toFixed(2)}</td>
				<td class="px-6 py-3">{product.isDiscount ? 'Yes' : 'No'}</td>
			</tr>
		{/each}
	</tbody>
</table>

{#if selectedProduct}
	<Modal on:close={() => (selectedProduct = null)}>
		<h2 class="mb-4 text-xl font-bold">Update Product</h2>
		<div class="mb-4">
			<label class="mb-2 block font-bold text-gray-700" for="name"> Name </label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				id="name"
				type="text"
				bind:value={selectedProduct.name}
			/>
		</div>
		<!-- Add more input fields for other attributes -->
		<button
			class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
			on:click={updateProduct}>Update</button
		>
	</Modal>
{/if}

<!-- <Content title="Product Management" /> -->
<!-- <div class="container mx-auto py-4"> -->
<!-- 	<div class="mb-4 text-3xl font-bold">Product Management</div> -->
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
<!-- 				<!-- Add more product rows here -->
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
