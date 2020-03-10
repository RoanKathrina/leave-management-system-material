import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

const material = [
  MatToolbarModule,
  MatBadgeModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatTableModule
]
@NgModule({
  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }