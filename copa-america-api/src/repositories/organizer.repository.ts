import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Organizer, OrganizerRelations} from '../models';

export class OrganizerRepository extends DefaultCrudRepository<
  Organizer,
  typeof Organizer.prototype.id,
  OrganizerRelations
> {
  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource,
  ) {
    super(Organizer, dataSource);
  }
}
