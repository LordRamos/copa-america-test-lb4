import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PlayerPosition} from '../models';
import {PlayerPositionRepository} from '../repositories';

export class PlayerPositionController {
  constructor(
    @repository(PlayerPositionRepository)
    public playerPositionRepository : PlayerPositionRepository,
  ) {}

  @post('/player-positions')
  @response(200, {
    description: 'PlayerPosition model instance',
    content: {'application/json': {schema: getModelSchemaRef(PlayerPosition)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerPosition, {
            title: 'NewPlayerPosition',
            exclude: ['id'],
          }),
        },
      },
    })
    playerPosition: Omit<PlayerPosition, 'id'>,
  ): Promise<PlayerPosition> {
    return this.playerPositionRepository.create(playerPosition);
  }

  @get('/player-positions/count')
  @response(200, {
    description: 'PlayerPosition model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PlayerPosition) where?: Where<PlayerPosition>,
  ): Promise<Count> {
    return this.playerPositionRepository.count(where);
  }

  @get('/player-positions')
  @response(200, {
    description: 'Array of PlayerPosition model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PlayerPosition, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PlayerPosition) filter?: Filter<PlayerPosition>,
  ): Promise<PlayerPosition[]> {
    return this.playerPositionRepository.find(filter);
  }

  @patch('/player-positions')
  @response(200, {
    description: 'PlayerPosition PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerPosition, {partial: true}),
        },
      },
    })
    playerPosition: PlayerPosition,
    @param.where(PlayerPosition) where?: Where<PlayerPosition>,
  ): Promise<Count> {
    return this.playerPositionRepository.updateAll(playerPosition, where);
  }

  @get('/player-positions/{id}')
  @response(200, {
    description: 'PlayerPosition model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PlayerPosition, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PlayerPosition, {exclude: 'where'}) filter?: FilterExcludingWhere<PlayerPosition>
  ): Promise<PlayerPosition> {
    return this.playerPositionRepository.findById(id, filter);
  }

  @patch('/player-positions/{id}')
  @response(204, {
    description: 'PlayerPosition PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerPosition, {partial: true}),
        },
      },
    })
    playerPosition: PlayerPosition,
  ): Promise<void> {
    await this.playerPositionRepository.updateById(id, playerPosition);
  }

  @put('/player-positions/{id}')
  @response(204, {
    description: 'PlayerPosition PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() playerPosition: PlayerPosition,
  ): Promise<void> {
    await this.playerPositionRepository.replaceById(id, playerPosition);
  }

  @del('/player-positions/{id}')
  @response(204, {
    description: 'PlayerPosition DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.playerPositionRepository.deleteById(id);
  }
}
