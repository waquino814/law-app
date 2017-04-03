import { PracticeArea } from '../data-objects/practice_areas';
import { Component, OnInit } from '@angular/core';
import { MainDataServiceService } from '../utils/main-data-service.service';
@Component({
  moduleId: module.id,
  selector: 'law-practicing-area',
  templateUrl: './practicing-area.component.html',
  styleUrls: ['./practicing-area.component.css']
})
export class PracticingAreaComponent implements OnInit {
  private practiceAreas: PracticeArea[];

  constructor(private mainDataServiceService: MainDataServiceService) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.mainDataServiceService.getPracticeAreas().then(areas => this.practiceAreas = areas);
  }

}
