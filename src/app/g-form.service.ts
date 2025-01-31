import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { Subject } from 'rxjs';


interface FormField {
  sr: string;
  name: string;
  data_type: string;
  comp_type: string;
  error_message: string;
}

@Injectable({
  providedIn: 'root'
})
export class GFormService {

  private fieldsSubject = new Subject<FormField[]>();
  fields$ = this.fieldsSubject.asObservable();
  constructor(private http: HttpClient) { }

 getData() {
    this.http.get('./../assets/data/data.csv', { responseType: 'text' })
      .subscribe(data => {
        Papa.parse(data, {
          header: true,
          complete: (result: any) => {
            this.fieldsSubject.next(result.data as FormField[]);
          }
        });
      });
  }
}
