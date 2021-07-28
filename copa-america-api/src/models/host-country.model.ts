import { Entity, model, property, belongsTo } from '@loopback/repository';
import { GlobalCupInfo } from './global-cup-info.model';
import {Country} from './country.model';

@model({
  settings: {
    foreignKeys: {
      fk_hc_countryId: {
        name: 'fk_hc_countryId',
        entity: 'Country',
        entityKey: 'id',
        foreignKey: 'countryId',
      }, fk_hc_globalCupInfoId: {
        name: 'fk_hc_globalCupInfoId',
        entity: 'GlobalCupInfo',
        entityKey: 'id',
        foreignKey: 'globalCupInfoId',
      }
    }
  }
})
export class HostCountry extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @belongsTo(() => GlobalCupInfo)
  globalCupInfoId: number;

  @belongsTo(() => Country)
  countryId: number;

  constructor(data?: Partial<HostCountry>) {
    super(data);
  }
}

export interface HostCountryRelations {
  // describe navigational properties here
}

export type HostCountryWithRelations = HostCountry & HostCountryRelations;
