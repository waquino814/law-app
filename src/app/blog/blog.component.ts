import { Observable, Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Post } from '../data-objects/post';
import { MainDataServiceService } from '../utils/main-data-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'law-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit , OnDestroy {
  private posts: Post[];
  private blogState$: Observable<Post[]>;
  private blogStateSubscription: Subscription;
  constructor(private mainDataServiceService: MainDataServiceService, private store: Store<Post[]>) {
    this.blogState$ = store.select('blog');
        // this call is used to initially load the store from the server and this logic should be moved to somewhere else
    this.mainDataServiceService.getPosts();
  }

  ngOnInit() {
    this.blogStateSubscription = this.blogState$.subscribe(state => this.posts = state);
  }
  ngOnDestroy() {
    this.blogStateSubscription.unsubscribe();
  }

  getCommentsCount(post: Post): number {
    if (post && post.comments) {
      return post.comments.length;
    }
    return 0;
  }
}
