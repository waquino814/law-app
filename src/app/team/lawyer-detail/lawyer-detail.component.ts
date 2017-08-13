import { PracticeArea } from '../../data-objects/practice_areas';
import { Lawyer } from '../../data-objects/lawyer';
import { MainDataServiceService } from '../../utils/main-data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-lawyer-detail',
  templateUrl: './lawyer-detail.component.html',
  styleUrls: ['./lawyer-detail.component.css']
})
export class LawyerDetailComponent implements OnInit {
  private lawyer: Lawyer;
   private $practiceAreas: Promise<PracticeArea[]>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainDataServiceService: MainDataServiceService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.mainDataServiceService.getLawyer(params['id']))
      .subscribe((lawyer: Lawyer) => {
        this.lawyer = lawyer;
        if (this.lawyer === null) {
          this.goToTeam();
        }
      });
    this.$practiceAreas = this.mainDataServiceService.getPracticeAreas();
  }
  goToTeam() {
    this.router.navigate(['/team']);
  }
  hasArea(item): boolean {
    return this.lawyer.practiceAreas.find(area => area.toUpperCase() === item.id.toUpperCase()) !== undefined;
  }
}
