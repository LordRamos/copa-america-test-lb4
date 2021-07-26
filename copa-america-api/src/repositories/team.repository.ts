import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Team, TeamRelations, Group, Match, Player} from '../models';
import {GroupRepository} from './group.repository';
import {MatchRepository} from './match.repository';
import {PlayerRepository} from './player.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {

  public readonly group: BelongsToAccessor<Group, typeof Team.prototype.id>;

  public readonly homeMatches: HasManyRepositoryFactory<Match, typeof Team.prototype.id>;

  public readonly awayMatches: HasManyRepositoryFactory<Match, typeof Team.prototype.id>;

  public readonly players: HasManyRepositoryFactory<Player, typeof Team.prototype.id>;

  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>,
  ) {
    super(Team, dataSource);
    this.players = this.createHasManyRepositoryFactoryFor('players', playerRepositoryGetter,);
    this.awayMatches = this.createHasManyRepositoryFactoryFor('awayMatches', matchRepositoryGetter,);
    this.homeMatches = this.createHasManyRepositoryFactoryFor('homeMatches', matchRepositoryGetter,);
    this.group = this.createBelongsToAccessorFor('group', groupRepositoryGetter,);
  }
}
