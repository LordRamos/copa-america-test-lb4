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
import {HostCountry} from '../models';
import {HostCountryRepository} from '../repositories';

export class HostCountryController {
  constructor(
    @repository(HostCountryRepository)
    public hostCountryRepository : HostCountryRepository,
  ) {}

  @post('/host-countries')
  @response(200, {
    description: 'HostCountry model instance',
    content: {'application/json': {schema: getModelSchemaRef(HostCountry)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HostCountry, {
            title: 'NewHostCountry',
            exclude: ['id'],
          }),
        },
      },
    })
    hostCountry: Omit<HostCountry, 'id'>,
  ): Promise<HostCountry> {
    return this.hostCountryRepository.create(hostCountry);
  }

  @get('/host-countries/count')
  @response(200, {
    description: 'HostCountry model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HostCountry) where?: Where<HostCountry>,
  ): Promise<Count> {
    return this.hostCountryRepository.count(where);
  }

  @get('/host-countries')
  @response(200, {
    description: 'Array of HostCountry model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HostCountry, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HostCountry) filter?: Filter<HostCountry>,
  ): Promise<HostCountry[]> {
    return this.hostCountryRepository.find(filter);
  }

  @patch('/host-countries')
  @response(200, {
    description: 'HostCountry PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HostCountry, {partial: true}),
        },
      },
    })
    hostCountry: HostCountry,
    @param.where(HostCountry) where?: Where<HostCountry>,
  ): Promise<Count> {
    return this.hostCountryRepository.updateAll(hostCountry, where);
  }

  @get('/host-countries/{id}')
  @response(200, {
    description: 'HostCountry model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HostCountry, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(HostCountry, {exclude: 'where'}) filter?: FilterExcludingWhere<HostCountry>
  ): Promise<HostCountry> {
    return this.hostCountryRepository.findById(id, filter);
  }

  @patch('/host-countries/{id}')
  @response(204, {
    description: 'HostCountry PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HostCountry, {partial: true}),
        },
      },
    })
    hostCountry: HostCountry,
  ): Promise<void> {
    await this.hostCountryRepository.updateById(id, hostCountry);
  }

  @put('/host-countries/{id}')
  @response(204, {
    description: 'HostCountry PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() hostCountry: HostCountry,
  ): Promise<void> {
    await this.hostCountryRepository.replaceById(id, hostCountry);
  }

  @del('/host-countries/{id}')
  @response(204, {
    description: 'HostCountry DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.hostCountryRepository.deleteById(id);
  }
}
