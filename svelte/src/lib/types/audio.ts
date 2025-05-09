export const clickSound = new Audio('/sounds/whipp.mp3');

    export function playClickSound() {
    	clickSound.currentTime = 0;
    	clickSound.play().catch((error) => {
    		console.error('Äänen toisto epäonnistui:', error);
    	});
    }