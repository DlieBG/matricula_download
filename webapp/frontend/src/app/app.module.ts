import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { ParserComponent } from './components/parser/parser.component';
import { ListDownloaderComponent } from './components/list-downloader/list-downloader.component';
import { CreateParserJobComponent } from './components/parser/create-parser-job/create-parser-job.component';
import { CountryListComponent } from './components/explorer/country-list/country-list.component';
import { CountryComponent } from './components/explorer/country/country.component';
import { DioceseListComponent } from './components/explorer/diocese-list/diocese-list.component';
import { DioceseComponent } from './components/explorer/diocese/diocese.component';
import { CommunityListComponent } from './components/explorer/community-list/community-list.component';
import { CommunityComponent } from './components/explorer/community/community.component';
import { ChurchBookListComponent } from './components/explorer/church-book-list/church-book-list.component';
import { ChurchBookComponent } from './components/explorer/church-book/church-book.component';
import { PageListComponent } from './components/explorer/page-list/page-list.component';
import { PagePreviewComponent } from './components/explorer/page-preview/page-preview.component';
import { ListDownloaderPageComponent } from './components/list-downloader/list-downloader-page/list-downloader-page.component';
import { CreateListDownloaderComponent } from './components/list-downloader/create-list-downloader/create-list-downloader.component';
import { ListDownloaderEntryComponent } from './components/list-downloader/list-downloader-entry/list-downloader-entry.component';
import { AddListDownloaderPageComponent } from './components/list-downloader/add-list-downloader-page/add-list-downloader-page.component';
import { ChangeFileNameComponent } from './components/list-downloader/change-file-name/change-file-name.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExplorerComponent,
    ParserComponent,
    ListDownloaderComponent,
    CreateParserJobComponent,
    CountryListComponent,
    CountryComponent,
    DioceseListComponent,
    DioceseComponent,
    CommunityListComponent,
    CommunityComponent,
    ChurchBookListComponent,
    ChurchBookComponent,
    PageListComponent,
    PagePreviewComponent,
    ListDownloaderPageComponent,
    CreateListDownloaderComponent,
    ListDownloaderEntryComponent,
    AddListDownloaderPageComponent,
    ChangeFileNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
