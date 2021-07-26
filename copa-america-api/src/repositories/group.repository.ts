import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Group, GroupRelations} from '../models';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.id,
  GroupRelations
> {
  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource,
  ) {
    super(Group, dataSource);
  }
}
