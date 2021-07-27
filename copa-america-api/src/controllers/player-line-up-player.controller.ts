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
  Player,
  LineUpPlayer,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerLineUpPlayerController {
  constructor(
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/line-up-players', {
    responses: {
      '200': {
        description: 'Array of Player has many LineUpPlayer',
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
    return this.playerRepository.lineUpPlayers(id).find(filter);
  }

  @post('/players/{id}/line-up-players', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineUpPlayer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Player.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUpPlayer, {
            title: 'NewLineUpPlayerInPlayer',
            exclude: ['id'],
            optional: ['playerId']
          }),
        },
      },
    }) lineUpPlayer: Omit<LineUpPlayer, 'id'>,
  ): Promise<LineUpPlayer> {
    return this.playerRepository.lineUpPlayers(id).create(lineUpPlayer);
  }

  @patch('/players/{id}/line-up-players', {
    responses: {
      '200': {
        description: 'Player.LineUpPlayer PATCH success count',
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
    return this.playerRepository.lineUpPlayers(id).patch(lineUpPlayer, where);
  }

  @del('/players/{id}/line-up-players', {
    responses: {
      '200': {
        description: 'Player.LineUpPlayer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(LineUpPlayer)) where?: Where<LineUpPlayer>,
  ): Promise<Count> {
    return this.playerRepository.lineUpPlayers(id).delete(where);
  }
}
