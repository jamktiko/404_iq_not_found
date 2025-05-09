<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import { asetukset } from '$lib/components/asetukset.svelte';

	let teema = $state(asetukset.teema);

	let { children } = $props();

	onMount(() => {
		document.body.classList.remove('theme-default', 'theme-olio', 'theme-kahvi');
		document.body.classList.add(`theme-${teema}`);
	});
</script> -->

<!-- Aloitussivu -->
<!-- {@render children()} -->

<!-- Pelisivu -->
<!-- {@render children()} -->

<!-- Asetukset -->
<!-- {@render children()} -->

<!-- <style>
	:global(body.theme-default) {
		overflow-x: hidden;
		overflow-y: hidden;
		background: url('/img/taustakuvakokeilu.png') no-repeat center center fixed black;
		color: white;
	}
	:global(body.theme-olio) {
		overflow-x: hidden;
		overflow-y: hidden;
		background: url('/img/Hi.gif') no-repeat center center fixed black;
		color: black;
	}
	:global(body.theme-kahvi) {
		overflow-x: hidden;
		overflow-y: hidden;
		background: url() no-repeat center center fixed rgb(215, 155, 121);
		color: white;
	}
</style> -->
