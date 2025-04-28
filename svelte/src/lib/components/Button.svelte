<script lang="ts">
	let { otsikko, disabled, onclick }: { otsikko: string; disabled: boolean; onclick: () => void } =
		$props();
</script>

<section>
	<button {onclick} {disabled}>{otsikko}</button>
</section>
