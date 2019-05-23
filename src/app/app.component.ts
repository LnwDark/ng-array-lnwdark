import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-from-array';
  public formGroup: FormGroup;
  public memberList: FormArray;

  get memberFormGroup() {
    return this.formGroup.get('member') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      groupname: [null, Validators.compose([Validators.required])],
      member: this.fb.array([this.createMember()])
    });

    // set contactlist to this field
    this.memberList = this.formGroup.get('member') as FormArray;
  }

  createMember(): FormGroup {
    return this.fb.group({
      type: [null, Validators.compose([Validators.required])], // i.e Email, Phone
      name: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      value: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  addMember() {
    this.memberList.push(this.createMember());
  }

  removeMember(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.memberList.removeAt(index);
  }

  getmemberFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.memberList.controls[index] as FormGroup;
    return formGroup;
  }

  submit() {
    console.log(this.formGroup.value);
  }
}
