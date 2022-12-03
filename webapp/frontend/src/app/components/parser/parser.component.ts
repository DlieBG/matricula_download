import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ParserJobService } from 'src/app/services/parser-job/parser-job.service';
import { ParserJob } from 'src/app/types/parser-job.type';
import { CreateParserJobComponent } from './create-parser-job/create-parser-job.component';

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss']
})
export class ParserComponent implements OnInit {

  parserJobs$!: Observable<ParserJob[]>;

  displayedColumns: string[] = ['status', 'time', 'error', 'regex', 'page_skip', 'action'];

  constructor(
    private parserJobService: ParserJobService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getParserJobs();
  }

  getParserJobs() {
    this.parserJobs$ = this.parserJobService.getParserJobs();
  }

  createParserJob(reference: ParserJob | null = null) {
    this.dialog.open(
      CreateParserJobComponent, {
      data: reference
    }).afterClosed().subscribe({
      next: () => {
        this.getParserJobs();
      }
    });
  }

  deleteParserJob(parserJob: ParserJob) {
    this.parserJobService.deleteParserJob(parserJob._id).subscribe({
      next: () => {
        this.getParserJobs();
      }
    });
  }

}
