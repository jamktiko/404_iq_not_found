<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	//tee sivu pelille ja reititä
</script>

<h1>Pelisivu</h1>

<Button otsikko="takaisin" onclick={() => goto('/')} />
