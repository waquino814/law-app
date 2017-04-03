import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Company } from '../data-objects/company';
import { PracticeArea } from '../data-objects/practice_areas';
import { ContactRequest } from '../data-objects/contact_request';
import { MainDataServiceService } from '../utils/main-data-service.service';

@Component({
  moduleId: module.id,
  selector: 'law-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private company: Company;
  private successMessage: string;
  private practiceAreas: PracticeArea[];
  private contactRequest: ContactRequest;
  private currentClasses: {};
  constructor(private mainDataServiceService: MainDataServiceService) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.mainDataServiceService.getCompanyInfo().then(company => this.company = company);
    this.mainDataServiceService.getPracticeAreas().then(areas => this.practiceAreas = areas);
  }
  onSubmit(f: NgForm) {
    /* this is for demo only get the information from the from and display it on a message*/
    let msg = '';
    msg += 'contactName: ' + f.value.contactName;
    msg += ' contactPhone: ' + f.value.contactPhone;
    msg += ' contactEmail: ' + f.value.contactEmail;
    msg += ' contactRequestSummary: ' + f.value.contactRequestSummary;
    this.mainDataServiceService.getPracticeArea(f.value.contactSubjectOfInterest)
    .then(area => {
        if (area) {
            msg += ' contactSubjectOfInterest: ' + area.name;
        }
        this.displaySuccessMessage(msg);
        f.reset();
    });
  }

  displaySuccessMessage(message: string) {
     this.successMessage = 'NOTE: information provided' + message;
     setTimeout(() => this.successMessage = null, 10000);
    ;
  }
}
