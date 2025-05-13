<script lang="ts">
	import '$lib/fonts/fonts.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children()}

<style>
	:global(body.theme-default) {
		overflow-x: hidden;
		overflow-y: hidden;
		background: url('/img/taustakuvakokeilu.png') no-repeat center center fixed black;
		background-size: cover;
		color: white;
		font-family: 'Jaro', sans-serif;
	}
	:global(body.theme-olio) {
		overflow-x: hidden;
		overflow-y: hidden;
		background: url('/img/Hi.gif') no-repeat center center fixed black;
		background-size: cover;
		color: black;
		font-family: 'Jaro', sans-serif;
	}
	:global(body.theme-kahvi) {
		overflow-x: hidden;
		overflow-y: hidden;
		background: url() no-repeat center center fixed rgb(215, 155, 121);
		background-size: cover;
		color: white;
		font-family: 'Jaro', sans-serif;
	}
	@media (max-width: 1200px) {
		:global(body.theme-default) {
			overflow-y: auto;
		}
		:global(body.theme-olio) {
			overflow-y: auto;
		}
		:global(body.theme-kahvi) {
			overflow-y: auto;
		}
	}
</style>
