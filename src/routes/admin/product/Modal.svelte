<!-- Modal.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}
</script>

<div class="fixed inset-0 z-10 overflow-y-auto">
	<div class="flex min-h-screen items-center justify-center">
		<div class="rounded-lg bg-white p-6 shadow-lg">
			<div class="mb-4 flex items-center justify-between">
				<slot />
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
		</div>
	</div>
</div>
