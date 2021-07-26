import {Entity, model, property} from '@loopback/repository';

@model()
export class Player extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  shirtNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  nickName: string;

  @property({
    type: 'string',
    required: true,
  })
  nameOnShirt: string;

  @property({
    type: 'date',
    required: true,
  })
  birthDate: string;

  @property({
    type: 'number',
    required: true,
  })
  passportNumber: number;

  @property({
    type: 'date',
    required: true,
  })
  passportExpirationDate: string;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isCoach: boolean;


  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
