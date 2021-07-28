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
  GlobalCupInfo,
  HostCountry,
} from '../models';
import {GlobalCupInfoRepository} from '../repositories';

export class GlobalCupInfoHostCountryController {
  constructor(
    @repository(GlobalCupInfoRepository) protected globalCupInfoRepository: GlobalCupInfoRepository,
  ) { }

  @get('/global-cup-infos/{id}/host-countries', {
    responses: {
      '200': {
        description: 'Array of GlobalCupInfo has many HostCountry',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HostCountry)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<HostCountry>,
  ): Promise<HostCountry[]> {
    return this.globalCupInfoRepository.hostCountries(id).find(filter);
  }

  @post('/global-cup-infos/{id}/host-countries', {
    responses: {
      '200': {
        description: 'GlobalCupInfo model instance',
        content: {'application/json': {schema: getModelSchemaRef(HostCountry)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof GlobalCupInfo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HostCountry, {
            title: 'NewHostCountryInGlobalCupInfo',
            exclude: ['id'],
            optional: ['globalCupInfoId']
          }),
        },
      },
    }) hostCountry: Omit<HostCountry, 'id'>,
  ): Promise<HostCountry> {
    return this.globalCupInfoRepository.hostCountries(id).create(hostCountry);
  }

  @patch('/global-cup-infos/{id}/host-countries', {
    responses: {
      '200': {
        description: 'GlobalCupInfo.HostCountry PATCH success count',
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
    return this.globalCupInfoRepository.hostCountries(id).patch(hostCountry, where);
  }

  @del('/global-cup-infos/{id}/host-countries', {
    responses: {
      '200': {
        description: 'GlobalCupInfo.HostCountry DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(HostCountry)) where?: Where<HostCountry>,
  ): Promise<Count> {
    return this.globalCupInfoRepository.hostCountries(id).delete(where);
  }
}
