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
  Player,
  Team,
} from '../models';
import { CountryRepository, PlayerRepository } from '../repositories';

export class CountryTeamController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
  ) { }
  // Countryname
  @get('/countries/{countryName}/team-players', {
    responses: {
      '200': {
        description: 'Country has one Team',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Player),
          },
        },
      },
    },
  })
  async get(
    @param.path.password('countryName') countryName: string,
    @param.query.object('filter') filter?: Filter<Team>,
  ): Promise<Player[]> {
    let country = await this.countryRepository.findOne({
      where: { name: countryName },
      include: ['team']

    })

    return this.playerRepository.find({ where: { teamId: country?.team.id }, include: ['playerPosition'], fields: ['id', 'lastName', 'shirtNumber', 'playerPositionId', 'isCoach'] })
  }

}
