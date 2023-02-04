import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GridComponent } from './grid.component';
import {EntityService} from "../services/entity/entity.service";
import {ColumnApi, GridApi, GridReadyEvent} from 'ag-grid-community';
import {MockHttpClient} from '../../mocks/mock-http-client';
import {HttpClient} from '@angular/common/http';
import {Entity} from '../models/entity.model';
import {RowItem} from '../models/responses/grid-response.model';
import {EntityItem} from '../models/entity-item.model';
import {MockEntityService} from '../../mocks/mock-entity-service';

describe('GridComponent', () => {
  let grid: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let httpClient: HttpClient;
  let entityService: EntityService;
  let entity: Entity;

  const row = new class implements RowItem {
      [name: string]: EntityItem;
      row = new EntityItem();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: EntityService, useClass: MockEntityService},
        {provide: HttpClient, useClass: MockHttpClient  },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    grid= fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    entityService = TestBed.inject(EntityService);
    entity = new Entity();
    fixture.detectChanges();
  });

   it('should create', () => {
    expect(grid).toBeTruthy();
  });

   it('should onGridReady been called', () => {
        const params: GridReadyEvent =  {
            api: new GridApi(),
            columnApi: new ColumnApi(),
            context: {},
            type: 'gridReady',
        } as GridReadyEvent;
        grid.onGridReady(params );
        fixture.detectChanges();
        expect(entityService.fetch).toHaveBeenCalled();
   });
});
