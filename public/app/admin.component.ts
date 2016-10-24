import { Component } from '@angular/core';


const posts = [
  { id: 1, title: 'Post number 1', description:'This is test paragraph #1', image:'../images/is3.jpg' },
  { id: 2, title: 'Post number 2', description:'This is test paragraph #2', image:'../images/is4.jpg' }
]

@Component({
  selector: 'admin-page',
  templateUrl: 'views/admin.html'

})
export class AdminComponent { 
  posts = posts;
}
