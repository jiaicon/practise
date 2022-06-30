/**
 * @author Icon
 * @description: //TODO
 * @date 2022-06-27 09:25
 */
import React from 'react';
import { Space } from '@arco-design/web-react';
import { Link } from 'react-router-dom';

interface IProps {

}
const Index: React.FC<IProps> = (props) => {
  const {  } = props;
  console.log(props)
  return (
    <div>
      <h1>React-Router-dom</h1>
      <Space>
        <Link to={'app'}>App</Link>
        <Link to={'test'}>Test</Link>
      </Space>
    </div>
  )
}

export default Index;
