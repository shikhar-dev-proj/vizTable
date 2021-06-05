import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableComponent, TableConfig } from './table.component';

@Component({
  template: `
    <ng-template #rowTemplate><div class="row">Something here</div></ng-template>
    <table [tableConfig]="tableConfig" [data]="data" [row]="rowTemplate"></table>
  `
})
class WrapperComponent {
  @ViewChild(TableComponent, { static: false }) tableComponent: TableComponent;

  public tableConfig: TableConfig = {
    tableHeaders: [
      { name: 'First Column', allowToggle: false, 'property': 'first' },
      { name: 'Second Column', allowToggle: false, 'property': 'second' },
    ],
    enableVirtualScroll: true,
    itemSize: 50
  };
  public data = [
    { first: '1', second: '10' },
    { first: '2', second: '20' }
  ];
}

describe('Wrapper for TableComponent', () => {

  let fixture: ComponentFixture<WrapperComponent>;
  let wrapperComponent;
  let component: TableComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          WrapperComponent, TableComponent
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
          ScrollingModule
        ],
        providers: [
          ScrollDispatcher
        ]
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapperComponent = fixture.debugElement.componentInstance;
    component = wrapperComponent.tableComponent;
    fixture.detectChanges();
  });

  it('should create component with row template if provided', () => {
    expect(wrapperComponent.tableComponent).toBeTruthy();
  });

  it('should not create table if headers not passed', () => {
    wrapperComponent.tableConfig = {
      tableHeaders: [],
      enableVirtualScroll: false,
      itemSize: 50
    };
    wrapperComponent.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.table-header-comp')).toBeNull();
    expect(fixture.debugElement.nativeElement.querySelector('.table-content-comp')).toBeNull();
  });

  it('should not create table if data not passed', () => {
    wrapperComponent.tableConfig = {
      tableHeaders: [
        { name: 'First Column', allowToggle: false, 'property': 'first' },
        { name: 'Second Column', allowToggle: false, 'property': 'second' },
      ],
      enableVirtualScroll: false,
      itemSize: 50
    };
    wrapperComponent.data = [];

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.table-header-comp')).toBeNull();
    expect(fixture.debugElement.nativeElement.querySelector('.table-content-comp')).toBeNull();
  });

  it('should create basic component if properties passed appropriately', () => {
    wrapperComponent.tableConfig = {
      tableHeaders: [
        { name: 'First Column', allowToggle: false, 'property': 'first' },
        { name: 'Second Column', allowToggle: false, 'property': 'second' },
      ],
      enableVirtualScroll: false,
      itemSize: 50
    };
    wrapperComponent.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.table-header-comp')).toBeDefined();
    expect(fixture.debugElement.nativeElement.querySelector('.table-content-comp')).toBeDefined();
  });

  it('should create component with virtual scrolling enabled if enableVirtualScroll is set to true', () => {
    wrapperComponent.tableConfig = {
      tableHeaders: [
        { name: 'First Column', allowToggle: false, 'property': 'first' },
        { name: 'Second Column', allowToggle: false, 'property': 'second' },
      ],
      enableVirtualScroll: true,
      itemSize: 50
    };
    wrapperComponent.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('cdk-virtual-scroll-viewport')).toBeDefined();
  });

  it('should create component with row template if provided', fakeAsync(() => {
    wrapperComponent.tableConfig = {
      tableHeaders: [
        { name: 'First Column', allowToggle: false, 'property': 'first' },
        { name: 'Second Column', allowToggle: false, 'property': 'second' },
      ],
      enableVirtualScroll: true,
      itemSize: 50
    };
    wrapperComponent.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];

    fixture.detectChanges();
    tick(1000);
    expect(fixture.debugElement.nativeElement.querySelector('.default-row')).toBeNull();
  }));

  it('should contain appropriate header title', () => {
    wrapperComponent.tableConfig = {
      tableHeaders: [
        { name: 'First Column', allowToggle: false, 'property': 'first' },
        { name: 'Second Column', allowToggle: false, 'property': 'second' },
      ],
      enableVirtualScroll: false,
      itemSize: 50
    };
    wrapperComponent.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];
    fixture.detectChanges();
    const headerTitles = fixture.debugElement.nativeElement.querySelectorAll('.headerTitle');
    expect(headerTitles.length).toBe(2);
    expect(headerTitles[0].textContent).toEqual('First Column');
    expect(headerTitles[1].textContent).toEqual('Second Column');
  });

  it('should contain metadata with header title if configured', () => {
    wrapperComponent.tableConfig = {
      tableHeaders: [
        { name: 'First Column', metadata: 'I', allowToggle: false, 'property': 'first' },
        { name: 'Second Column', metadata: 'II', allowToggle: false, 'property': 'second' },
      ],
      enableVirtualScroll: false,
      itemSize: 50
    };
    wrapperComponent.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];
    fixture.detectChanges();
    const headerMetas = fixture.debugElement.nativeElement.querySelectorAll('.headerMeta');
    expect(headerMetas.length).toBe(2);
    expect(headerMetas[0].textContent).toEqual('I');
    expect(headerMetas[1].textContent).toEqual('II');
  });

  it('should not contain toggle option if not configured', () => {
    wrapperComponent.tableConfig = {
      tableHeaders: [
        { name: 'First Column', metadata: 'I', allowToggle: false, 'property': 'first' },
        { name: 'Second Column', metadata: 'II', allowToggle: false, 'property': 'second' },
      ],
      enableVirtualScroll: false,
      itemSize: 50
    };
    wrapperComponent.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];
    fixture.detectChanges();
    const toggles = fixture.debugElement.nativeElement.querySelectorAll('.headerToggle');
    expect(toggles.length).toBe(0);
  });

  it('should contain toggles if configured', () => {
    wrapperComponent.tableConfig = {
      tableHeaders: [
        { name: 'First Column', metadata: 'I', allowToggle: true, 'property': 'first' },
        { name: 'Second Column', metadata: 'II', allowToggle: true, 'property': 'second' },
      ],
      enableVirtualScroll: false,
      itemSize: 50
    };
    wrapperComponent.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];
    fixture.detectChanges();
    const toggles = fixture.debugElement.nativeElement.querySelectorAll('.headerToggle');
    expect(toggles.length).toBe(2);
    expect(toggles[0].textContent).toEqual('+');
    expect(toggles[1].textContent).toEqual('+');
  });


});

