<script lang="ts">
	interface Props {
		otsikko: String;
		onclick: () => void;
		disabled?: boolean;
	}

	let { otsikko, onclick, disabled = false }: Props = $props();
</script>

<section>
	<button {onclick} {disabled}>{otsikko}</button>
</section>

<style>
</style>
