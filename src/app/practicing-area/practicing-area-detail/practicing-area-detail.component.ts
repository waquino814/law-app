import { Lawyer } from '../../data-objects/lawyer';
import { PracticeArea } from '../../data-objects/practice_areas';
import { MainDataServiceService } from '../../utils/main-data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'law-practicing-area-detail',
  templateUrl: './practicing-area-detail.component.html',
  styleUrls: ['./practicing-area-detail.component.css']
})
export class PracticingAreaDetailComponent implements OnInit {
  private practiceArea: PracticeArea;
  private $lawyers: Promise<Lawyer[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainDataServiceService: MainDataServiceService
  ) {}

  ngOnInit() {
      this.route.params
      .switchMap((params: Params) => this.mainDataServiceService.getPracticeArea(params['id']))
      .subscribe((practiceArea: PracticeArea) => {
        this.practiceArea = practiceArea;
        this.$lawyers = this.mainDataServiceService.getLawyersByPracticeArea(practiceArea.id);
        if (this.practiceArea === null) {
          this.goToPractice();
        }
      });
  }

  goToPractice() {
    this.router.navigate(['/practice']);
  }

}
