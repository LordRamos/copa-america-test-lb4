import {Entity, model, property} from '@loopback/repository';

@model()
export class HostCountry extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  countryId?: number;

  constructor(data?: Partial<HostCountry>) {
    super(data);
  }
}

export interface HostCountryRelations {
  // describe navigational properties here
}

export type HostCountryWithRelations = HostCountry & HostCountryRelations;