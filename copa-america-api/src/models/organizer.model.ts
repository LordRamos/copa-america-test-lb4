import {Entity, model, property} from '@loopback/repository';

@model()
export class Organizer extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

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
  abbreviation: string;


  constructor(data?: Partial<Organizer>) {
    super(data);
  }
}

export interface OrganizerRelations {
  // describe navigational properties here
}

export type OrganizerWithRelations = Organizer & OrganizerRelations;
