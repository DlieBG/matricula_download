import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloaderComponent } from './downloader/downloader.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { HomeComponent } from './home/home.component';
import { ListDownloaderComponent } from './list-downloader/list-downloader.component';
import { ParserComponent } from './parser/parser.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explorer', component: ExplorerComponent },
  { path: 'parser', component: ParserComponent },
  { path: 'downloader', component: DownloaderComponent },
  { path: 'list-downloader', component: ListDownloaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
