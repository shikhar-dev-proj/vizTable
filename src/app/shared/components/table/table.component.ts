import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

export interface TableConfig {
  tableHeaders: Array<{ name: string, property: string, metadata?: string, allowToggle: boolean }>;
  enableVirtualScroll: boolean;
  itemSize: number;
}

@Component({
  selector: 'table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input() tableConfig: TableConfig;
  @Input() data: any[];
  @Input() row: TemplateRef<any>;
  // @Output() updateToggleState = new EventEmitter<{}>();

  public toggleState = {};

  public tableEle: HTMLElement;
  public headerEle: HTMLElement;
  public contentEle: HTMLElement;

  constructor(public eleRef: ElementRef) {}


  ngOnInit() {
  }

  toggle(columnProp: string, value: boolean) {
    this.toggleState = {
      ...this.toggleState,
      [columnProp]: value
    };
    // this.updateToggleState.emit(this.toggleState);
  }
}
