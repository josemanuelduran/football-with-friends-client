import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';

import { MatchesPageComponent } from './matches.component';
import { MatchesListItemComponent } from './components/matches-list-item/matches-list-item.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        MatchesPageComponent,
        MatchesListItemComponent,
    ],
    imports: [
        IonicPageModule.forChild(MatchesPageComponent),
        TranslateModule,
        PipesModule,
        ComponentsModule,
        MomentModule,
    ],
    providers: [
    ],
    entryComponents: [
    ]
})
export class MatchesPageModule {}
