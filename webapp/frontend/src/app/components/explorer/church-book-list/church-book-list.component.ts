import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ChurchBookService } from 'src/app/services/church-book/church-book.service';
import { ChurchBook } from 'src/app/types/church-book.type';
import { Community } from 'src/app/types/community.type';
import { Country } from 'src/app/types/country.type';
import { Diocese } from 'src/app/types/diocese.type';

@Component({
  selector: 'app-church-book-list',
  templateUrl: './church-book-list.component.html',
  styleUrls: ['./church-book-list.component.scss']
})
export class ChurchBookListComponent implements OnInit {

  @Input() country!: Country;
  @Input() diocese!: Diocese;
  @Input() community!: Community;

  churchBooks$!: Observable<ChurchBook[]>;
  
  displayedColumns: string[] = ['label', 'type', 'period', 'complete', 'action'];

  constructor(
    private churchBookService: ChurchBookService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getChurchBooks(this.country.id, this.diocese.id, this.community.id);
  }
  
  getChurchBooks(countryId: string, dioceseId: string, communityId: string) {
    this.churchBooks$ = this.churchBookService.getChurchBooks(countryId, dioceseId, communityId);
  }

  downloadChurchBook(churchBook: ChurchBook) {
    this.churchBookService.queueChurchBookDownload(churchBook.country, churchBook.diocese, churchBook.community, churchBook.id).subscribe({
      next: () => {
        this.snackbar.open('Download gestartet', 'ok', { duration: 3000 });
      }
    });
  }

}
