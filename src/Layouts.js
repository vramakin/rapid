export const PlainLayout = `<div><Row id="PlainLayoutContent"></Row></div>`
export const HeaderLayout = `<div><Layout id={1} style={{ minHeight: '100vh' }}>
    <Header id={2}>
      <Row id={771} ><Col span={2}><div id={3}><Title id="77" style={{color:"#fff"}}>App</Title></div></Col>
      <Col id={772} span={9}><Menu id={4}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <MenuItem key="1">Product</MenuItem>
        <MenuItem key="2">About</MenuItem>
        <MenuItem key="3">Contact</MenuItem>
      </Menu>
      </Col>
      <Col span={1} offset={12} style={{textAlign:"right"}}><Avatar>P</Avatar></Col>
      </Row>
    </Header>
    <Content style={{ background: '#fff', margin:24, minHeight: 280, padding: '20px' }}>
    <Row id="HeaderLayoutContent"></Row>
    </Content>
    <Footer id={7} style={{ textAlign: 'center' }}>©2019</Footer>
  </Layout></div>`
export const SiderLayout = `<div><Layout id={1} style={{ minHeight: '100vh' }}>
        <Sider id={2} collapsible>
          <div id={3} style={{background:'#334454', color:"rgba(255,255,255,0.5)", padding:"0.5em", textAlign:"center", margin:"1em", borderRadius:"2px", fontSize:"1em", fontWeight:"bold"}}>APP</div>
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
          <Header id={21} style={{ background: '#fff', paddingLeft: "1em" }} ><Row><Col span={12} id="71"><Title id="77">Home</Title></Col><Col id="72" style={{textAlign:"right"}} span={12}><Avatar id="782">P</Avatar></Col></Row></Header>
          <Content id={22} style={{ margin: '0 16px', marginTop:"1em"}}>            
            <Row id="SiderLayoutContent" ></Row>         
          </Content>
          <Footer id={24} style={{ textAlign: 'center' }}>©2019</Footer>
        </Layout>
      </Layout></div>`
