<!-- Modal.svelte -->
<script lang="ts">
	export let createdProduct = { discountPrice: 0, isDiscount: false, sku: 'Test' } as productDetail;
	let files: FileList;
	interface productDetail {
		name: string;
		brand: string;
		category: string;
		price: number;
		isDiscount: boolean;
		discountPrice: number;
		sku: string;
		size: object;
	}
	import { createEventDispatcher } from 'svelte';
	// dispatch event
	const productDispatch = createEventDispatcher<{
		createProduct: { files: FileList; createdProduct: productDetail };
	}>();
	const dispatch = createEventDispatcher();
	// close add product menu
	function closeModal() {
		dispatch('close');
	}
	// dispatch createProduct event for page.svelte to call backend with createdProduct details and image
	function createProduct() {
		createdProduct.size = JSON.parse(stockSize);
		productDispatch('createProduct', { files, createdProduct });
	}
	// set isDisounted value
	function onChange(event: any) {
		createdProduct.isDiscount = event.currentTarget.value === 'true';
	}
	// set init value of product size map
	let initSize: Record<string, number> = {};
	for (let i = 5.5; i <= 14; i += 0.5) {
		initSize[i.toFixed(1).toString()] = 0;
	}
	let stockSize = JSON.stringify(initSize);
	// set discountPrice = 0 if no discount
	$: if (createdProduct.isDiscount === false) {
		createdProduct.discountPrice = 0;
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
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="name"> Name </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="name"
					type="text"
					bind:value={createdProduct.name}
				/>
			</div>
			<!-- Brand -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="brand"> Brand </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="brand"
					type="text"
					bind:value={createdProduct.brand}
				/>
			</div>
			<!-- Price -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="price"> Price </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="price"
					type="number"
					bind:value={createdProduct.price}
				/>
			</div>
			<!-- Discount Price -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="disprice">Discount Price </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="disprice"
					type="number"
					bind:value={createdProduct.discountPrice}
				/>
			</div>
			<!-- Preview Image -->
			<div class="col-span-2 ml-10 mr-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="imageUrl"> Preview Image </label>
				<input
					class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
					id="imageUrl"
					type="file"
					bind:files
				/>
			</div>
			<!-- category -->
			<div class="col-span-2 ml-10 font-bold">
				<label class="mb-2 block font-bold text-gray-700" for="category"> Category </label>
				<input
					class="focus:shadow-outline w-40% appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="category"
					type="text"
					bind:value={createdProduct.category}
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
					on:click={createProduct}>Create</button
				>
			</div>
		</div>
	</div>
</div>

<!-- <label class="mb-2 block font-bold text-gray-700" for="imageUrl"> Preview Image </label>
				<textarea
					id="imageUrl"
					rows="2"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					bind:value={createdProduct.imageUrl}
				></textarea> -->
