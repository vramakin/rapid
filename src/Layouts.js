export const PlainLayout = `<div><Row id={1}><Col span={2} id={2}></Col><Col id="PlainLayoutContent" span={20}></Col><Col span={2} id={4}></Col></Row></div>`
export const HeaderLayout = `<div><Layout id={1}>
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
    <Content id="HeaderLayoutContent" style={{ background: '#fff', margin:24, minHeight: 280, padding: '20px' }}>      
    </Content>
    <Footer id={7} style={{ textAlign: 'center' }}>©2019</Footer>
  </Layout></div>`
export const SiderLayout = ``