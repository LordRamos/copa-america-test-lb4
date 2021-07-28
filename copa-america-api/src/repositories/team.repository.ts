import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Team, TeamRelations, Group, Player, LineUp, Match, Country } from '../models';
import { GroupRepository } from './group.repository';
import { PlayerRepository } from './player.repository';
import { LineUpRepository } from './line-up.repository';
import { MatchRepository } from './match.repository';
import { CountryRepository } from './country.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {

  public readonly group: BelongsToAccessor<Group, typeof Team.prototype.id>;

  public readonly players: HasManyRepositoryFactory<Player, typeof Team.prototype.id>;

  public readonly lineUps: HasManyRepositoryFactory<LineUp, typeof Team.prototype.id>;

  public readonly homeMatches: HasManyRepositoryFactory<Match, typeof Team.prototype.id>;

  public readonly awayMatches: HasManyRepositoryFactory<Match, typeof Team.prototype.id>;

  public readonly country: BelongsToAccessor<Country, typeof Team.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>, @repository.getter('LineUpRepository') protected lineUpRepositoryGetter: Getter<LineUpRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(Team, dataSource);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);

    this.awayMatches = this.createHasManyRepositoryFactoryFor('awayMatches', matchRepositoryGetter,);
    this.homeMatches = this.createHasManyRepositoryFactoryFor('homeMatches', matchRepositoryGetter,);
    this.lineUps = this.createHasManyRepositoryFactoryFor('lineUps', lineUpRepositoryGetter,);
    this.players = this.createHasManyRepositoryFactoryFor('players', playerRepositoryGetter,);
    this.registerInclusionResolver('players', this.players.inclusionResolver);

    this.group = this.createBelongsToAccessorFor('group', groupRepositoryGetter,);
  }
}
