import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Entity} from '../shared/models/entity.model';
import {RowItem} from '../shared/models/responses/grid-response.model';
import {EntityItem} from '../shared/models/entity-item.model';

@Injectable()
export class MockEntityService {

    item: any = {
    action: 'do',
    active_in_topic: '',
    name: '',
    value: 0,
    value_string: '',
    select_data_indexed: null,
    assign_to: 'string',
    combo: '',
    dbtype: '',
    entity: '',
    group_id: '',
    group_id_array: [],
    hint: '',
    primary_key: '',
    primary_key_name: '',
    primary_key_table: '',
    primary_key_value: '',
    query: '',
    required: '',
    required_boolean: false,
    tab: '',
    table_name: '',
    title: '',
    title_default: '',
    type: '',
    value_default: '',
    value_field: '',
    value_name: '',
    value_primary_key: '',
    value_table: '',
    table_id: 0,
    parameters: [],
    fxFlex: 0,
    api: null,

    // Дополнительные поля
    hidden: false,
    active_in_topic_array: null,
    multiple: false,
}
    mockRow: RowItem = {
        row: new EntityItem(this.item),
    };

    fetch(entity: Entity): Observable<any> {
        return of([this.mockRow]);
    }
    fetch_one(entity: Entity): Observable<any> {
        return of([this.mockRow]);
    }
}
