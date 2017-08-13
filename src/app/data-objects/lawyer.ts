export class Lawyer {
     id: string;
     name: string;
     lastName: string;
     phone: string;
     img: string;
     biography: string;
     practiceAreas: string[];

     public getFullName(): string {
         return this.name + ' ' + this.lastName;
     }
}
