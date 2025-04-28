<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<!--Placeholdereita oikeille asioilla-->

<!--Aloitussivu-->
<h1>404 IQ Not Found</h1>

<Button otsikko="Aloita" disabled={false} onclick={() => console.log('Aloitit pelin')} />

<!--Lopetussivu-->
<h1>Pelasit loppuun!</h1>
<p>haluatko pelata uudestaan?</p>
<Button otsikko="Uudestaan" disabled={false} onclick={() => console.log('Aloita peli uudestaan')} />

<style></style>
