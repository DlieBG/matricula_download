import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommunityService } from 'src/app/services/community/community.service';
import { Community } from 'src/app/types/community.type';
import { Country } from 'src/app/types/country.type';
import { Diocese } from 'src/app/types/diocese.type';
import { CreateParserJobComponent } from '../../parser/create-parser-job/create-parser-job.component';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {

  @Input() country!: Country;
  @Input() diocese!: Diocese;

  communities$!: Observable<Community[]>;

  displayedColumns: string[] = ['name', 'action'];

  constructor(
    private communityService: CommunityService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCommunities(this.country.id, this.diocese.id);
  }

  getCommunities(countryId: string, dioceseId: string) {
    this.communities$ = this.communityService.getCommunities(countryId, dioceseId);
  }

  createParserJob(community: Community) {
    this.dialog.open(
      CreateParserJobComponent, {
      data: {
        country_regex: community.country,
        diocese_regex: community.diocese,
        community_regex: community.id,
        page_skip: false
      }
    });
  }

}
