<script lang="ts">
	// import { sound } from 'svelte-sound';
	// import click_mp3 from '/sounds/click.mp3';
	// use:sound={{ src: click_mp3, events: ['click'] }}
	interface Props {
		otsikko: String;
		onclick: () => void;
		disabled?: boolean;
		vastaus: boolean;
		asrc?: string
	}

	let { otsikko, onclick, disabled = false, vastaus }: Props = $props();

		const audio = new Audio('/sounds/testi1.mp3');
		audio.preload = 'auto';

		function playSound() {
			audio.currentTime = 0; // Reset the audio to the beginning
			audio.play().catch((error) => {
				console.error('Audio failed to play:', error);
			});
			onclick();
		}

</script>

<button onclick={playSound} {disabled}>
	{otsikko}
</button>

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
		height: 60px;
		background: black;
		color: white;
		font-family: 'Jaro';
		border: 3px solid white;
		border-radius: 30px;
		padding: 10px;
		margin: 1px 0;
		font-size: 20px;
		cursor: pointer;
		transition: background 0.3s;
		text-overflow: ellipsis;
	}
	.eiVastaus {
		align-items: center;
	}
	.vastaus:hover {
		background: #444;
	}
	.eiVastaus:hover {
		background: #083a08;
	}

	@media (max-width: 600px) {
		.vastaus {
			font-size: 15px;
		}
	}
	@media (max-width: 900px) {
		.eiVastaus {
			width: 700px;
			padding: 10px;
		}
	}

	@media (max-width: 820px) {
		.eiVastaus {
			width: 600px;
			padding: 10px;
		}
	}
	@media (max-width: 700px) {
		.eiVastaus {
			width: 500px;
			padding: 10px;
		}
	}
	@media (max-width: 600px) {
		.eiVastaus {
			width: 450px;
			padding: 10px;
		}
	}

	@media (max-width: 900px) {
		.eiVastaus {
    width: 700px;
    padding: 10px;
  }
}

@media (max-width: 820px) {
	.eiVastaus {
    width: 600px;
    padding: 10px;
  }
}
@media (max-width: 700px) {
  .eiVastaus {
    width: 500px;
    padding: 10px;
  }
}
@media (max-width: 600px) {
  .eiVastaus {
    width: 450px;
    padding: 10px;
  }
}
</style>
