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
  Team,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryTeamController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/team', {
    responses: {
      '200': {
        description: 'Country has one Team',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Team),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Team>,
  ): Promise<Team> {
    return this.countryRepository.team(id).get(filter);
  }

  @post('/countries/{id}/team', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(Team)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Country.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {
            title: 'NewTeamInCountry',
            exclude: ['id'],
            optional: ['countryId']
          }),
        },
      },
    }) team: Omit<Team, 'id'>,
  ): Promise<Team> {
    return this.countryRepository.team(id).create(team);
  }

  @patch('/countries/{id}/team', {
    responses: {
      '200': {
        description: 'Country.Team PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {partial: true}),
        },
      },
    })
    team: Partial<Team>,
    @param.query.object('where', getWhereSchemaFor(Team)) where?: Where<Team>,
  ): Promise<Count> {
    return this.countryRepository.team(id).patch(team, where);
  }

  @del('/countries/{id}/team', {
    responses: {
      '200': {
        description: 'Country.Team DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Team)) where?: Where<Team>,
  ): Promise<Count> {
    return this.countryRepository.team(id).delete(where);
  }
}
