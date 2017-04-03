export class Post {
    public title: string;
    public comments: Post[];
    constructor(public id: string, public image: string, public content: string, public createdDated: string) {
    }
}
