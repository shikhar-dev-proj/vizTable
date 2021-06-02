import { AfterViewChecked, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html'
})
export class TableComponent implements AfterViewChecked {
  public tableEle: HTMLElement;
  public headerEle: HTMLElement;
  public contentEle: HTMLElement;

  constructor(public eleRef: ElementRef) {}


  public ngAfterViewChecked() {
    this.tableEle = this.eleRef.nativeElement.getElementsByClassName(
      'table-container-comp'
    )[0];
    this.headerEle = this.eleRef.nativeElement.getElementsByClassName(
      'table-header-comp'
    )[0];
    this.contentEle = this.eleRef.nativeElement.getElementsByClassName(
      'table-content-comp'
    )[0];

  }

}
