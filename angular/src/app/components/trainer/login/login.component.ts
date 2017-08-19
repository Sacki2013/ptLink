import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainerAuthService } from '../../../services/trainerAuth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class TrainerLoginComponent implements OnInit {
  loginForm: FormGroup;

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
    this.loginForm = this.fb.group({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)    
    });
  }

  onLoginSubmit(){
    const trainer = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password      
    }
    this.authService.authenticateTrainer(trainer).subscribe(data => {
      if(data.success){
        this.authService.storeTrainerData(data.token, data.trainer);
        this.flashMessage.show('Hi, ' + data.trainer.fullName, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/trainer/dashboard']);
      } else {
        this.flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/trainer/login']);
      }
    });
  }
}
