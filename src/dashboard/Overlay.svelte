<script>
	import { closeSidebar, sidebarOpen } from './store.ts';
</script>

<!-- Overlay will only be visible on small screens to emphasize the focus on sidebar when it is open.-->
<!--it's also used to close Sidebar on click outside-->
<button
	on:click={closeSidebar}
	class={$sidebarOpen
		? 'fixed left-0 top-0 z-30 h-screen w-screen bg-black opacity-40 lg:hidden'
		: ''}
/>
