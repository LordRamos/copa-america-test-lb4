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
import {LineUp} from '../models';
import {LineUpRepository} from '../repositories';

export class LineUpControllerController {
  constructor(
    @repository(LineUpRepository)
    public lineUpRepository : LineUpRepository,
  ) {}

  @post('/line-ups')
  @response(200, {
    description: 'LineUp model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineUp)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUp, {
            title: 'NewLineUp',
            exclude: ['id'],
          }),
        },
      },
    })
    lineUp: Omit<LineUp, 'id'>,
  ): Promise<LineUp> {
    return this.lineUpRepository.create(lineUp);
  }

  @get('/line-ups/count')
  @response(200, {
    description: 'LineUp model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineUp) where?: Where<LineUp>,
  ): Promise<Count> {
    return this.lineUpRepository.count(where);
  }

  @get('/line-ups')
  @response(200, {
    description: 'Array of LineUp model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineUp, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineUp) filter?: Filter<LineUp>,
  ): Promise<LineUp[]> {
    return this.lineUpRepository.find(filter);
  }

  @patch('/line-ups')
  @response(200, {
    description: 'LineUp PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUp, {partial: true}),
        },
      },
    })
    lineUp: LineUp,
    @param.where(LineUp) where?: Where<LineUp>,
  ): Promise<Count> {
    return this.lineUpRepository.updateAll(lineUp, where);
  }

  @get('/line-ups/{id}')
  @response(200, {
    description: 'LineUp model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineUp, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LineUp, {exclude: 'where'}) filter?: FilterExcludingWhere<LineUp>
  ): Promise<LineUp> {
    return this.lineUpRepository.findById(id, filter);
  }

  @patch('/line-ups/{id}')
  @response(204, {
    description: 'LineUp PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUp, {partial: true}),
        },
      },
    })
    lineUp: LineUp,
  ): Promise<void> {
    await this.lineUpRepository.updateById(id, lineUp);
  }

  @put('/line-ups/{id}')
  @response(204, {
    description: 'LineUp PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lineUp: LineUp,
  ): Promise<void> {
    await this.lineUpRepository.replaceById(id, lineUp);
  }

  @del('/line-ups/{id}')
  @response(204, {
    description: 'LineUp DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lineUpRepository.deleteById(id);
  }
}
