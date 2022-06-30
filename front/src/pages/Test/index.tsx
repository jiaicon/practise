/**
 * @author Icon
 * @description: //TODO
 * @date 2022-06-24 10:55
 */
import React from 'react';
import { Button, Message, Space } from '@arco-design/web-react';
import { getTestData, download } from './service';

const Index = () => {
  const onGetData = async () => {
    try {
      const res = await getTestData();
      await Message.success('获取数据成功')
    } catch (e) {
      Message.error('获取数据失败')
    }
  }
  const onDownload = async () => {
    try {
      const res = await download();
      Message.success('下载成功')
    } catch (e) {
      Message.error('下载失败')
    }
  }
  return (
    <div>
      <h1>测试请求</h1>
      <Space>
        <Button onClick={onGetData}>发送请求</Button>
        <Button onClick={onDownload}>下载文件</Button>
      </Space>
    </div>
  )
}

export default Index;
