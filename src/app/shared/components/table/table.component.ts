import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, TemplateRef } from '@angular/core';

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
export class TableComponent implements AfterViewInit {

  @Input() tableConfig: TableConfig;
  @Input() data: any[];
  @Input() row: TemplateRef<any>;
  // @Output() updateToggleState = new EventEmitter<{}>();

  public toggleState = {};

  public contentEleWidth: number;

  constructor(public eleRef: ElementRef) {}


  ngAfterViewInit() {
    const contentEle: HTMLElement = this.eleRef.nativeElement.getElementsByClassName('table-content-comp')[0];
    if (contentEle) {
      this.contentEleWidth = contentEle.clientWidth;
    }
  }

  toggle(columnProp: string, value: boolean) {
    this.toggleState = {
      ...this.toggleState,
      [columnProp]: value
    };
    // this.updateToggleState.emit(this.toggleState);
  }
}
