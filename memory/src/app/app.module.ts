import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthGuard } from './services/auth.guard';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { PlayersComponent } from './players/players.component';
import { GamesComponent } from './games/games.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    GeneralInfoComponent,
    PlayersComponent,
    GamesComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {  path: '', 
      component: AdminComponent,
      canActivate: [AuthGuard] 
    },
      { path: 'login',
      component: LoginComponent
    }
    ])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
