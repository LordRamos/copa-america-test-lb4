import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Match, MatchRelations, Stage, Referee, MatchResults, LineUp} from '../models';
import {StageRepository} from './stage.repository';
import {RefereeRepository} from './referee.repository';
import {MatchResultsRepository} from './match-results.repository';
import {LineUpRepository} from './line-up.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {

  public readonly stage: BelongsToAccessor<Stage, typeof Match.prototype.id>;

  public readonly referee: BelongsToAccessor<Referee, typeof Match.prototype.id>;

  public readonly matchResults: HasOneRepositoryFactory<MatchResults, typeof Match.prototype.id>;

  public readonly lineUps: HasManyRepositoryFactory<LineUp, typeof Match.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StageRepository') protected stageRepositoryGetter: Getter<StageRepository>, @repository.getter('RefereeRepository') protected refereeRepositoryGetter: Getter<RefereeRepository>, @repository.getter('MatchResultsRepository') protected matchResultsRepositoryGetter: Getter<MatchResultsRepository>, @repository.getter('LineUpRepository') protected lineUpRepositoryGetter: Getter<LineUpRepository>,
  ) {
    super(Match, dataSource);
    this.lineUps = this.createHasManyRepositoryFactoryFor('lineUps', lineUpRepositoryGetter,);
    this.matchResults = this.createHasOneRepositoryFactoryFor('matchResults', matchResultsRepositoryGetter);
    this.referee = this.createBelongsToAccessorFor('referee', refereeRepositoryGetter,);
    this.stage = this.createBelongsToAccessorFor('stage', stageRepositoryGetter,);
  }
}
