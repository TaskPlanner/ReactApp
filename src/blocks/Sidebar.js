import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { reset } from 'actions/Inbox';
import { NavLink } from 'react-router-dom';
import { FaRegCalendar, FaSignOutAlt } from 'react-icons/fa';
import { FaList, FaProjectDiagram } from 'react-icons/fa';
import Button from 'elements/Button';
import Title from 'elements/Title';
import Text from 'elements/Text';
import Logo from 'files/logo.png';
import contextor from 'contextor';

const List = styled.ul`
  list-style: none;
  margin: 5rem 0;
  padding: 0;
`;

const Sidebar = ({ module, reset }) => (
  <div className='mx-auto'>
    <Title as={NavLink} to='/inbox'>
      <img className='w-50 mb-3' src={Logo} alt='Logo' />
    </Title>
    <Title>{module}</Title>
    <Text>Lorem ipsum dolor sit amet.</Text>
    <List>
      <li className='my-2'>
        <Button as={NavLink} to='/inbox' xl='true'
          className='d-inline-block' activeclass='active'>
          <FaList />
        </Button>
        <Text className='d-inline m-2'>Inbox</Text>
      </li>
      <li className='my-2'>
        <Button as={NavLink} to='/planner' xl='true'
          className='d-inline-block' activeclass='active'>
          <FaRegCalendar />
        </Button>
        <Text className='d-inline m-2'>Planner</Text>
      </li>
      <li className='my-2'>
        <Button as={NavLink} to='/projects' xl='true'
          className='d-inline-block' activeclass='active'>
          <FaProjectDiagram />
        </Button>
        <Text className='d-inline m-2'>Projects</Text>
      </li>
    </List>
    <div className='my-2'>
      <Button as={NavLink} to='/login' xl='true'
        className='d-inline-block' onClick={() => reset()}>
        <FaSignOutAlt />
      </Button>
      <Text className='d-inline m-2'>Logout</Text>
    </div>
  </div>
);

Sidebar.propTypes = {
  module: PropTypes.oneOf(['inbox', 'planner', 'projects']),
  sidebarFn: PropTypes.func,
};

Sidebar.defaultProps = {
  module: 'inbox',
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset),
});

export default contextor
  (connect(null, mapDispatchToProps)(Sidebar));
