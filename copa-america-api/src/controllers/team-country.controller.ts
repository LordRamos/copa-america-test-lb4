import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Team,
  Country,
} from '../models';
import {TeamRepository} from '../repositories';

export class TeamCountryController {
  constructor(
    @repository(TeamRepository)
    public teamRepository: TeamRepository,
  ) { }

  @get('/teams/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to Team',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
          },
        },
      },
    },
  })
  async getCountry(
    @param.path.number('id') id: typeof Team.prototype.id,
  ): Promise<Country> {
    return this.teamRepository.country(id);
  }
}
