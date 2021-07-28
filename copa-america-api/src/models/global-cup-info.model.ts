import { Entity, model, property, hasMany} from '@loopback/repository';
import {HostCountry} from './host-country.model';
import {Group} from './group.model';

@model()
export class GlobalCupInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  edition: number;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'string',
    required: true,
  })
  organizerName: string;
  test?: string;

  @hasMany(() => HostCountry)
  hostCountries: HostCountry[];

  @hasMany(() => Group)
  groups: Group[];

  constructor(data?: Partial<GlobalCupInfo>) {
    super(data);
  }
}

export interface GlobalCupInfoRelations {
  // describe navigational properties here
}

export type GlobalCupInfoWithRelations = GlobalCupInfo & GlobalCupInfoRelations;
