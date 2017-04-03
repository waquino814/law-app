import { Pipe, PipeTransform } from '@angular/core';
import { MainDataServiceService } from './main-data-service.service';
import {PracticingAreaComponent } from '../practicing-area/practicing-area.component';

@Pipe({
    name: 'paIdToName',
    pure: true
})
export class PraciceAreasIdToNamePipe implements PipeTransform {
    constructor(private dataService: MainDataServiceService) {

    }
    transform(value: string[]) {
        return value;
    }


}
