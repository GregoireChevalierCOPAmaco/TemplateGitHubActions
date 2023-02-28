import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppAuthGuard } from './app.authguard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [AppAuthGuard, {
    provide: KeycloakService,
    useValue: keycloakService
 }],
 entryComponents: [AppComponent],
})
export class AppModule { 
  ngDoBootstrap(app: { bootstrap: (arg0: typeof AppComponent) => void; }) {
    keycloakService
      .init({
        config: {
          url: 'http://localhost:8080',
          realm: 'angular-keycloak-postgresRealm',
          clientId: 'apptest4200',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: [],
      })
      .then(() => {
        app.bootstrap(AppComponent);
      })
      .catch((error) =>
        console.error('[ngDoBootstrap] init Keycloak failed', error)
      );
  }
}