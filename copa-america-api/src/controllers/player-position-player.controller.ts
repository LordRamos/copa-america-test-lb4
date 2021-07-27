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
  PlayerPosition,
  Player,
} from '../models';
import {PlayerPositionRepository} from '../repositories';

export class PlayerPositionPlayerController {
  constructor(
    @repository(PlayerPositionRepository) protected playerPositionRepository: PlayerPositionRepository,
  ) { }

  @get('/player-positions/{id}/players', {
    responses: {
      '200': {
        description: 'Array of PlayerPosition has many Player',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Player)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Player>,
  ): Promise<Player[]> {
    return this.playerPositionRepository.players(id).find(filter);
  }

  @post('/player-positions/{id}/players', {
    responses: {
      '200': {
        description: 'PlayerPosition model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PlayerPosition.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayerInPlayerPosition',
            exclude: ['id'],
            optional: ['playerPositionId']
          }),
        },
      },
    }) player: Omit<Player, 'id'>,
  ): Promise<Player> {
    return this.playerPositionRepository.players(id).create(player);
  }

  @patch('/player-positions/{id}/players', {
    responses: {
      '200': {
        description: 'PlayerPosition.Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Partial<Player>,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerPositionRepository.players(id).patch(player, where);
  }

  @del('/player-positions/{id}/players', {
    responses: {
      '200': {
        description: 'PlayerPosition.Player DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerPositionRepository.players(id).delete(where);
  }
}
