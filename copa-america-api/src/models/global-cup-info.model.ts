import {Entity, model, property} from '@loopback/repository';

@model()
export class GlobalCupInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

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


  constructor(data?: Partial<GlobalCupInfo>) {
    super(data);
  }
}

export interface GlobalCupInfoRelations {
  // describe navigational properties here
}

export type GlobalCupInfoWithRelations = GlobalCupInfo & GlobalCupInfoRelations;
