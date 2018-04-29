import { NgModule } from '@angular/core';

import { CapitalizePipe } from './capitalize.pipe';
import { ElapsedTimePipe } from './elapsed-time.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    ElapsedTimePipe
  ],
  exports: [
    CapitalizePipe,
    ElapsedTimePipe
  ]
})
export class PipesModule { }
