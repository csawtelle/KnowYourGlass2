export class Review {
    constructor(
			public brand: String,
			public category: String,
			public date: String,
			public image: String,
			public name: String,
			public page_paragraphs: Array<String>,
			public picture_descriptions: Array<String>,
			public pictures: Array<String>,
			public rating: String
    ){}
}
