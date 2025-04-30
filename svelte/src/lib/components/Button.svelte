<script lang="ts">
	interface Props {
		otsikko: String;
		onclick: () => void;
		disabled?: boolean;
		vastaus: boolean;
	}

	let { otsikko, onclick, disabled = false, vastaus }: Props = $props();
</script>

{#if vastaus}
	<button class="vastaus" {onclick} {disabled}>{otsikko}</button>
{:else}
	<section>
		<button class="eiVastaus" {onclick} {disabled}>{otsikko}</button>
	</section>
{/if}

<style>
	.eiVastaus {
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
	.vastaus {
		display: block;
		width: 100%;
		background: black;
		color: white;
		font-family: 'Jaro';
		border: 2px solid white;
		border-radius: 30px;
		padding: 15px;
		font-size: 25px;
		margin: 10px 0;
		cursor: pointer;
		transition: background 0.3s;
	}

	.vastaus:hover {
		background: #444;
	}
</style>
