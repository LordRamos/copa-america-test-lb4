import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Match, MatchRelations, Referee, Stadium, Stage} from '../models';
import {RefereeRepository} from './referee.repository';
import {StadiumRepository} from './stadium.repository';
import {StageRepository} from './stage.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {

  public readonly referee: BelongsToAccessor<Referee, typeof Match.prototype.id>;

  public readonly stage: BelongsToAccessor<Stage, typeof Match.prototype.id>;

  public readonly stadium: BelongsToAccessor<Stadium, typeof Match.prototype.id>;


  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource, @repository.getter('RefereeRepository') protected refereeRepositoryGetter: Getter<RefereeRepository>, @repository.getter('StageRepository') protected stageRepositoryGetter: Getter<StageRepository>, @repository.getter('StadiumRepository') protected stadiumRepositoryGetter: Getter<StadiumRepository>,
  ) {
    super(Match, dataSource);
    this.stadium = this.createBelongsToAccessorFor('stadium', stadiumRepositoryGetter,);
    this.stage = this.createBelongsToAccessorFor('stage', stageRepositoryGetter,);
    this.referee = this.createBelongsToAccessorFor('referee', refereeRepositoryGetter,);
  }
}
