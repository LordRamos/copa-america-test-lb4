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
  Match,
  LineUp,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchLineUpController {
  constructor(
    @repository(MatchRepository) protected matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/line-ups', {
    responses: {
      '200': {
        description: 'Array of Match has many LineUp',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineUp)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<LineUp>,
  ): Promise<LineUp[]> {
    return this.matchRepository.lineUps(id).find(filter);
  }

  @post('/matches/{id}/line-ups', {
    responses: {
      '200': {
        description: 'Match model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineUp)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Match.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUp, {
            title: 'NewLineUpInMatch',
            exclude: ['id'],
            optional: ['matchId']
          }),
        },
      },
    }) lineUp: Omit<LineUp, 'id'>,
  ): Promise<LineUp> {
    return this.matchRepository.lineUps(id).create(lineUp);
  }

  @patch('/matches/{id}/line-ups', {
    responses: {
      '200': {
        description: 'Match.LineUp PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUp, {partial: true}),
        },
      },
    })
    lineUp: Partial<LineUp>,
    @param.query.object('where', getWhereSchemaFor(LineUp)) where?: Where<LineUp>,
  ): Promise<Count> {
    return this.matchRepository.lineUps(id).patch(lineUp, where);
  }

  @del('/matches/{id}/line-ups', {
    responses: {
      '200': {
        description: 'Match.LineUp DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(LineUp)) where?: Where<LineUp>,
  ): Promise<Count> {
    return this.matchRepository.lineUps(id).delete(where);
  }
}
