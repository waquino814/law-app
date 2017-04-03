import { PracticeArea } from '../data-objects/practice_areas';
import { NgForm } from '@angular/forms';
import { Lawyer } from '../data-objects/lawyer';
import { MainDataServiceService } from '../utils/main-data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'law-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  private lastNameAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'
  ];
  private showingSearchResults = false;
  private lawyers: Lawyer[];
  private searchlawyers: Lawyer[];
  private practiceAreas: PracticeArea[];

  columns = [
    { prop: 'name' },
    { name: 'Practice Areas',  prop: 'practiceAreas' }
  ];

  constructor(private mainDataServiceService: MainDataServiceService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.mainDataServiceService.getLawyers().then(lawyers => this.lawyers = lawyers);
    this.mainDataServiceService.getPracticeAreas().then(practiceareas => this.practiceAreas = practiceareas);
  }

  getPracticeAreasName(ids: string[]): string {
    let areas = '';
    for (let id of ids) {
       let found =  this.practiceAreas.find(item => item.id.toUpperCase() === id.toUpperCase());
       if (found) { areas +=  found.name + ' , '; }
    }
    return areas;
  }

  searchLastName(initial: string) {
    this.searchlawyers = new Array<Lawyer>();
    this.searchlawyers = this.lawyers.filter(item => item.lastName.toUpperCase().startsWith(initial));
    this.showingSearchResults = true;
  }

  search(form: NgForm) {
    this.searchlawyers = this.lawyers;
    if (form.value.searchLastName || form.value.searchName) {
      this.searchlawyers = new Array<Lawyer>();
      if (form.value.searchLastName && form.value.searchName) {
        this.searchlawyers = this.lawyers.filter(item => item.lastName.toUpperCase().startsWith(form.value.searchLastName.toUpperCase())
                             && item.name.toUpperCase().startsWith(form.value.searchName.toUpperCase()));
      }else {
        if (form.value.searchName) {
          this.searchlawyers = this.lawyers.filter(item => item.name.toUpperCase().startsWith(form.value.searchName.toUpperCase()));
        }
        if (form.value.searchLastName) {
          this.searchlawyers = this.lawyers.filter(item => item.lastName.toUpperCase().startsWith(form.value.searchLastName.toUpperCase()));
        }
      }
    }
    this.showingSearchResults = true;
  }

  filterArray(criteria: string, value: string): Array<Lawyer> {
    if (criteria && value) {
      return this.lawyers.filter(item => item[criteria].toUpperCase().startsWith(value.toUpperCase()));
    }else {
      return null;
    }
  }

  showLawyerDetails(id: string) {
    console.log('show + ' + id);
  }

}
