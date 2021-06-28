import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from 'blocks/Sidebar';
import Heading from 'blocks/Heading';
import Details from 'blocks/Details';
import Form from 'blocks/Form';

const Aside = styled(Col)`
  background: ${({ theme }) => (theme.gray200)};
  z-index: 300;
  transform: translate(${({ visible }) =>
    (visible ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
`;

const Header = styled(Col)`
  background: ${({ theme }) => (theme.gray100)};
  height: 14vh;
  z-index: 100;
`;

const Section = styled(Col)`
  background: ${({ theme }) => (theme.gray200)};
  overflow-y: auto;
  z-index: 200;
  margin-left: ${({ visible }) => (!visible && '100%')};
  transition: margin 0.3s ease-in-out;
`;

const Content = styled(Col)`
  height: 86vh;
  margin-top: 14vh;
`;

class Page extends Component {
  state = { sidebar: false }

  sidebarFn = () => this.setState(prevState => ({
    sidebar: !prevState.sidebar
  }));

  render() {
    const { children, type } = this.props;
    const { sidebar } = this.state;

    return (
      <div>
        <Container fluid>
          <Row>
            <Aside visible={1} md={2} xs={6}
              className='position-fixed h-100 p-5 d-none d-md-block'>
              <Sidebar sidebarFn={this.sidebarFn} />
            </Aside>
            <Aside visible={sidebar ? 1 : 0} md={2} xs={6}
              className='position-fixed h-100 p-5 d-block d-md-none'>
              <Sidebar sidebarFn={this.sidebarFn} />
            </Aside>
            <Header className='position-fixed px-3 pt-3'
              md={{ span: 10, offset: 2 }}>
              <Heading sidebarFn={this.sidebarFn} />
            </Header>
            <Content className=' px-3 pb-3'
              md={{ span: 10, offset: 2 }}>
              {children}
            </Content>
            <Section visible={type}
              className='position-fixed h-100 p-5'
              md={{ span: 4, offset: 8 }}
              xs={{ span: 8, offset: 4 }}>
              {type === 'details' && <Details />}
              {type === 'form' && <Form />}
            </Section>
          </Row>
        </Container>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['details', 'form', null]),
};

Page.defaultProps = {
  type: null,
};

export default Page;
