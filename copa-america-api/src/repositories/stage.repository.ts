import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Stage, StageRelations, Match} from '../models';
import {MatchRepository} from './match.repository';

export class StageRepository extends DefaultCrudRepository<
  Stage,
  typeof Stage.prototype.id,
  StageRelations
> {

  public readonly matches: HasManyRepositoryFactory<Match, typeof Stage.prototype.id>;

  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Stage, dataSource);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
  }
}
