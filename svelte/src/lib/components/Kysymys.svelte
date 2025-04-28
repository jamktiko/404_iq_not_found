<script lang="ts">
	import { onMount } from 'svelte';

	interface Kysymys {
		id: string;
		img: string;
		kysymys: string;
		vastaukset?: string[] | null;
		oikeaVastaus: string;
		vaikeustaso: string;
	}

	let kysymykset: Kysymys[] = [];

	onMount(async () => {
		const response = await fetch('/data/kysymykset.json');
		if (!response.ok) {
			throw new Error('Dataa ei löytynyt');
		}
		kysymykset = await response.json();
	});
</script>
