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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule  } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const material = [
  MatToolbarModule,
  MatBadgeModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatTableModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
]
@NgModule({
  imports: [
    material
  ],
  exports: [
    material,
    MatMomentDateModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class MaterialModule { }