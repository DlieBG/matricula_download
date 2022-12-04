import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Page } from 'src/app/types/page.type';

@Component({
  selector: 'app-page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss']
})
export class PagePreviewComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public page: Page
  ) { }

}
