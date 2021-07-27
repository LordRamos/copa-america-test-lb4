import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Country, CountryRelations, City, Referee, HostCountry, Team, Player} from '../models';
import {CityRepository} from './city.repository';
import {RefereeRepository} from './referee.repository';
import {HostCountryRepository} from './host-country.repository';
import {TeamRepository} from './team.repository';
import {PlayerRepository} from './player.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {

  public readonly cities: HasManyRepositoryFactory<City, typeof Country.prototype.id>;

  public readonly referees: HasManyRepositoryFactory<Referee, typeof Country.prototype.id>;

  public readonly hostCountry: HasOneRepositoryFactory<HostCountry, typeof Country.prototype.id>;

  public readonly team: HasOneRepositoryFactory<Team, typeof Country.prototype.id>;

  public readonly players: HasManyRepositoryFactory<Player, typeof Country.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('RefereeRepository') protected refereeRepositoryGetter: Getter<RefereeRepository>, @repository.getter('HostCountryRepository') protected hostCountryRepositoryGetter: Getter<HostCountryRepository>, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>,
  ) {
    super(Country, dataSource);
    this.players = this.createHasManyRepositoryFactoryFor('players', playerRepositoryGetter,);
    this.team = this.createHasOneRepositoryFactoryFor('team', teamRepositoryGetter);
    this.hostCountry = this.createHasOneRepositoryFactoryFor('hostCountry', hostCountryRepositoryGetter);
    this.referees = this.createHasManyRepositoryFactoryFor('referees', refereeRepositoryGetter,);
    this.cities = this.createHasManyRepositoryFactoryFor('cities', cityRepositoryGetter,);
  }
}
