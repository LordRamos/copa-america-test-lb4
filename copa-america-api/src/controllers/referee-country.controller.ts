import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Referee,
  Country,
} from '../models';
import {RefereeRepository} from '../repositories';

export class RefereeCountryController {
  constructor(
    @repository(RefereeRepository)
    public refereeRepository: RefereeRepository,
  ) { }

  @get('/referees/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to Referee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
          },
        },
      },
    },
  })
  async getCountry(
    @param.path.number('id') id: typeof Referee.prototype.id,
  ): Promise<Country> {
    return this.refereeRepository.country(id);
  }
}
