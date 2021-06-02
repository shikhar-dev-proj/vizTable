import { Component } from '@angular/core';

@Component({
  selector: 'table-row',
  styleUrls: ['./table.component.scss'],
  template: `
    <div class="table-row-comp">
      <ng-content></ng-content>
      <div></div>
    </div>
  `
})
export class TableRowComponent {}
