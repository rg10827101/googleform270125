import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GFormService } from './g-form.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface FormField {
  sr: string;
  name: string;
  data_type: string;
  comp_type: string;
  error_message: string;
}

export interface IField {
  sr: string, 
  name: string, 
  data_type: string, 
  comp_type: string, 
  error_message: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  providers: [GFormService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'google-form';
  formFields: IField[] = [];
  form!: FormGroup;

  constructor(private gService: GFormService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({});
    this.gService.getData();
    this.gService.fields$.subscribe(fields => {
      this.formFields = fields;
      this.createFormControls(fields);
    });
  }

  createFormControls(fields: any) {
    fields.forEach((field: any) => {
      this.form.addControl(
        field.name,
        this.fb.control('', this.getValidators(field))
      );
    });
  }

  getValidators(field: any) {
    const validators = [];
    if (field.comp_type === 'email') {
      validators.push(Validators.email);
    } 
    if (field.comp_type === 'text') {
      validators.push(Validators.minLength(2));
    }
    return validators;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
