import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Stadium, StadiumRelations, Club, City, Match} from '../models';
import {ClubRepository} from './club.repository';
import {CityRepository} from './city.repository';
import {MatchRepository} from './match.repository';

export class StadiumRepository extends DefaultCrudRepository<
  Stadium,
  typeof Stadium.prototype.id,
  StadiumRelations
> {

  public readonly club: HasOneRepositoryFactory<Club, typeof Stadium.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof Stadium.prototype.id>;

  public readonly matches: HasManyRepositoryFactory<Match, typeof Stadium.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClubRepository') protected clubRepositoryGetter: Getter<ClubRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Stadium, dataSource);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.club = this.createHasOneRepositoryFactoryFor('club', clubRepositoryGetter);
  }
}
