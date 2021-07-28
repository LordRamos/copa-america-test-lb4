import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Match, MatchRelations, Stage, Referee, MatchResults, LineUp, Team, Stadium} from '../models';
import {StageRepository} from './stage.repository';
import {RefereeRepository} from './referee.repository';
import {MatchResultsRepository} from './match-results.repository';
import {LineUpRepository} from './line-up.repository';
import {TeamRepository} from './team.repository';
import {StadiumRepository} from './stadium.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {

  public readonly stage: BelongsToAccessor<Stage, typeof Match.prototype.id>;

  public readonly referee: BelongsToAccessor<Referee, typeof Match.prototype.id>;

  public readonly matchResults: HasOneRepositoryFactory<MatchResults, typeof Match.prototype.id>;

  public readonly lineUps: HasManyRepositoryFactory<LineUp, typeof Match.prototype.id>;

  public readonly homeTeam: BelongsToAccessor<Team, typeof Match.prototype.id>;

  public readonly awayTeam: BelongsToAccessor<Team, typeof Match.prototype.id>;

  public readonly stadium: BelongsToAccessor<Stadium, typeof Match.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StageRepository') protected stageRepositoryGetter: Getter<StageRepository>, @repository.getter('RefereeRepository') protected refereeRepositoryGetter: Getter<RefereeRepository>, @repository.getter('MatchResultsRepository') protected matchResultsRepositoryGetter: Getter<MatchResultsRepository>, @repository.getter('LineUpRepository') protected lineUpRepositoryGetter: Getter<LineUpRepository>, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('StadiumRepository') protected stadiumRepositoryGetter: Getter<StadiumRepository>,
  ) {
    super(Match, dataSource);
    this.stadium = this.createBelongsToAccessorFor('stadium', stadiumRepositoryGetter,);
    this.awayTeam = this.createBelongsToAccessorFor('awayTeam', teamRepositoryGetter,);
    this.homeTeam = this.createBelongsToAccessorFor('homeTeam', teamRepositoryGetter,);
    this.lineUps = this.createHasManyRepositoryFactoryFor('lineUps', lineUpRepositoryGetter,);
    this.matchResults = this.createHasOneRepositoryFactoryFor('matchResults', matchResultsRepositoryGetter);
    this.referee = this.createBelongsToAccessorFor('referee', refereeRepositoryGetter,);
    this.stage = this.createBelongsToAccessorFor('stage', stageRepositoryGetter,);
  }
}
