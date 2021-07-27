import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Team, TeamRelations, Group, Player, LineUp} from '../models';
import {GroupRepository} from './group.repository';
import {PlayerRepository} from './player.repository';
import {LineUpRepository} from './line-up.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {

  public readonly group: BelongsToAccessor<Group, typeof Team.prototype.id>;

  public readonly players: HasManyRepositoryFactory<Player, typeof Team.prototype.id>;

  public readonly lineUps: HasManyRepositoryFactory<LineUp, typeof Team.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>, @repository.getter('LineUpRepository') protected lineUpRepositoryGetter: Getter<LineUpRepository>,
  ) {
    super(Team, dataSource);
    this.lineUps = this.createHasManyRepositoryFactoryFor('lineUps', lineUpRepositoryGetter,);
    this.players = this.createHasManyRepositoryFactoryFor('players', playerRepositoryGetter,);
    this.group = this.createBelongsToAccessorFor('group', groupRepositoryGetter,);
  }
}
