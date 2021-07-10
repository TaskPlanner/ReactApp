import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from 'blocks/Sidebar';
import Heading from 'blocks/Heading';
import Details from 'blocks/Details';
import Form from 'blocks/Form';
import contextor from 'contextor';

const Aside = styled(Col)`
  background: ${({ theme }) => (theme.gray200)};
  z-index: ${({ index }) => (index ? '200' : '700')};
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
  z-index: 500;
  margin-left: ${({ visible }) => (!visible && '100%')};
  transition: margin 0.3s ease-in-out;
`;

const Content = styled(Col)`
  height: 86vh;
  margin-top: 14vh;
  z-index: 400;
`;

const Ground = styled.div`
  background: black;
  opacity: 0.1;
  z-index: 300;
  display: ${({ visible }) => (!visible && 'none')};
`;

const Background = styled.div`
  background: black;
  opacity: 0.1;
  z-index: 600;
  display: ${({ visible }) => (!visible && 'none')};
`;

class Page extends Component {
  state = {
    sidebar: false,
    redirect: false,
  }

  componentDidUpdate() {
    if (this.state.redirect === true) {
      this.setState({ redirect: false });
    }
  }

  sidebarFn = () => this.setState(prevState => ({
    sidebar: !prevState.sidebar
  }));

  groundFn = () => this.setState({ redirect: true });

  render() {
    const { children, type, module } = this.props;
    const { sidebar, redirect } = this.state;

    return (
      <div>
        {redirect && <Redirect to={`/${module}`} />}
        <Ground className='position-fixed w-100 h-100'
          visible={type} onClick={this.groundFn} />
        <Background className='position-fixed w-100 h-100'
          visible={sidebar ? 1 : 0} onClick={this.sidebarFn} />
        <Container fluid>
          <Row>
            <Aside visible={1} index={type} lg={2} md={3} sm={5} xs={6}
              className='position-fixed h-100 p-4 d-none d-md-block'>
              <Sidebar sidebarFn={this.sidebarFn} />
            </Aside>
            <Aside visible={sidebar ? 1 : 0} lg={2} md={3} sm={5} xs={6}
              className='position-fixed h-100 p-4 d-block d-md-none'>
              <Sidebar sidebarFn={this.sidebarFn} />
            </Aside>
            <Header className='position-fixed px-1 pt-2 px-sm-3 pt-sm-3'
              lg={{ span: 10, offset: 2 }}
              md={{ span: 9, offset: 3 }}>
              <Heading sidebarFn={this.sidebarFn} />
            </Header>
            <Content className='h-auto px-1 pb-2 px-sm-3 pb-sm-3'
              lg={{ span: 10, offset: 2 }}
              md={{ span: 9, offset: 3 }}>
              {children}
            </Content>
            <Section visible={type}
              className='position-fixed h-100 p-4'
              md={{ span: 4, offset: 8 }}
              sm={{ span: 6, offset: 6 }}
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
  type: PropTypes.oneOf(['details', 'form', null]),
};

Page.defaultProps = {
  type: null,
};

export default contextor(Page);
