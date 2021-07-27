import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Referee, RefereeRelations, Country, Match} from '../models';
import {CountryRepository} from './country.repository';
import {MatchRepository} from './match.repository';

export class RefereeRepository extends DefaultCrudRepository<
  Referee,
  typeof Referee.prototype.id,
  RefereeRelations
> {

  public readonly country: BelongsToAccessor<Country, typeof Referee.prototype.id>;

  public readonly matches: HasManyRepositoryFactory<Match, typeof Referee.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Referee, dataSource);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
  }
}
