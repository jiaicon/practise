import request from '@/utils/request';
import { IResponse } from '../../vite-env';
import type { TestData, GetTestDataParams } from './data';

export async function getTestData(params?: GetTestDataParams | null): Promise<IResponse.Response<TestData>> {
  return request.get('/api/data', {
    ...params
  })
}

export async function download(): Promise<IResponse.Response<TestData>> {
  return await request.get('/api/download/a')
}
