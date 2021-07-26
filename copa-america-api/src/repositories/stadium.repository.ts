import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Stadium, StadiumRelations, City, Match} from '../models';
import {CityRepository} from './city.repository';
import {MatchRepository} from './match.repository';

export class StadiumRepository extends DefaultCrudRepository<
  Stadium,
  typeof Stadium.prototype.id,
  StadiumRelations
> {

  public readonly city: BelongsToAccessor<City, typeof Stadium.prototype.id>;

  public readonly matches: HasManyRepositoryFactory<Match, typeof Stadium.prototype.id>;

  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Stadium, dataSource);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
  }
}
