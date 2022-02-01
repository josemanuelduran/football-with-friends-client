import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';


import { MenuComponent } from './menu/menu.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { OverflowMenuComponent } from './overflow-menu/overflow-menu.component';
import { TeamsMakerComponent } from './teams-maker/teams-maker.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PaymentsFilterComponent } from './payments-filter/payments-filter.component';
import { PaymentManagementPlayerComponent } from './payments-management/payment-management-player/payment-management-player.component';
import { AddPaymentsComponent } from './payments-management/add-payments/add-payments.component';

@NgModule({
    imports: [
        // A list of supporting modules.
        IonicModule,
        TranslateModule,
    ],
    declarations: [
        // The component, directive and pipe classes that belong to this module.
        MenuComponent,
        EmptyStateComponent,
        AddMatchComponent,
        OverflowMenuComponent,
        TeamsMakerComponent,
        ScoreboardComponent,
        EditProfileComponent,
        PaymentsFilterComponent,
        PaymentManagementPlayerComponent,
        AddPaymentsComponent,
    ],
    entryComponents: [
        // A list of components that are not referenced in a reachable component template.
        EmptyStateComponent,
        AddMatchComponent,
        OverflowMenuComponent,
        TeamsMakerComponent,
        ScoreboardComponent,
        EditProfileComponent,
        PaymentsFilterComponent,
        PaymentManagementPlayerComponent,
        AddPaymentsComponent
    ],
    exports: [
        // A list of declarations — component, directive, and pipe classes — that an importing module can use.
        MenuComponent,
        EmptyStateComponent,
        AddMatchComponent,
        TeamsMakerComponent,
        PaymentsFilterComponent,
        PaymentManagementPlayerComponent,
        AddPaymentsComponent
    ],
    providers: [
        // A list of dependency injection providers.
    ]
})
export class ComponentsModule {
}
