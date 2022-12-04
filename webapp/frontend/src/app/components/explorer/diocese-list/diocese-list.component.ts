import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DioceseService } from 'src/app/services/diocese/diocese.service';
import { Country } from 'src/app/types/country.type';
import { Diocese } from 'src/app/types/diocese.type';
import { CreateParserJobComponent } from '../../parser/create-parser-job/create-parser-job.component';

@Component({
  selector: 'app-diocese-list',
  templateUrl: './diocese-list.component.html',
  styleUrls: ['./diocese-list.component.scss']
})
export class DioceseListComponent implements OnInit {

  @Input() country!: Country;

  dioceses$!: Observable<Diocese[]>;

  displayedColumns: string[] = ['name', 'count', 'action'];

  constructor(
    private dioceseService: DioceseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDioceses(this.country.id);
  }

  getDioceses(countryId: string) {
    this.dioceses$ = this.dioceseService.getDioceses(countryId);
  }

  createParserJob(diocese: Diocese) {
    this.dialog.open(
      CreateParserJobComponent, {
      data: {
        country_regex: diocese.country,
        diocese_regex: diocese.id
      }
    });
  }

}
