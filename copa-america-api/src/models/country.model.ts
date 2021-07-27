import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {City} from './city.model';
import {Referee} from './referee.model';
import {HostCountry} from './host-country.model';
import {Team} from './team.model';
import {Player} from './player.model';

@model()
export class Country extends Entity {
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

  @hasMany(() => City)
  cities: City[];

  @hasMany(() => Referee)
  referees: Referee[];

  @hasOne(() => HostCountry)
  hostCountry: HostCountry;

  @hasOne(() => Team)
  team: Team;

  @hasMany(() => Player, {keyTo: 'nationalityId'})
  players: Player[];

  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
