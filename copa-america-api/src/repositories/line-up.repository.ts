import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {LineUp, LineUpRelations, Match, Team, LineUpPlayer} from '../models';
import {MatchRepository} from './match.repository';
import {TeamRepository} from './team.repository';
import {LineUpPlayerRepository} from './line-up-player.repository';

export class LineUpRepository extends DefaultCrudRepository<
  LineUp,
  typeof LineUp.prototype.id,
  LineUpRelations
> {

  public readonly match: BelongsToAccessor<Match, typeof LineUp.prototype.id>;

  public readonly team: BelongsToAccessor<Team, typeof LineUp.prototype.id>;

  public readonly lineUpPlayers: HasManyRepositoryFactory<LineUpPlayer, typeof LineUp.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('LineUpPlayerRepository') protected lineUpPlayerRepositoryGetter: Getter<LineUpPlayerRepository>,
  ) {
    super(LineUp, dataSource);
    this.lineUpPlayers = this.createHasManyRepositoryFactoryFor('lineUpPlayers', lineUpPlayerRepositoryGetter,);
    this.team = this.createBelongsToAccessorFor('team', teamRepositoryGetter,);
    this.match = this.createBelongsToAccessorFor('match', matchRepositoryGetter,);
  }
}
