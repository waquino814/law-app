import { LawyerDetailComponent } from '../team/lawyer-detail/lawyer-detail.component';
import { BlogPostComponent } from '../blog/blog-post/blog-post.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent }          from '../app.component';
import {PracticingAreaComponent} from '../practicing-area/practicing-area.component';
import {PracticingAreaDetailComponent} from '../practicing-area/practicing-area-detail/practicing-area-detail.component';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { BlogComponent } from '../blog/blog.component';
import { TeamComponent } from '../team/team.component';
import { NotFoundComponent } from '../not-found/not-found.component';


const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'about',  component: AboutUsComponent },
  { path: 'blog',  component: BlogComponent },
  { path: 'blog/:id',  component: BlogPostComponent },
  { path: 'team',  component: TeamComponent },
  { path: 'team/:id',  component: LawyerDetailComponent },
  { path: 'practice',  component: PracticingAreaComponent },
  { path: 'practice/:id',  component: PracticingAreaDetailComponent },
  { path: 'contact',  component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**',  component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
