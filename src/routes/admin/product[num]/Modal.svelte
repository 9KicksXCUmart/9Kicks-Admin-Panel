<!-- Modal.svelte -->
<script lang="ts">
	export let selectedProduct: productDetail;
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
		buyCount: number;
		size: object;
	}
	import { createEventDispatcher } from 'svelte';
	// dispatch event
	const dispatch = createEventDispatcher();
	// close edit product menu
	function closeModal() {
		dispatch('close');
	}
	// dispatch updateProduct event for page.svelte to call backend with updateProduct details
	function updateProduct() {
		selectedProduct.size = JSON.parse(stockSize);
		dispatch('updateProduct');
	}
	// set isDisounted value
	function onChange(event: any) {
		selectedProduct.isDiscount = event.currentTarget.value === 'true';
	}
	// display product size map in JSON format
	let stockSize = JSON.stringify(selectedProduct.size).toString();
</script>

<div class="bg-rgba(255,104,49,0.6) fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
	<div class="absolute inset-0 mx-auto my-auto h-3/5 w-4/6 bg-white">
		<div class="absolute right-0 top-0">
			<button class="text-gray-500 hover:text-gray-700 focus:outline-none" on:click={closeModal}>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
		<h2 class="mb-4 text-center font-bold">Update Product</h2>
		<div class="grid grid-flow-row-dense grid-cols-4 grid-rows-4 content-center">
			<!-- product ID -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="id"> ID </label>
				<input
					disabled
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="id"
					type="text"
					bind:value={selectedProduct.id}
				/>
			</div>
			<!-- Name -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="name"> Name </label>
				<input
					class="focus:shadow-outline w-4/5 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="name"
					type="text"
					bind:value={selectedProduct.name}
				/>
			</div>
			<!-- Brand -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="brand"> Brand </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="brand"
					type="text"
					bind:value={selectedProduct.brand}
				/>
			</div>
			<!-- Price -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="price"> Price </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="price"
					type="text"
					bind:value={selectedProduct.price}
				/>
			</div>
			<!-- Discount Price -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="name">Discount Price </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="name"
					type="text"
					bind:value={selectedProduct.discountPrice}
				/>
			</div>
			<!-- Preview Image -->
			<div class="col-span-2 ml-10 mr-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="imageUrl"> Preview Image </label>
				<textarea
					id="imageUrl"
					rows="2"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					bind:value={selectedProduct.imageUrl}
				></textarea>
			</div>
			<!-- category -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="category"> Category </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="category"
					type="text"
					bind:value={selectedProduct.category}
				/>
			</div>
			<!-- isDiscount -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="isDiscount"> isDiscount </label>
				<label>
					<input
						type="radio"
						name="isDiscount"
						value={true}
						checked={selectedProduct.isDiscount === true}
						on:change={onChange}
					/> true
				</label>
				<label>
					<input
						type="radio"
						name="isDiscount"
						value={false}
						checked={selectedProduct.isDiscount === false}
						on:change={onChange}
					/> false
				</label>
			</div>
			<!-- Size & Stock -->
			<div class="col-span-4 ml-10 mr-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="size"> Size & Stock </label>
				<textarea
					id="size"
					rows="4"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					bind:value={stockSize}
				></textarea>
			</div>

			<div class="col-span-4 mb-1 text-center font-bold">
				<button
					class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700 focus:outline-none"
					on:click={updateProduct}>Update</button
				>
			</div>
		</div>
	</div>
</div>

<!-- <h2 class="mb-4 text-xl font-bold">Update Product</h2>
		<div class="mb-4">
			<label class="mb-2 block font-bold text-gray-700" for="name"> Name </label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				id="name"
				type="text"
				bind:value={selectedProduct.name}
			/>
		</div>
		Add more input fields for other attributes
		<button
			class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
			on:click={updateProduct}>Update</button
		> -->
