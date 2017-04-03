import { actions } from '../../utils/stores/blog-reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms/src/directives';
import { Post } from '../../data-objects/post';
import { MainDataServiceService } from '../../utils/main-data-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit , OnDestroy {
    private post: Post;
  private blogState$: Observable<Post[]>;
  private blogStateSubscription: Subscription;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private mainDataServiceService: MainDataServiceService, private store: Store<Post[]>) {
    this.blogState$ = store.select('blog');
  }

   ngOnInit() {
      this.route.params
      .switchMap((params: Params) => this.mainDataServiceService.getPost(params['id']))
      .subscribe((post: Post) => {
        this.post = post;
        if (this.post === null) {
          this.goToBlog();
        }
      });
       this.blogStateSubscription = this.blogState$.subscribe();
  }
  ngOnDestroy() {
    this.blogStateSubscription.unsubscribe();
  }
  goToBlog() {
    this.router.navigate(['/blog']);
  }
  onAddComment(f: NgForm): void {
    this.addCommentToPost(this.post, f.value.comment);
    f.reset();
  }
  onAddCommentToComment(f: NgForm, id: string): void {
    this.addCommentToPost(this.post.comments.find(post => post.id === id), f.value.comment);
    f.reset();
  }

  addCommentToPost(target: Post, comment: string): void {
    let post: Post = new Post(this.getNextPostId(target), '', comment, this.getDate() );
    if (target.comments === undefined || target.comments === null) {
      target.comments = new Array<Post>();
    }
    target.comments.push(post);
    this.store.dispatch({type: actions.UPDATE, payload: this.post});
  }
  getNextPostId(target: Post): string {
    if (target.comments) {
      return (target.comments.length + 1).toString();
    }
    return '1';
  }
  getDate(): string {
    return new Date().toLocaleString();
  }
}