describe('TableComponent Standalone', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ScrollingModule
      ],
      providers: [
        ScrollDispatcher
      ]
    }).compileComponents();
  }));

  it('should be truthy', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call toggle if toggles clicked', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.debugElement.componentInstance;
    component.tableConfig = {
      tableHeaders: [
        { name: 'First Column', metadata: 'I', allowToggle: true, 'property': 'first' },
        { name: 'Second Column', metadata: 'II', allowToggle: true, 'property': 'second' },
      ],
      enableVirtualScroll: false,
      itemSize: 50
    };
    component.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];

    fixture.detectChanges();
    const toggles = fixture.debugElement.nativeElement.querySelectorAll('.headerToggle');
    expect(toggles.length).toBe(2);
    expect(toggles[0].textContent).toEqual('+');
    expect(toggles[1].textContent).toEqual('+');

    const plus = fixture.debugElement.query(By.css('.plus'));
    spyOn(component, 'toggle');
    plus.nativeElement.click();
    expect(component.toggle).toHaveBeenCalled();
    expect(component.toggle).toHaveBeenCalledWith('first', true);
  });

  it('should present default rows if Template not provided', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.debugElement.componentInstance;
    component.tableConfig = {
      tableHeaders: [
        { name: 'First Column', metadata: 'I', allowToggle: true, 'property': 'first' },
        { name: 'Second Column', metadata: 'II', allowToggle: true, 'property': 'second' },
      ],
      enableVirtualScroll: false,
      itemSize: 50
    };
    component.data = [
      { first: '1', second: '10' },
      { first: '2', second: '20' }
    ];

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.default-row').length).toBe(2);
    expect(fixture.debugElement.nativeElement.querySelectorAll('.default-row-cell').length).toBe(4);
  });
});
