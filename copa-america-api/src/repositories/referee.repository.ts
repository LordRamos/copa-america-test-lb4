import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Referee, RefereeRelations, Match} from '../models';
import {MatchRepository} from './match.repository';

export class RefereeRepository extends DefaultCrudRepository<
  Referee,
  typeof Referee.prototype.id,
  RefereeRelations
> {

  public readonly matches: HasManyRepositoryFactory<Match, typeof Referee.prototype.id>;

  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Referee, dataSource);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
  }
}
