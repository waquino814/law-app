export class ContactRequest {
  constructor(public name: string,
    public phone: string,
    public email: string,
    public requestSummary: string,
    public subjectOfInterest?: string
  ) {}
}
