export interface IKysymys {
	id: number;
	img: string;
	question: string;
	vastaukset?: string[] | null;
	oikeaVastaus: string;
}
