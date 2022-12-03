import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { HomeComponent } from './components/home/home.component';
import { ListDownloaderComponent } from './components/list-downloader/list-downloader.component';
import { ParserComponent } from './components/parser/parser.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explorer', component: ExplorerComponent },
  { path: 'parser', component: ParserComponent },
  { path: 'list-downloader', component: ListDownloaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
