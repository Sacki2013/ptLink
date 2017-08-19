import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainerAuthService } from '../../../services/trainerAuth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class TrainerRegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: TrainerAuthService,
    private flashMessage: FlashMessagesService
  ) { 
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
      age:             new FormControl(null, Validators.required),
      sex:             new FormControl(null, Validators.required),
      repsRef:         new FormControl(null, Validators.required),
      password:        new FormControl(null, Validators.compose([Validators.required, Validators.minLength(12)]))    
    });
  }

  onRegisterSubmit(){
    let newTrainer = this.registrationForm.value;
    this.authService.registerTrainer(newTrainer).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Trainer added.', { cssClass: 'alert-success', timeout: 10000 });
        this.router.navigate(['/']);
      } else {
        this.flashMessage.show('Unable to add trainer', { cssClass: 'alert-danger', timeout: 10000 });
        this.router.navigate(['/trainer/register']);
      }
    });
  }
  // TODO: Get more specific errors from backend for failed to add. data.message
}


