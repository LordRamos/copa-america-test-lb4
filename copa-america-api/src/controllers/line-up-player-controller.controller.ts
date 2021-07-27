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
import {LineUpPlayer} from '../models';
import {LineUpPlayerRepository} from '../repositories';

export class LineUpPlayerControllerController {
  constructor(
    @repository(LineUpPlayerRepository)
    public lineUpPlayerRepository : LineUpPlayerRepository,
  ) {}

  @post('/lineup-players')
  @response(200, {
    description: 'LineUpPlayer model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineUpPlayer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUpPlayer, {
            title: 'NewLineUpPlayer',
            exclude: ['id'],
          }),
        },
      },
    })
    lineUpPlayer: Omit<LineUpPlayer, 'id'>,
  ): Promise<LineUpPlayer> {
    return this.lineUpPlayerRepository.create(lineUpPlayer);
  }

  @get('/lineup-players/count')
  @response(200, {
    description: 'LineUpPlayer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineUpPlayer) where?: Where<LineUpPlayer>,
  ): Promise<Count> {
    return this.lineUpPlayerRepository.count(where);
  }

  @get('/lineup-players')
  @response(200, {
    description: 'Array of LineUpPlayer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineUpPlayer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineUpPlayer) filter?: Filter<LineUpPlayer>,
  ): Promise<LineUpPlayer[]> {
    return this.lineUpPlayerRepository.find(filter);
  }

  @patch('/lineup-players')
  @response(200, {
    description: 'LineUpPlayer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUpPlayer, {partial: true}),
        },
      },
    })
    lineUpPlayer: LineUpPlayer,
    @param.where(LineUpPlayer) where?: Where<LineUpPlayer>,
  ): Promise<Count> {
    return this.lineUpPlayerRepository.updateAll(lineUpPlayer, where);
  }

  @get('/lineup-players/{id}')
  @response(200, {
    description: 'LineUpPlayer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineUpPlayer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LineUpPlayer, {exclude: 'where'}) filter?: FilterExcludingWhere<LineUpPlayer>
  ): Promise<LineUpPlayer> {
    return this.lineUpPlayerRepository.findById(id, filter);
  }

  @patch('/lineup-players/{id}')
  @response(204, {
    description: 'LineUpPlayer PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUpPlayer, {partial: true}),
        },
      },
    })
    lineUpPlayer: LineUpPlayer,
  ): Promise<void> {
    await this.lineUpPlayerRepository.updateById(id, lineUpPlayer);
  }

  @put('/lineup-players/{id}')
  @response(204, {
    description: 'LineUpPlayer PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lineUpPlayer: LineUpPlayer,
  ): Promise<void> {
    await this.lineUpPlayerRepository.replaceById(id, lineUpPlayer);
  }

  @del('/lineup-players/{id}')
  @response(204, {
    description: 'LineUpPlayer DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lineUpPlayerRepository.deleteById(id);
  }
}
