import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { ShellComponent } from './shell/shell.component';
import { Page404Component } from './page404/page404.component';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  {
    path : '',
    component : ShellComponent,
    //can Activate Child: [LoginGuard]
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo: '/first'
      },
      {
        path:'first',
        component : FirstComponent
      },
      {
        path: 'makanan/:id',
        component: OrderFormComponent

      },
      {
        path: 'makanan',
        component: OrderFormComponent

      }
    ]
    
  },
  {
    path: '**',
    component : Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
