<script lang="ts">
	interface Props {
		id: string;
		img: string;
		kysymys: string;
		vastaukset?: string[] | null;
		oikeaVastaus: string;
	}

	let { id, img, vastaukset, oikeaVastaus }: Props = $props();
	//Päivän kysymys: miten saan kysymykset, kuvat ja vastaukset näkymään pelisivulla?

	//Propin kautta aina valituskysymykset taulukon alkio kerrallaan?
</script>

<!--Placeholdereita oikeille asioilla-->
<img src="" alt="Koodi" />

<h1>jhdfjkh</h1>

<button>a</button>
<br />
<button>b</button>
<br />
<button>c</button>
<br />
<button>d</button>
