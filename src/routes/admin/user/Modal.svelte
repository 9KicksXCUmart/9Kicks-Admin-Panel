<!-- AddUserModal.svelte -->
<script lang="ts">
	export let showModal: boolean;
	export let closeModal: () => void;
</script>

{#if showModal}
	<div class="modal fixed left-0 top-0 flex h-full w-full items-center justify-center">
		<div class="modal-overlay absolute h-full w-full bg-gray-900 opacity-50"></div>

		<div
			class="modal-container z-50 mx-auto w-11/12 overflow-y-auto rounded bg-white shadow-lg md:max-w-md"
		>
			<!-- Add margin if you want to see some of the overlay behind the modal-->
			<div class="modal-content px-6 py-4 text-left">
				<!--Title-->
				<div class="flex items-center justify-between pb-3">
					<p class="text-2xl font-bold">Add New User</p>
					<div class="modal-close z-50 cursor-pointer" on:click={closeModal}>
						<span class="text-black">&times;</span>
					</div>
				</div>

				<!--Body-->
				<div class="my-5">
					<!-- The form fields for adding a new user -->
				</div>

				<!--Footer-->
				<div class="flex justify-end pt-2">
					<button
						class="mr-2 rounded-lg bg-transparent p-3 px-4 text-black hover:bg-gray-300"
						on:click={closeModal}>Close</button
					>
					<button class="rounded-lg bg-blue-500 p-3 px-4 text-white hover:bg-blue-400">Add</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		transition: opacity 0.25s ease;
	}
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 40;
	}
</style>
