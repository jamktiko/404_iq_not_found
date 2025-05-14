import { writable } from 'svelte/store';
import type { Asetukset } from '$lib/types/asetukset';

export const theme = writable<Asetukset['teema']>('default');

theme.subscribe((value) => {
	if (typeof document !== 'undefined') {
		document.body.classList.remove('theme-default', 'theme-olio', 'theme-kahvi');
		document.body.classList.add(`theme-${value}`);
	}
});
