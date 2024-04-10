<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_KOTLIN_BACKEND_URL } from '$env/static/public';
	import AddUserModal from '../../../components/AddUserModal.svelte';
	export let data;

	let showAddUserModal = false;
	function toggleAddUserModal() {
		showAddUserModal = !showAddUserModal;
	}
	interface userInfo {
		id: string;
		email: string;
		password: string;
		firstname: string;
		lastname: string;
		shippingaddress: string[];
		isVerified: boolean;
	}
	let users: userInfo[] = [];

	async function getAllUsers() {
		try {
			const response = await fetch(`${PUBLIC_KOTLIN_BACKEND_URL}api/v1/user-management/users`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.jwtToken}`
				}
			});

			const result = await response.json();

			// Make sure you are accessing the correct path in your JSON structure
			return result.data;
		} catch (error) {
			console.error('Failed to fetch users:', error);
			return []; // Return an empty array in case of error to ensure users is always an array
		}
	}
	onMount(async () => {
		users = await getAllUsers();
	});
</script>

<div class="mb-4 flex items-center justify-between py-5">
	<div class="mb-4 py-5 text-center text-3xl font-bold">Users Management</div>
	<button
		class="rounded bg-gray-200 px-4 py-2 font-bold text-black hover:bg-gray-500"
		on:click={toggleAddUserModal}
	>
		+
	</button>
	<AddUserModal showModal={showAddUserModal} closeModal={toggleAddUserModal} {data} />
</div>
<table class="table-auto">
	<thead>
		<tr class="bg-gray-200 text-sm leading-normal text-gray-600">
			<th class="px-6 py-3">Email</th>
			<th class="px-6 py-3">FirstName</th>
			<th class="px-6 py-3">LastName</th>
			<th class="px-6 py-3">Shipping Address</th>
			<th class="px-6 py-3">Status</th>
			<th class="px-6 py-3">Edit</th>
		</tr>
	</thead>
	<tbody class="text-sm font-light text-gray-600">
		{#each users as user}
			<tr class="cursor-pointer border-b border-gray-200 hover:bg-gray-100">
				<td class="px-6 py-3">{user.email}</td>
				<td class="px-6 py-3">{user.firstName}</td>
				<td class="px-6 py-3">{user.lastName}</td>
				<td class="px-6 py-3">
					{user.shippingAddress.streetAddress}
					{user.shippingAddress.district}
				</td>
				<td>
					<span
						class="status-circle relative inline-block px-3 py-1 text-sm font-semibold leading-tight"
					>
						<span
							aria-hidden="true"
							class="absolute inset-0 rounded-full opacity-50 {user.isVerified
								? 'bg-green-200'
								: 'bg-red-200'}"
						></span>
						<span class="relative">{user.isVerified ? 'active' : 'inactive'}</span>
					</span>
				</td>
				<td class="px-6 py-3">Edit</td>
			</tr>
		{/each}
	</tbody>
</table>
