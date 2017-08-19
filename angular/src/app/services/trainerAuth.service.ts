import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TrainerAuthService {
  authToken: any;
  trainer: any;

  constructor(
    private http: Http
  ){ }

  registerTrainer(trainer){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:2204/trainer/register', trainer, { headers: headers }).map(res => res.json());
  }
}