import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesListComponent } from './stories-list/stories-list.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'stories', component: StoriesListComponent },
  { path: '**', redirectTo: 'stories' } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
