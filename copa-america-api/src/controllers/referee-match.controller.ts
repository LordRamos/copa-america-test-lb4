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
  Referee,
  Match,
} from '../models';
import {RefereeRepository} from '../repositories';

export class RefereeMatchController {
  constructor(
    @repository(RefereeRepository) protected refereeRepository: RefereeRepository,
  ) { }

  @get('/referees/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Referee has many Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Match>,
  ): Promise<Match[]> {
    return this.refereeRepository.matches(id).find(filter);
  }

  @post('/referees/{id}/matches', {
    responses: {
      '200': {
        description: 'Referee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Match)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Referee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatchInReferee',
            exclude: ['id'],
            optional: ['refereeId']
          }),
        },
      },
    }) match: Omit<Match, 'id'>,
  ): Promise<Match> {
    return this.refereeRepository.matches(id).create(match);
  }

  @patch('/referees/{id}/matches', {
    responses: {
      '200': {
        description: 'Referee.Match PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {partial: true}),
        },
      },
    })
    match: Partial<Match>,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.refereeRepository.matches(id).patch(match, where);
  }

  @del('/referees/{id}/matches', {
    responses: {
      '200': {
        description: 'Referee.Match DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.refereeRepository.matches(id).delete(where);
  }
}
