<script>
	let { info = $bindable(), children } = $props();

	let dialog = $state(null);

	$effect(() => {
		if (dialog) {
			if (info) dialog.showModal();
			else dialog.close();
		}
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (info = false)}
	onclick={(e) => {
		if (e.target === dialog) info = false;
	}}
>
	<div>
		<span>
		{@render children()}
		
	</div>
</dialog>

<style>

	dialog {
		max-width: 100%;
		border: darkgreen 2px solid;
		border-radius: 0.5em;
	}
	dialog::backdrop {
		background: rgba(36, 35, 35, 0.4);
	}
	div {
		padding: 11em;
	}

</style>
