<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_KOTLIN_BACKEND_URL } from '$env/static/public';
	import AddUserModal from '../../../components/AddUserModal.svelte';
	import EditUserModal from '../../../components/EditUserModal.svelte';
	export let data;

	let showAddUserModal = false;
	function toggleAddUserModal() {
		//toggle the popup add user menu
		showAddUserModal = !showAddUserModal;
	}
	interface userInfo {
		id: string;
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		shippingAddress: string[];
		isVerified: boolean;
	}
	let users: userInfo[] = [];
	let selectedUser = null;
	let showEditUserModal = false;
	let currentLastKey = '';
	let futureLastKey = '';
	let canGoNext = false;
	let previousKeysStack = [];

	function editUser(user) {
		// console.log(user);
		selectedUser = user;
		showEditUserModal = true;
		// console.log(showEditUserModal);
	}
	async function getAllUsers(direction = 'next') {
		// get all user from Dynamobd and listed in the table
		let url = `${PUBLIC_KOTLIN_BACKEND_URL}/api/v1/user-management/users`;
		if (direction === 'next' && futureLastKey) {
			// Navigating forward, use the future last key
			url += `?lastkey=${futureLastKey}`;
			previousKeysStack.push(currentLastKey); // Push the current key onto the stack
		} else if (direction === 'prev' && previousKeysStack.length > 0) {
			// Navigating backward, pop the last key from the stack
			let lastKey = previousKeysStack.pop();
			url += `?lastkey=${lastKey}`;
		}

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.jwtToken}`
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			if (result.data && result.data.length > 0) {
				users = result.data;
				currentLastKey = futureLastKey;
				futureLastKey = users[users.length - 1].userId.replace('USER#', '');
				canGoNext = result.data && result.data.length === 10; // Assuming 10 the page size
			} else {
				futureLastKey = '';
				canGoNext = false;
			}
			return result.data;
		} catch (error) {
			console.error('Failed to fetch users:', error);
			return []; // Return an empty array in case of error
		}
	}

	function nextPage() {
		getAllUsers('next');
	}

	function previousPage() {
		if (previousKeysStack.length > 0) {
			getAllUsers('prev');
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
	<AddUserModal
		showModal={showAddUserModal}
		closeModal={() => {
			toggleAddUserModal();
			getAllUsers(futureLastKey);
		}}
		{data}
	/>
</div>
<table class="w-full table-auto">
	<thead>
		<tr class="bg-gray-200 text-left text-sm leading-normal text-gray-600">
			<th class="px-6 py-3">Email</th>
			<th class="px-6 py-3">FirstName</th>
			<th class="px-6 py-3">LastName</th>
			<th class="px-6 py-3">Shipping Address</th>
			<th class="px-6 py-3">Status</th>
		</tr>
	</thead>
	<tbody class="text-sm font-light text-gray-600">
		{#each users as user}
			<tr
				class="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
				on:click={() => editUser(user)}
			>
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
			</tr>
		{/each}
		{#if showEditUserModal && selectedUser}
			<EditUserModal
				showModal={showEditUserModal}
				user={selectedUser}
				closeModal={() => {
					showEditUserModal = false;
					selectedUser = null;
					getAllUsers(futureLastKey);
				}}
				{data}
			/>
		{/if}
	</tbody>
</table>
<div class="mb-4 flex items-center justify-between py-5">
	<button
		class="rounded bg-gray-200 px-4 py-2 font-bold text-black hover:bg-gray-500"
		on:click={previousPage}
		disabled={previousKeysStack.length === 0}
	>
		Pre
	</button>
	<button
		class="rounded bg-gray-200 px-4 py-2 font-bold text-black hover:bg-gray-500"
		on:click={nextPage}
		disabled={!canGoNext}
	>
		Next
	</button>
</div>
