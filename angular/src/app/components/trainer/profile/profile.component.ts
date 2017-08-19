import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerAuthService } from '../../../services/trainerAuth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class TrainerProfileComponent implements OnInit {
  trainer: Object;

  constructor(
    private router: Router,
    private authService: TrainerAuthService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.trainer = data.trainer;
    },
    err => {
      console.log(err);
      return false;
      // TODO: Find out what these errors are and if user sppecific
    }
  );
  }

}
