import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainerAuthService } from '../../../services/trainerAuth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class TrainerProfileComponent implements OnInit {
  trainer: Object;
  editForm: FormGroup;
  selectedSex: String;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: TrainerAuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.trainer = data.trainer;
      this.createForm(data.trainer);
    },
    err => {
      console.log(err);
      return false;
      // TODO: Find out what these errors are and if user sppecific
    });
  }

  createForm(data){
    this.editForm = this.fb.group({
      firstName:       new FormControl(data.firstName, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])),
      lastName:        new FormControl(data.lastName, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])),
      userName:        new FormControl(data.userName, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(12)])),
      email:		       new FormControl(data.email, Validators.compose([Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)])),
      age:             new FormControl(data.age, Validators.required),
      sex:             new FormControl(null, Validators.required),      
      repsRef:         new FormControl(data.repsRef, Validators.required),
      password:        new FormControl(null, Validators.compose([Validators.required, Validators.minLength(12)]))    
    });
    this.selectedSex = data.sex;
  }

  onEditSubmit(){
    let trainer = this.editForm.value;
    this.authService.updateProfile(trainer).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.message, { cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/trainer/dashboard']);
      } else {
        this.flashMessage.show(data.message, { cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/trainer/profile']);
      }
    });
  }
}

