import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

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

  authenticateTrainer(trainer){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:2204/trainer/authenticate', trainer, { headers: headers }).map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:2204/trainer/profile', { headers: headers }).map(res => res.json());
  }

  updateProfile(trainer){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.put('http://localhost:2204/trainer/profile', trainer, { headers: headers }).map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeTrainerData(token, trainer){
    localStorage.setItem('id_token', token);
    localStorage.setItem('trainer', JSON.stringify(trainer));
    this.authToken = token;
    this.trainer = trainer;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.trainer = null;
    localStorage.clear();
  }
}