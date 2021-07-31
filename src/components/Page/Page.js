import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';

const {
  Content,
  Header,
  Sider
} = Layout;

const Page = ({
  children,
  helmet,
  siderLeft = true,
  siderRight = true,
}) => {
  return (
    <Layout>
      {helmet && <Helmet title={helmet} />}
      <Header style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(3,37,65, 1)',
        height: '64px',
        width: '100%',
        zIndex: '10',
        transition: 'top 0.2s linear',
      }}>
        <div className="logo" style={{ position: 'fixed', left: '60px' }}>
          <a href="/">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="The Movie Database (TMDb)" width="154" height="20"/>
          </a>
        </div>
      </Header>
      {siderLeft && <Sider
        breakpoint="xxl"
        collapsedWidth="0"
        trigger={null}
        collapsible={false}
        style={{ backgroundColor: 'white' }}
      >
      </Sider>}
      <Content className="site-layout" style={{ marginTop: 64, backgroundColor: 'white' }}>
        <div className="site-layout-background" style={{ minHeight: 380 }}>
          {children}
        </div>
      </Content>
      {siderRight && <Sider
        breakpoint="xxl"
        collapsedWidth="0"
        trigger={null}
        collapsible={false}
        style={{ backgroundColor: 'white' }}
      >
      </Sider> }
    </Layout>
  );
};

export default Page;
