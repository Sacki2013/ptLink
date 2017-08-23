import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { TrainerAuthService } from '../../../services/trainerAuth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ConfirmPassword } from '../../../helpers/confirmPassword';

interface PermittedTags {
  id: number;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class TrainerRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  permittedTags: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: TrainerAuthService,
    private flashMessage: FlashMessagesService
  ) { 
    this.permittedTags = ['Cardio', 'Nutrition', 'Weight Training', 'Coaching'];
    this.createForm();
  }

  ngOnInit() {

  } 

  createForm(){
    this.registrationForm = this.fb.group({
      firstName:       new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])),
      lastName:        new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])),
      userName:        new FormControl(null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(12)])),
      email:		       new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)])),
      tags:            new FormArray([]),
      age:             new FormControl(null, Validators.required),
      sex:             new FormControl(null, Validators.required),
      repsRef:         new FormControl(null, Validators.required),
      password:        new FormControl(null, Validators.compose([Validators.required, Validators.minLength(12)])),
      confirmPassword: new FormControl(null, Validators.required)
    }, {
      validator: ConfirmPassword.MatchPassword
    });
    this.addTags();
  }

  addTags(){
    for(let tag of this.permittedTags){
      const control = new FormControl(tag, Validators.required);
      (<FormArray>this.registrationForm.get('tags')).push(control);
    }
  }

  onRegisterSubmit(){
    let newTrainer = this.registrationForm.value;
    for(let i = 0; i < this.permittedTags.length; i++){
      if(newTrainer.tags[i] === true){
        newTrainer.tags[i] = this.permittedTags[i];
      } else {
        newTrainer.tags.splice(i, 1);
      }
    }
    // TODO: The tags are added and tags named swapped for truthy, false value are still sent as false. Also may be some bug with initial selection or validation.
    this.authService.registerTrainer(newTrainer).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Trainer added.', { cssClass: 'alert-success', timeout: 10000 });
        this.router.navigate(['/']);
      } else {
        console.log(data);
        this.flashMessage.show('Unable to add trainer', { cssClass: 'alert-danger', timeout: 10000 });
        this.router.navigate(['/trainer/register']);
      }
    });
  }

  onClear(){
    this.registrationForm.reset();
  }
  // TODO: Get more specific errors from backend for failed to add. data.message
}


