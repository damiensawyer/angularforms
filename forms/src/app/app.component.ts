import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
// import * as rx from 'rxjs';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public jsonResult: string;
  public isDirty: boolean;
  public profileForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.profileForm = this.fb.group({
      firstNameInput: [''],
      lastNameInput: [''],
      addressGroups: this.fb.array([
        this.fb.group({
          streetInput: [''],
          cityInput: [''],
          stateInput: [''],
          zipCodeInput: [''],
        }),
      ]),
    });

    this.profileForm.valueChanges
      .do(x => this.isDirty = true)
      // .filter(x => this.profileForm.controls['firstNameInput'].value === 'damien')
      .debounceTime(1000) // https://www.learnrxjs.io/operators/filtering/debouncetime.html
      // At the time of writing this doesn't work due to an rx bug. See workaround below as described here. 
      // https://github.com/ReactiveX/rxjs/issues/1686
      .distinctUntilChanged()
      .do(x => this.isDirty = false)
      .subscribe(x => {
        this.jsonResult = JSON.stringify(this.profileForm.value, undefined, 2);
      });

    /*
    this.changes$
    .debounceTime(SAVE_DELAY)
    .filter(isDifferent()) // continue only if different to last save
    .subscribe(draft => {
      save(draft)
    })
    function isDifferent() {
      let tmp: Draft = {...}; // 
      return (draft: Draft) => { return true if draft and tmp are different }
    }
    */
  }

  public addAddressGroup() {
    const fa = this.profileForm.controls['addressGroups'] as FormArray;

    fa.push(this.newAddressGroup());
  }

  public saveProfileForm() {

    console.log(this.profileForm.value);
    this.jsonResult = JSON.stringify(this.profileForm.value, undefined, 2);
  }


  private newAddressGroup() {
    return new FormGroup({
      streetInput: new FormControl(''),
      cityInput: new FormControl(''),
      stateInput: new FormControl(''),
      zipCodeInput: new FormControl(''),
    });
  }
}
