<!-- Modal.svelte -->
<script lang="ts">
	export let createdProduct = {} as productDetail;
	interface productDetail {
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
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}

	function product() {
		dispatch('product');
	}

	function onChange(event: any) {
		createdProduct.isDiscount = event.currentTarget.value === 'true';
	}
	let stockSize: Record<string, number> = {};
	for (let i = 5.5; i <= 14; i += 0.5) {
		stockSize[i.toString()] = 0;
	}
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
		<h2 class="mb-4 text-center font-bold">Create Product</h2>
		<div class="grid grid-flow-row-dense grid-cols-4 grid-rows-4 content-center">
			<!-- Name -->
			<div class="col-span-2 ml-10 border border-red-500 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="name"> Name </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="name"
					type="text"
					bind:value={createdProduct.name}
				/>
			</div>
			<!-- Brand -->
			<div class="col-span-2 ml-10 border border-red-500 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="brand"> Brand </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="brand"
					type="text"
					bind:value={createdProduct.brand}
				/>
			</div>
			<!-- Price -->
			<div class="col-span-2 ml-10 border border-red-500 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="price"> Price </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="price"
					type="text"
					bind:value={createdProduct.price}
				/>
			</div>
			<!-- Discount Price -->
			<div class="col-span-2 ml-10 border border-red-500 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="name">Discount Price </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="name"
					type="text"
					bind:value={createdProduct.discountPrice}
				/>
			</div>
			<!-- Preview Image -->
			<div class="col-span-2 ml-10 mr-10 border border-red-500 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="imageUrl"> Preview Image </label>
				<textarea
					id="imageUrl"
					rows="2"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					bind:value={createdProduct.imageUrl}
				></textarea>
			</div>
			<!-- category -->
			<div class="col-span-2 ml-10 border border-red-500 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="category"> Category </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="category"
					type="text"
					bind:value={createdProduct.category}
				/>
			</div>
			<!-- isDiscount -->
			<div class="col-span-2 ml-10 border border-red-500 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="isDiscount"> isDiscount </label>
				<label>
					<input
						type="radio"
						name="isDiscount"
						value={true}
						checked={createdProduct.isDiscount === true}
						on:change={onChange}
					/> true
				</label>
				<label>
					<input
						type="radio"
						name="isDiscount"
						value={false}
						checked={createdProduct.isDiscount === false}
						on:change={onChange}
					/> false
				</label>
			</div>
			<!-- Size & Stock -->
			<div class="col-span-4 ml-10 mr-10 border border-red-500 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="size"> Size & Stock </label>
				<textarea
					id="size"
					rows="4"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					bind:value={stockSize}
				></textarea>
			</div>

			<div class="col-span-4 mb-1 border border-red-500 text-center font-bold">
				<button
					class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700 focus:outline-none"
					on:click={product}>Create</button
				>
			</div>
		</div>
	</div>
</div>
