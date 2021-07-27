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
  LineUp,
  LineUpPlayer,
} from '../models';
import {LineUpRepository} from '../repositories';

export class LineUpLineUpPlayerController {
  constructor(
    @repository(LineUpRepository) protected lineUpRepository: LineUpRepository,
  ) { }

  @get('/line-ups/{id}/line-up-players', {
    responses: {
      '200': {
        description: 'Array of LineUp has many LineUpPlayer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineUpPlayer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<LineUpPlayer>,
  ): Promise<LineUpPlayer[]> {
    return this.lineUpRepository.lineUpPlayers(id).find(filter);
  }

  @post('/line-ups/{id}/line-up-players', {
    responses: {
      '200': {
        description: 'LineUp model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineUpPlayer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof LineUp.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUpPlayer, {
            title: 'NewLineUpPlayerInLineUp',
            exclude: ['id'],
            optional: ['lineUpId']
          }),
        },
      },
    }) lineUpPlayer: Omit<LineUpPlayer, 'id'>,
  ): Promise<LineUpPlayer> {
    return this.lineUpRepository.lineUpPlayers(id).create(lineUpPlayer);
  }

  @patch('/line-ups/{id}/line-up-players', {
    responses: {
      '200': {
        description: 'LineUp.LineUpPlayer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUpPlayer, {partial: true}),
        },
      },
    })
    lineUpPlayer: Partial<LineUpPlayer>,
    @param.query.object('where', getWhereSchemaFor(LineUpPlayer)) where?: Where<LineUpPlayer>,
  ): Promise<Count> {
    return this.lineUpRepository.lineUpPlayers(id).patch(lineUpPlayer, where);
  }

  @del('/line-ups/{id}/line-up-players', {
    responses: {
      '200': {
        description: 'LineUp.LineUpPlayer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(LineUpPlayer)) where?: Where<LineUpPlayer>,
  ): Promise<Count> {
    return this.lineUpRepository.lineUpPlayers(id).delete(where);
  }
}
