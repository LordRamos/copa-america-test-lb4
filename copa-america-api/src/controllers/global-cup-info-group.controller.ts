import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  GlobalCupInfo,
  Group,
} from '../models';
import {GlobalCupInfoRepository} from '../repositories';

export class GlobalCupInfoGroupController {
  constructor(
    @repository(GlobalCupInfoRepository) protected globalCupInfoRepository: GlobalCupInfoRepository,
  ) { }

  @get('/global-cup-infos/{id}/groups', {
    responses: {
      '200': {
        description: 'Array of GlobalCupInfo has many Group',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Group)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Group>,
  ): Promise<Group[]> {
    return this.globalCupInfoRepository.groups(id).find(filter);
  }

  @post('/global-cup-infos/{id}/groups', {
    responses: {
      '200': {
        description: 'GlobalCupInfo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Group)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof GlobalCupInfo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {
            title: 'NewGroupInGlobalCupInfo',
            exclude: ['id'],
            optional: ['globalCupInfoId']
          }),
        },
      },
    }) group: Omit<Group, 'id'>,
  ): Promise<Group> {
    return this.globalCupInfoRepository.groups(id).create(group);
  }

  @patch('/global-cup-infos/{id}/groups', {
    responses: {
      '200': {
        description: 'GlobalCupInfo.Group PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {partial: true}),
        },
      },
    })
    group: Partial<Group>,
    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<Count> {
    return this.globalCupInfoRepository.groups(id).patch(group, where);
  }

  @del('/global-cup-infos/{id}/groups', {
    responses: {
      '200': {
        description: 'GlobalCupInfo.Group DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<Count> {
    return this.globalCupInfoRepository.groups(id).delete(where);
  }
}
