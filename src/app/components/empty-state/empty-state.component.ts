import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fwf-empty-state',
    templateUrl: './empty-state.component.html'
})
export class EmptyStateComponent implements OnInit {

    @Input() image: string;

    constructor() {
    }

    ngOnInit() {
    }

}
