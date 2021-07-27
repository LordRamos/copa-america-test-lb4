import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Country,
  Referee,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryRefereeController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/referees', {
    responses: {
      '200': {
        description: 'Array of Country has many Referee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Referee)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Referee>,
  ): Promise<Referee[]> {
    return this.countryRepository.referees(id).find(filter);
  }

  @post('/countries/{id}/referees', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(Referee)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Country.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Referee, {
            title: 'NewRefereeInCountry',
            exclude: ['id'],
            optional: ['countryId']
          }),
        },
      },
    }) referee: Omit<Referee, 'id'>,
  ): Promise<Referee> {
    return this.countryRepository.referees(id).create(referee);
  }

  @patch('/countries/{id}/referees', {
    responses: {
      '200': {
        description: 'Country.Referee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Referee, {partial: true}),
        },
      },
    })
    referee: Partial<Referee>,
    @param.query.object('where', getWhereSchemaFor(Referee)) where?: Where<Referee>,
  ): Promise<Count> {
    return this.countryRepository.referees(id).patch(referee, where);
  }

  @del('/countries/{id}/referees', {
    responses: {
      '200': {
        description: 'Country.Referee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Referee)) where?: Where<Referee>,
  ): Promise<Count> {
    return this.countryRepository.referees(id).delete(where);
  }
}
