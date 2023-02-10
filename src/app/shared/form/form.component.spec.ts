import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {EntityService} from "../services/entity/entity.service";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {MockEntityService} from '../../mocks/mock-entity.service';
import {of} from 'rxjs';
import {EntityItem} from '../models/entity-item.model';
import {MockItemModel} from '../../mocks/mock-item.model';
import {RouterTestingModule} from '@angular/router/testing';
import {Entity} from '../models/entity.model';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let entityService: EntityService;
    let formBuilder: FormBuilder;
    let entity: Entity;
    let entityItem: EntityItem;
    let mockRowItem: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ReactiveFormsModule
            ],
            declarations: [FormComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: EntityService, useClass: MockEntityService},
                {provide: FormBuilder, useClass: FormBuilder },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        entityService = TestBed.inject(EntityService);
        formBuilder = TestBed.inject(FormBuilder);
        mockRowItem = new MockItemModel();
        entity = new Entity();
        entityItem = new EntityItem(mockRowItem);
        spyOn(entityService, 'fetch_one').and.returnValue(of({item: entityItem}));
        spyOn(formBuilder, 'group').and.returnValue(new FormGroup({}));
        formBuilder.group(entityItem);
        // fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init_form been called', () => {
        component.ngOnInit();
        entityService.fetch_one(entity);
        spyOn(component, 'init_form');
        fixture.detectChanges();
        expect(component.init_form).toHaveBeenCalled();
    });
});
