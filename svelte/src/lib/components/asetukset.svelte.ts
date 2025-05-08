import type { Asetukset } from '$lib/types/asetukset';

type teemat = 'default' | 'olio' | 'kahvi';

const haluttuAsetus: Asetukset = $state({ teema: 'default', montaKysymysta: 10 });

export const asetukset = {
	get teema() {
		return haluttuAsetus.teema;
	},
	set teema(a: teemat) {
		haluttuAsetus.teema = a;
	},
	get montaKysymysta() {
		return haluttuAsetus.montaKysymysta;
	},
	set montaKysymysta(a: number) {
		haluttuAsetus.montaKysymysta = a;
	}
};
