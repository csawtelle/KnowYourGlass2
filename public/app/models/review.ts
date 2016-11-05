export class Review {
    constructor(
			public brand: string,
			public category: string,
			public date: string,
			public image: string,
			public name: string,
      public rating: string,
			public paragraphs: Array<string>,
			public pictures: Array<string>
    ){}
}
