import { BlogReducer } from './utils/stores/blog-reducer';
import { StoreModule } from '@ngrx/store';
import { MainDataServiceService } from './utils/main-data-service.service';
import { AppRoutingModule } from './utils/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'ng2-data-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { PracticingAreaComponent } from './practicing-area/practicing-area.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogComponent } from './blog/blog.component';
import { TeamComponent } from './team/team.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PracticingAreaDetailComponent } from './practicing-area/practicing-area-detail/practicing-area-detail.component';
import { PraciceAreasIdToNamePipe } from './utils/pracice-areas-id-to-name-pipe';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PracticingAreaComponent,
    HomeComponent,
    ContactComponent,
    AboutUsComponent,
    BlogComponent,
    TeamComponent,
    NotFoundComponent,
    PracticingAreaDetailComponent,
    PraciceAreasIdToNamePipe,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DataTableModule,
    NgxDatatableModule,
    StoreModule.provideStore({blog: BlogReducer})
  ],
  providers: [MainDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
