import { actions } from './stores/blog-reducer';
import { Observable, Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Post } from '../data-objects/post';
import { Lawyer } from '../data-objects/lawyer';
import { PracticeArea } from '../data-objects/practice_areas';
import { Company } from '../data-objects/company';
import { Http } from '@angular/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MainDataServiceService {
  private companyInfoUrl = '../assets/mock/company.json';
  private practiceAreasUrl = '../assets/mock/practice_areas.json';
  private lawyersUrl = '../assets/mock/lawyers.json';
  private postsUrl = '../assets/mock/posts.json';
  private blogState$: Observable<Post[]>;
  private blogStateSubscription: Subscription;
  private posts: Post[];
  constructor(private http: Http, private store: Store<Post[]>) {
    this.blogState$ = store.select('blog');
    this.blogStateSubscription = this.blogState$.subscribe(state => this.posts = state);
  }

  getCompanyInfo(): Promise< Company > {
    return this.http.get(this.companyInfoUrl)
    .toPromise()
    .then(response => response.json() as Company)
    .catch(this.handleError);
  }
  getPracticeAreas(): Promise<PracticeArea[]> {
    return this.http.get(this.practiceAreasUrl)
    .toPromise()
    .then(response => response.json() as PracticeArea[])
    .catch(this.handleError);
  }
   getPracticeArea(id: string): Promise<PracticeArea> {
    return this.http.get(this.practiceAreasUrl)
    .toPromise()
    .then(response => response.json() as PracticeArea[])
    .then(response => {
     let foundArea: PracticeArea = null;
      for (const practiceArea of response){
          if (practiceArea.id === id) {
              foundArea = practiceArea;
          }
      }
      return foundArea; })
    .catch(this.handleError);
  }

  getLawyers(): Promise<Lawyer[]> {
    return this.http.get(this.lawyersUrl)
    .toPromise()
    .then(response => response.json() as Lawyer[])
    .catch(this.handleError);
  }
   getLawyer(id: string): Promise<Lawyer> {
    return this.http.get(this.lawyersUrl)
    .toPromise()
    .then(response => response.json() as Lawyer[])
    .then(response => {
     let foundLawyer: Lawyer = null;
      for (const lawyer of response){
          if (lawyer.id === id) {
              foundLawyer = lawyer;
          }
      }
      return foundLawyer; })
    .catch(this.handleError);
  }

  getPosts() {
    if (this.posts.length <= 0) {
      this.http.get(this.postsUrl)
      .toPromise()
      .then(response => {
        this.store.dispatch({type: actions.LOAD, payload: response.json() as Post[]});
      })
      .catch(this.handleError);
    }
  }
   getPost(id: string): Promise<Post> {
    return this.http.get(this.postsUrl)
    .toPromise()
    .then(response => response.json() as Post[])
    .then(response => {
     let foundPost: Post = null;
      for (const post of response){
          if (post.id === id) {
              foundPost = post;
          }
      }
      return foundPost; })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
