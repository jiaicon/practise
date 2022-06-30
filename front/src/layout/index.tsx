/**
 * @author Icon
 * @description: //TODO
 * @date 2022-06-24 11:14
 */
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Message, PageHeader } from '@arco-design/web-react';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import styles from './styles.module.less';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Index = () => {
  const location = useLocation();
  
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed)
  };
  
  return (
    <Layout className={styles['layout-collapse-demo']}>
      <Sider
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        collapsible
        trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
        breakpoint='xl'
      >
        <div className='logo' />
        <Menu
          defaultOpenKeys={[location?.pathname]}
          defaultSelectedKeys={[location?.pathname]}
          onClickMenuItem={(key) =>
            Message.info({
              content: `You select ${key}`,
              showIcon: true,
            })
          }
          style={{ width: '100%' }}
        >
          <MenuItem key='/app'>
            <Link to="/app"><IconHome /> Home</Link>
          </MenuItem>
          <MenuItem key='/app/activity'>
            <Link to="/app/activity"><IconCalendar /> Activity</Link>
          </MenuItem>
          <MenuItem key='/app/mine'>
            <Link to="/app/mine"><IconCalendar /> Mine</Link>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: 20 }}>Header</Header>
        <Layout style={{ padding: '0 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            <Outlet />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Index;
