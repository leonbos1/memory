import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { GamesComponent } from './games/games.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { PlayersComponent } from './players/players.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: 'players', component: PlayersComponent },
      { path: 'games', component: GamesComponent},
      { path: 'general-info', component: GeneralInfoComponent}
    ],
    canActivate: [AuthGuard]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
