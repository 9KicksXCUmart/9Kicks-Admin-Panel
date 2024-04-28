<script lang="ts">
	export let showModal: boolean;
	export let closeModal: () => void;
	export let user; // The user data to edit
	export let data;
	import { onMount } from 'svelte';
	import { PUBLIC_KOTLIN_BACKEND_URL } from '$env/static/public';

	let userId = user.userId.replace('USER#', '');

	let email = user.email;
	let password = user.password;
	let firstName = user.firstName;
	let lastName = user.lastName;
	let streetAddress = user.shippingAddress.streetAddress;
	let district = user.shippingAddress.district;
	let isVerified = user.isVerified;
	// Include a function to submit updated user information
	async function updateUser() {
		const userUpdateDTO = {
			userId: userId,
			email: email,
			password: password,
			firstName: firstName,
			lastName: lastName,
			shippingAddress: {
				streetAddress: streetAddress,
				district: district
			},
			isVerified: isVerified
		};

		try {
			const response = await fetch(`${PUBLIC_KOTLIN_BACKEND_URL}/api/v1/user-management/update`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.jwtToken}`
				},
				body: JSON.stringify(userUpdateDTO)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			closeModal(); // Close the modal on success
		} catch (error) {
			console.error('Failed to update user:', error);
		}
	}
	interface orderHistory {
		orderNo: string;
		orderdate: string;
		deliverStatus: string;
		totalprice: number;
	}
	let orderHistory: orderHistory[] = [];

	async function getOrderHistory() {
		//get the order history of the user
		try {
			const response = await fetch(
				`${PUBLIC_KOTLIN_BACKEND_URL}/api/v1/user-management/order/${userId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${data.jwtToken}`
					}
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			orderHistory = result.data;
		} catch (error) {
			console.error('Failed to fetch order history:', error);
		}
	}

	async function deleteUser() {
		//delete the user via DELETE
		try {
			const response = await fetch(
				`${PUBLIC_KOTLIN_BACKEND_URL}/api/v1/user-management/delete/${userId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${data.jwtToken}`
					}
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			closeModal(); // Close the modal on success
		} catch (error) {
			console.error('Failed to delete user:', error);
		}
	}

	onMount(() => {
		getOrderHistory();
	});
</script>

{#if showModal}
	<!-- Modal structure similar to AddUserModal -->
	<div class="modal fixed left-0 top-0 flex h-full w-full items-center justify-center">
		<div
			class="modal-overlay absolute h-full w-full bg-gray-900 opacity-50"
			on:click={closeModal}
		></div>
		<div
			class="modal-container z-50 mx-auto w-11/12 overflow-y-auto rounded bg-white shadow-lg md:max-w-md"
		>
			<!-- Form fields prefilled with the user's current data -->
			<form
				on:submit|preventDefault={updateUser}
				class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
			>
				<div class="mb-6">
					<h3 class="mb-2 text-xl">Personal Info</h3>
					<div class="mb-4 flex">
						<div class="mr-2 w-1/2">
							<label class="mb-2 block text-sm font-bold text-gray-700" for="email">
								Email (static)
							</label>
							<input
								bind:value={email}
								class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
								id="email"
								type="email"
								placeholder="Email"
								disabled
							/>
						</div>
						<div class="ml-2 w-1/2">
							<label class="mb-2 block text-sm font-bold text-gray-700" for="password">
								Password *
							</label>
							<input
								class="mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
								id="password"
								type="password"
								placeholder="password"
							/>
						</div>
					</div>
					<div class="mb-4 flex">
						<div class="mr-2 w-1/2">
							<label class="mb-2 block text-sm font-bold text-gray-700" for="first-name">
								First Name *
							</label>
							<input
								bind:value={firstName}
								class="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
								id="firstName"
								type="text"
								placeholder="Enter first name"
							/>
						</div>
						<div class="ml-2 w-1/2">
							<label class="mb-2 block text-sm font-bold text-gray-700" for="last-name">
								Last Name *
							</label>
							<input
								bind:value={lastName}
								class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
								id="last-name"
								type="text"
								placeholder="Last Name"
							/>
						</div>
					</div>
				</div>

				<div class="mb-4 flex items-center">
					<input
						id="isVerified"
						type="checkbox"
						bind:checked={isVerified}
						class="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
					<label for="isVerified" class="text-sm font-medium text-gray-700">Is Verified</label>
				</div>

				<div class="mb-6">
					<h3 class="mb-2 text-xl">Shipping Info</h3>
					<div class="mb-4">
						<label class="mb-2 block text-sm font-bold text-gray-700" for="district">
							District *
						</label>
						<input
							bind:value={district}
							class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
							id="district"
							type="text"
							placeholder="District"
						/>
					</div>
					<div class="mb-6">
						<label class="mb-2 block text-sm font-bold text-gray-700" for="street-address">
							Street Address *
						</label>
						<input
							bind:value={streetAddress}
							class="mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
							id="street-address"
							type="text"
							placeholder="123 Main St"
						/>
					</div>
				</div>

				<div class="mt-6">
					<h3 class="mb-4 text-xl">Order History</h3>
					<table class="min-w-full table-auto">
						<thead>
							<tr class="bg-gray-100">
								<th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Order No.</th>
								<th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Order Date</th>
								<th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Order Status</th>
								<th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Total Price</th>
							</tr>
						</thead>
						<tbody class="text-sm font-light text-gray-600"> </tbody>
						{#each orderHistory as order}
							<tr class="cursor-pointer border-b border-gray-200 hover:bg-gray-100">
								<td class="px-6 py-3">{order.orderId}</td>
								<td class="px-6 py-3">{order.orderDate}</td>
								<td class="px-6 py-3">{order.deliveryStatus}</td>
								<td class="px-6 py-3">{order.totalPrice}</td>
							</tr>
						{/each}
					</table>
				</div>

				<div class="flex items-center justify-between">
					<button
						class="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
						type="button"
						on:click={deleteUser}
					>
						Delete
					</button>
					<button
						class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.modal-container {
		width: 75%;
		max-width: 900px;
	}
</style>
