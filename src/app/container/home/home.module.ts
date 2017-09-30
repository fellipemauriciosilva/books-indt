import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from 'app/api/module/api.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    RouterModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})

export class DashboardModule {}
