import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from './services/api.service';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
