import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Stadium, StadiumRelations, Club, City} from '../models';
import {ClubRepository} from './club.repository';
import {CityRepository} from './city.repository';

export class StadiumRepository extends DefaultCrudRepository<
  Stadium,
  typeof Stadium.prototype.id,
  StadiumRelations
> {

  public readonly club: HasOneRepositoryFactory<Club, typeof Stadium.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof Stadium.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClubRepository') protected clubRepositoryGetter: Getter<ClubRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Stadium, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.club = this.createHasOneRepositoryFactoryFor('club', clubRepositoryGetter);
  }
}
