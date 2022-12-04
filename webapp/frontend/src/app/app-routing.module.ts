import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChurchBookComponent } from './components/explorer/church-book/church-book.component';
import { CommunityComponent } from './components/explorer/community/community.component';
import { CountryComponent } from './components/explorer/country/country.component';
import { DioceseComponent } from './components/explorer/diocese/diocese.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { HomeComponent } from './components/home/home.component';
import { ListDownloaderComponent } from './components/list-downloader/list-downloader.component';
import { ParserComponent } from './components/parser/parser.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explorer', children: [
    { path: '', component: ExplorerComponent },
    { path: ':countryId', component: CountryComponent },
    { path: ':countryId/:dioceseId', component: DioceseComponent },
    { path: ':countryId/:dioceseId/:communityId', component: CommunityComponent },
    { path: ':countryId/:dioceseId/:communityId/:churchBookId', component: ChurchBookComponent },
  ] },
  { path: 'parser', component: ParserComponent },
  { path: 'list-downloader', component: ListDownloaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
