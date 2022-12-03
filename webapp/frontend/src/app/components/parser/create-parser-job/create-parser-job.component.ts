import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ParserJobService } from 'src/app/services/parser-job/parser-job.service';
import { CreateParserJob } from 'src/app/types/parser-job.type';

@Component({
  templateUrl: './create-parser-job.component.html',
  styleUrls: ['./create-parser-job.component.scss']
})
export class CreateParserJobComponent {

  parserJob: CreateParserJob = {
    country_regex: '.*',
    diocese_regex: '.*',
    community_regex: '.*',
    page_skip: true
  }

  constructor(
    private parserJobService: ParserJobService,
    private dialog: MatDialogRef<CreateParserJobComponent>
  ) { }

  createParserJob() {
    this.parserJobService.createParserJob(this.parserJob).subscribe({
      next: () => {
        this.dialog.close();
      }
    });
  }

}
