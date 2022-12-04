import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParserJobService } from 'src/app/services/parser-job/parser-job.service';
import { CreateParserJob, ParserJob } from 'src/app/types/parser-job.type';

@Component({
  templateUrl: './create-parser-job.component.html',
  styleUrls: ['./create-parser-job.component.scss']
})
export class CreateParserJobComponent implements OnInit {

  parserJob: CreateParserJob = {
    country_regex: '.*',
    diocese_regex: '.*',
    community_regex: '.*',
    page_skip: true
  }

  constructor(
    private parserJobService: ParserJobService,
    private dialog: MatDialogRef<CreateParserJobComponent>,
    @Inject(MAT_DIALOG_DATA) 
    private reference: ParserJob | null
  ) { }

  ngOnInit(): void {
    if(this.reference) {
      this.parserJob = {
        ...this.parserJob,
        ...this.reference
      }
    }
  }

  createParserJob() {
    this.parserJobService.createParserJob(this.parserJob).subscribe({
      next: () => {
        this.dialog.close();
      }
    });
  }

}
