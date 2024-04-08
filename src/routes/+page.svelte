<script>
	import Content from '../components/Content.svelte';
</script>

<svelte:head>
	<title>Salvia-kit Dashboard v10 with Svelte-kit</title>
</svelte:head>

<div class="flex flex-row gap-20 text-2xl font-bold">

	<a href="/admin/user" class="group text-sky-600 transition duration-300">
		User Management
		<span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
	</a>

	<a href="/admin/product" class="group text-sky-600 transition duration-300">
		Product Management
		<span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
	</a>

</div>

<style>

</style>
