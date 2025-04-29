<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	//tee sivu pelille ja reititä
</script>

<!--Placeholdereita oikeille asioilla-->

<!--Aloitussivu-->
<h1>404 IQ Not Found</h1>

<Button otsikko="Aloita" disabled={false} onclick={() => goto('/Pelisivu')} />

<style>
</style>
