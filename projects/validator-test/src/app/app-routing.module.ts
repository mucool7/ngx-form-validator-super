import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DComponent } from "./sdsd/d.component";

const routes: Routes = [
  {path:'dd',component:DComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
