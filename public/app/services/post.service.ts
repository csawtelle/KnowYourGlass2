import { Injectable } from '@angular/core';
import { Post } from '../models/post';

const postsPromise: Promise<Post[]>  = Promise.resolve([
  { id: 1, title: 'Post number 1', description:'This is test paragraph #1', image:'../images/is3.jpg' },
  { id: 2, title: 'Post number 2', description:'This is test paragraph #2', image:'../images/is4.jpg' }
]);


@Injectable()
export class PostService {

  //Get all posts
  getPosts() {
    return postsPromise;
  }

  getPost(title) {
    return postsPromise.then(posts => posts.find(post => post.title === title));
  }
}
