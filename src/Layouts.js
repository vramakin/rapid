export const PlainLayout = `<div><Row id="PlainLayoutContent"></Row></div>`
export const HeaderLayout = `<div><Layout id={1} style={{ minHeight: '100vh' }}>
    <Header id={2}>
      <div id={3} />
      <Menu id={4}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >        
      </Menu>
    </Header>
    <Content style={{ background: '#fff', margin:24, minHeight: 280, padding: '20px' }}>
    <Row id="HeaderLayoutContent"></Row>
    </Content>
    <Footer id={7} style={{ textAlign: 'center' }}>©2019</Footer>
  </Layout></div>`
export const SiderLayout = `<div><Layout id={1} style={{ minHeight: '100vh' }}>
        <Sider id={2} collapsible>
          <div id={3} className="logo" />
          <Menu id={4} theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <MenuItem id={6} key="1">
              <Icon id={7} type="pie-chart" />
              <span id={8}>Option 1</span>
            </MenuItem>
            <MenuItem id={9} key="2">
              <Icon id={10} type="desktop" />
              <span id={11} >Option 2</span>
            </MenuItem>            
            <MenuItem id={19}  key="9">
              <Icon type="file" />
              <span>File</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout id={20} >
          <Header id={21} style={{ background: '#fff', padding: 0 }} />
          <Content id={22} style={{ margin: '0 16px'}}>           
            <div style={{ padding: 24, background: '#fff', marginTop:"2em", minHeight:360}}>
            <Row id="SiderLayoutContent" ></Row>
            </div>
          </Content>
          <Footer id={24} style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout></div>`
