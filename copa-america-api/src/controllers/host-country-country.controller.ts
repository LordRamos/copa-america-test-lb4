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
  Country,
} from '../models';
import {HostCountryRepository} from '../repositories';

export class HostCountryCountryController {
  constructor(
    @repository(HostCountryRepository)
    public hostCountryRepository: HostCountryRepository,
  ) { }

  @get('/host-countries/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to HostCountry',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
          },
        },
      },
    },
  })
  async getCountry(
    @param.path.number('id') id: typeof HostCountry.prototype.id,
  ): Promise<Country> {
    return this.hostCountryRepository.country(id);
  }
}
