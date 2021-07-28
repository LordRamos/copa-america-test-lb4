import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { GlobalCupInfo, GlobalCupInfoRelations, HostCountry, Group } from '../models';
import { HostCountryRepository } from './host-country.repository';
import { GroupRepository } from './group.repository';

export class GlobalCupInfoRepository extends DefaultCrudRepository<
  GlobalCupInfo,
  typeof GlobalCupInfo.prototype.id,
  GlobalCupInfoRelations
> {

  public readonly hostCountries: HasManyRepositoryFactory<HostCountry, typeof GlobalCupInfo.prototype.id>;

  public readonly groups: HasManyRepositoryFactory<Group, typeof GlobalCupInfo.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('HostCountryRepository') protected hostCountryRepositoryGetter: Getter<HostCountryRepository>, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>,
  ) {
    super(GlobalCupInfo, dataSource);
    this.groups = this.createHasManyRepositoryFactoryFor('groups', groupRepositoryGetter,);
    this.registerInclusionResolver('groups', this.groups.inclusionResolver);
    this.hostCountries = this.createHasManyRepositoryFactoryFor('hostCountries', hostCountryRepositoryGetter,);
    this.registerInclusionResolver('hostCountries', this.hostCountries.inclusionResolver);

  }
  public findWithTeams() {
    return this.findById(1, {
      include: [{
        relation: 'groups', scope: {
          include: [{
            relation: 'teams', scope: {
              include: ['country'],
            },
          }],
        },
      }, {
        relation: 'hostCountries', scope: {
          include: ['country'],
        }
      }],
    });
  }

}
