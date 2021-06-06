import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';

export interface TableConfig {
  tableHeaders: Array<{
    name: string,
    property: string,
    allowToggle: boolean,
    sortable?: boolean,
    metadata?: string,
    displayValue?: (value: any) => string | number,
    sortComparer?: (valueA: any, valueB: any) => number;
  }>;
  enableVirtualScroll: boolean;
  itemSize?: number;
}

@Component({
  selector: 'table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() tableConfig: TableConfig;
  @Input() data: any[];
  @Input() row: TemplateRef<any>;

  public presentedData: any[];
  public toggleState = {};
  public sortState: { prop: string, ascending: boolean };

  public contentEleWidth: number;

  constructor(public eleRef: ElementRef) {}

  ngOnInit() {
    this.presentedData = this.data;
  }


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
  }

  sortData(headerName: string) {
    const header = this.tableConfig.tableHeaders.find(h => h.name === headerName);
    if (this.sortState && this.sortState.prop === headerName) {
      this.sortState.ascending = !this.sortState.ascending;
      this.presentedData = [...this.presentedData.reverse()];
    } else {
      this.sortState = {
        prop: headerName,
        ascending: true
      };
      this.presentedData = [ ...header.sortComparer ?
        this.presentedData.sort(header.sortComparer)
        : this.presentedData.sort((a, b) => (a[header.property] - b[header.property]))];
    }
  }
}
