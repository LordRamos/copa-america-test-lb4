import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { GlobalCupInfo } from '../models';
import { GlobalCupInfoRepository } from '../repositories';

export class GlobalCupinfoController {
  constructor(
    @repository(GlobalCupInfoRepository)
    public globalCupInfoRepository: GlobalCupInfoRepository,
  ) { }

  // @post('/global-cup-info')
  // @response(200, {
  //   description: 'GlobalCupInfo model instance',
  //   content: { 'application/json': { schema: getModelSchemaRef(GlobalCupInfo) } },
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(GlobalCupInfo, {
  //           title: 'NewGlobalCupInfo',

  //         }),
  //       },
  //     },
  //   })
  //   globalCupInfo: GlobalCupInfo,
  // ): Promise<GlobalCupInfo> {
  //   return this.globalCupInfoRepository.create(globalCupInfo);
  // }

  // @get('/global-cup-info/count')
  // @response(200, {
  //   description: 'GlobalCupInfo model count',
  //   content: { 'application/json': { schema: CountSchema } },
  // })
  // async count(
  //   @param.where(GlobalCupInfo) where?: Where<GlobalCupInfo>,
  // ): Promise<Count> {
  //   return this.globalCupInfoRepository.count(where);
  // }

  // @get('/global-cup-info')
  // @response(200, {
  //   description: 'Array of GlobalCupInfo model instances',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'array',
  //         items: getModelSchemaRef(GlobalCupInfo, { includeRelations: true }),
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.filter(GlobalCupInfo) filter?: Filter<GlobalCupInfo>,
  // ): Promise<GlobalCupInfo[]> {
  //   return this.globalCupInfoRepository.find(filter);
  // }

  // @patch('/global-cup-info')
  // @response(200, {
  //   description: 'GlobalCupInfo PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(GlobalCupInfo, {partial: true}),
  //       },
  //     },
  //   })
  //   globalCupInfo: GlobalCupInfo,
  //   @param.where(GlobalCupInfo) where?: Where<GlobalCupInfo>,
  // ): Promise<Count> {
  //   return this.globalCupInfoRepository.updateAll(globalCupInfo, where);
  // }

  @get('/global-cup-info')
  @response(200, {
    description: 'GlobalCupInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GlobalCupInfo, { includeRelations: true }),
      },
    },
  })
  async findById(
    // @param.path.number('id') id: number,
    @param.filter(GlobalCupInfo, { exclude: 'where' }) filter?: FilterExcludingWhere<GlobalCupInfo>
  ): Promise<GlobalCupInfo> {
    // return this.globalCupInfoRepository.findById(id, filter);
    return this.globalCupInfoRepository.findWithTeams()
  }

  // @patch('/global-cup-info/{id}')
  // @response(204, {
  //   description: 'GlobalCupInfo PATCH success',
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(GlobalCupInfo, { partial: true }),
  //       },
  //     },
  //   })
  //   globalCupInfo: GlobalCupInfo,
  // ): Promise<void> {
  //   await this.globalCupInfoRepository.updateById(id, globalCupInfo);
  // }

  // @put('/global-cup-info/{id}')
  // @response(204, {
  //   description: 'GlobalCupInfo PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() globalCupInfo: GlobalCupInfo,
  // ): Promise<void> {
  //   await this.globalCupInfoRepository.replaceById(id, globalCupInfo);
  // }

  // @del('/global-cup-info/{id}')
  // @response(204, {
  //   description: 'GlobalCupInfo DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.globalCupInfoRepository.deleteById(id);
  // }
}
