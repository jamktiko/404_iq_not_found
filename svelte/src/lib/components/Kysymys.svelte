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
</script>
