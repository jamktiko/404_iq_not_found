import type { Asetukset } from '$lib/types/asetukset';
import { theme } from '$lib/stores/teemaStore';

type teemat = 'default' | 'olio' | 'kahvi';

const haluttuAsetus: Asetukset = $state({ teema: 'default', montaKysymysta: 10 });

export const asetukset = {
	get teema() {
		return haluttuAsetus.teema;
	},
	set teema(a: teemat) {
		haluttuAsetus.teema = a;
		theme.set(a);
	},
	get montaKysymysta() {
		return haluttuAsetus.montaKysymysta;
	},
	set montaKysymysta(a: number) {
		if (!(a > 20) && a > 0) {
			haluttuAsetus.montaKysymysta = a;
		} else {
			throw new Error('Maksimi on 20!');
		}
	}
};
