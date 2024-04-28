<!-- Modal.svelte -->
<script lang="ts">
	export let jwt: any;
	export let selectedProductReview: string;
	let reviews = {} as reviewsDetail;
	interface reviewsDetail {
		averageRating: number;
		reviews: Array<reviewDetail>;
	}
	interface reviewDetail {
		reviewId: string;
		email: string;
		comment: string;
		rating: number;
		reviewDateTime: string;
		anonymous: boolean;
	}
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_GO_BACKEND_URL } from '$env/static/public';
	import DeleteButton from '../../../components/button/DeleteButton.svelte';
	// dispatch event
	const dispatch = createEventDispatcher();
	// close edit review menu
	function closeModal() {
		dispatch('close');
	}
	// get product review from backend
	async function getReviews() {
		const response = await fetch(
			`${PUBLIC_GO_BACKEND_URL}/v1/reviews?productId=${selectedProductReview}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`
				}
			}
		);
		try {
			const result = await response.json();
			return result.data;
		} catch (error) {
			console.error('Error parsing JSON:', error);
			return {};
		}
	}
	//schedules a callback to run as soon as the component has been mounted to the DOM
	onMount(async () => {
		console.log(selectedProductReview);
		reviews = await getReviews();
		console.log(reviews.reviews);
	});
</script>

<div class="bg-rgba(255,104,49,0.6) fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
	<div class="absolute inset-0 mx-auto my-auto h-3/5 w-4/6 bg-white">
		<!-- Close Button -->
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
		<!-- Area -->
		<div class="flex gap-8">
			<!-- Overall Rating -->
			<div
				class="flex items-center gap-4 rounded-md border bg-white px-8 py-4 text-gray-700 shadow"
			>
				<div>
					<div class="text-lg font-bold">Overall Rating</div>
					{#if Object.keys(reviews).length !== 0}
						<div class="text-sm">{reviews.averageRating}</div>
					{:else}
						<div class="text-sm">N/A</div>
					{/if}
				</div>
			</div>
			<!-- Total Review -->
			<div
				class="flex items-center gap-4 rounded-md border bg-white px-8 py-4 text-gray-700 shadow"
			>
				<div>
					<div class="text-lg font-bold">Total Review</div>
					{#if Object.keys(reviews).length !== 0}
						<div class="text-sm">{reviews.reviews.length}</div>
					{:else}
						<div class="text-sm">N/A</div>
					{/if}
				</div>
			</div>
			<!-- Product ID -->
			<div
				class="flex items-center gap-4 rounded-md border bg-white px-8 py-4 text-gray-700 shadow"
			>
				<div>
					<div class="text-lg font-bold">Product ID</div>
					<div class="text-sm">{selectedProductReview}</div>
				</div>
			</div>
		</div>
		<!-- Table -->
		<table class="table-auto">
			<thead>
				<tr class="bg-gray-200 text-sm leading-normal text-gray-600">
					<th class="px-6 py-3">Review ID</th>
					<th class="px-6 py-3">User Email</th>
					<th class="px-6 py-3">Comment</th>
					<th class="px-6 py-3">Rating</th>
					<th class="px-6 py-3">Create At</th>
					<th class="px-6 py-3">Anonymous</th>
				</tr>
			</thead>
			<tbody class="text-sm font-light text-gray-600">
				{#if Object.keys(reviews).length !== 0}
					{#each reviews.reviews as review}
						<tr class="cursor-pointer border-b border-gray-200 hover:bg-gray-100">
							<td class="px-6 py-3">{review.reviewId}</td>
							<td class="px-6 py-3">{review.email}</td>
							<td class="px-6 py-3">{review.comment}</td>
							<td class="px-6 py-3">{review.rating}</td>
							<td class="px-6 py-3">{review.reviewDateTime}</td>
							<td class="px-6 py-3">{review.anonymous}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
