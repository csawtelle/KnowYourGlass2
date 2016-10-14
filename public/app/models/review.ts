export class Review {
    constructor(
			public brand: string,
			public category: string,
			public date: string,
			public image: string,
			public name: string,
			public page_paragraphs: Array<string>,
			public picture_descriptions: Array<string>,
			public pictures: Array<string>,
			public rating: string
    ){}
}
