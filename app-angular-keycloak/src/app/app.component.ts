import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'app-angular-keycloak';
  
  public isLogged = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) { }

  public async ngOnInit(): Promise<void>{
    this.isLogged = await this.keycloak.isLoggedIn();
    type usersRoles = Array<{id: number, text: string}>

    if (this.isLogged) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  public initSession(){
    this.keycloak.login();
  }

  public closeSession(){
    this.keycloak.logout();
  }

}
