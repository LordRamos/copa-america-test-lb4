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
  HostCountry,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryHostCountryController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/host-country', {
    responses: {
      '200': {
        description: 'Country has one HostCountry',
        content: {
          'application/json': {
            schema: getModelSchemaRef(HostCountry),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<HostCountry>,
  ): Promise<HostCountry> {
    return this.countryRepository.hostCountry(id).get(filter);
  }

  @post('/countries/{id}/host-country', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(HostCountry)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Country.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HostCountry, {
            title: 'NewHostCountryInCountry',
            exclude: ['id'],
            optional: ['countryId']
          }),
        },
      },
    }) hostCountry: Omit<HostCountry, 'id'>,
  ): Promise<HostCountry> {
    return this.countryRepository.hostCountry(id).create(hostCountry);
  }

  @patch('/countries/{id}/host-country', {
    responses: {
      '200': {
        description: 'Country.HostCountry PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HostCountry, {partial: true}),
        },
      },
    })
    hostCountry: Partial<HostCountry>,
    @param.query.object('where', getWhereSchemaFor(HostCountry)) where?: Where<HostCountry>,
  ): Promise<Count> {
    return this.countryRepository.hostCountry(id).patch(hostCountry, where);
  }

  @del('/countries/{id}/host-country', {
    responses: {
      '200': {
        description: 'Country.HostCountry DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(HostCountry)) where?: Where<HostCountry>,
  ): Promise<Count> {
    return this.countryRepository.hostCountry(id).delete(where);
  }
}
