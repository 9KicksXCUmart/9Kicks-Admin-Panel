<!-- AddUserModal.svelte -->
<script lang="ts">
	import { PUBLIC_KOTLIN_BACKEND_URL } from '$env/static/public';

	export let showModal: boolean;
	export let closeModal: () => void;
	export let data;

	let email = '';
	let password = '';
	let firstName = '';
	let lastName = '';
	let streetAddress = '';
	let district = '';
	let isVerified = false;

	async function createUser() {
		//create a new user via POST
		const newUser = {
			email,
			password,
			firstName,
			lastName,
			shippingAddress: {
				streetAddress,
				district
			},
			isVerified
		};

		try {
			const response = await fetch(`${PUBLIC_KOTLIN_BACKEND_URL}/api/v1/user-management/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.jwtToken}`
				},
				body: JSON.stringify(newUser)
			});

			const result = await response.json();
			if (response.ok && result.status) {
				// Close the modal if the creation was successful
				closeModal();
			} else {
				console.error('Creation failed:', result.message);
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

{#if showModal}
	<div class="modal fixed left-0 top-0 mx-auto flex h-full w-full items-center justify-center">
		<div
			class="modal-overlay absolute h-full w-full bg-gray-900 opacity-50"
			on:click={closeModal}
		></div>

		<div
			class="modal-container z-50 mx-auto w-11/12 overflow-y-auto rounded bg-white shadow-lg md:max-w-md"
		>
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
					<form on:submit|preventDefault={createUser} class="p-4">
						<div class="mb-4">
							<label for="email" class="text-grey-darker mb-2 block text-sm font-bold">Email*</label
							>
							<input
								type="email"
								id="email"
								bind:value={email}
								required
								class="text-grey-darker w-full appearance-none rounded border px-3 py-2 shadow"
							/>
						</div>
						<div class="mb-4">
							<label for="password" class="text-grey-darker mb-2 block text-sm font-bold"
								>Password*</label
							>
							<input
								type="password"
								id="password"
								bind:value={password}
								required
								class="text-grey-darker w-full appearance-none rounded border px-3 py-2 shadow"
							/>
						</div>
						<div class="mb-4">
							<label for="firstName" class="text-grey-darker mb-2 block text-sm font-bold"
								>First Name*</label
							>
							<input
								type="text"
								id="firstName"
								bind:value={firstName}
								required
								class="text-grey-darker w-full appearance-none rounded border px-3 py-2 shadow"
							/>
						</div>
						<div class="mb-4">
							<label for="lastName" class="text-grey-darker mb-2 block text-sm font-bold"
								>Last Name*</label
							>
							<input
								type="text"
								id="lastName"
								bind:value={lastName}
								required
								class="text-grey-darker w-full appearance-none rounded border px-3 py-2 shadow"
							/>
						</div>

						<div class="mb-4">
							<label for="streetAddress" class="text-grey-darker mb-2 block text-sm font-bold"
								>Street Address*</label
							>
							<input
								type="text"
								id="streetAddress"
								bind:value={streetAddress}
								required
								class="text-grey-darker w-full appearance-none rounded border px-3 py-2 shadow"
							/>
						</div>
						<div class="mb-4">
							<label for="district" class="text-grey-darker mb-2 block text-sm font-bold"
								>District*</label
							>
							<input
								type="text"
								id="district"
								bind:value={district}
								required
								class="text-grey-darker w-full appearance-none rounded border px-3 py-2 shadow"
							/>
						</div>
						<button
							type="submit"
							class="rounded-lg bg-blue-500 p-3 px-4 text-white hover:bg-blue-400"
						>
							Submit
						</button>
					</form>
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
