import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HostCountry,
  GlobalCupInfo,
} from '../models';
import {HostCountryRepository} from '../repositories';

export class HostCountryGlobalCupInfoController {
  constructor(
    @repository(HostCountryRepository)
    public hostCountryRepository: HostCountryRepository,
  ) { }

  @get('/host-countries/{id}/global-cup-info', {
    responses: {
      '200': {
        description: 'GlobalCupInfo belonging to HostCountry',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GlobalCupInfo)},
          },
        },
      },
    },
  })
  async getGlobalCupInfo(
    @param.path.number('id') id: typeof HostCountry.prototype.id,
  ): Promise<GlobalCupInfo> {
    return this.hostCountryRepository.globalCupInfo(id);
  }
}
