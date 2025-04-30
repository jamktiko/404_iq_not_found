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
	button {
		width: 800px;
		flex-shrink: 0;
		border-radius: 25px;
		border: 5px solid #fff;
		background: #000;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		color: #ffffff;
		text-align: center;
		font-family: 'Jaro', sans-serif;
		font-size: 45px;
		font-style: normal;
		font-weight: 400;
		line-height: 1.2;
		margin-top: 45px;
		margin-bottom: 35px;
		cursor: pointer;
	}
</style>
