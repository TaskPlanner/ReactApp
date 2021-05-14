import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { reset } from 'actions';
import { NavLink } from 'react-router-dom';
import { FaRegCalendar, FaProjectDiagram } from 'react-icons/fa';
import { FaList, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import Button from 'elements/Button';
import Title from 'elements/Title';
import Text from 'elements/Text';
import Logo from 'assets/Logo.png';
import contextor from 'contextor';

const List = styled.ul`
  list-style: none;
  margin: 6rem 0;
  padding: 0;
`;

const Sidebar = ({ module, sidebarFn, reset }) => (
  <div>
    <Title as={NavLink} to='/inbox'>
      <img className='w-50 mb-3' src={Logo} alt='Logo' />
    </Title>
    <Title>{module}</Title>
    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    <List>
      <li className='my-4'>
        <Button as={NavLink} to='/inbox' activeclass='active'>
          <FaList className='pb-1' /> Inbox
        </Button>
      </li>
      <li className='my-4'>
        <Button as={NavLink} to='/planner' activeclass='active'>
          <FaRegCalendar className='pb-1' /> Planner
        </Button>
      </li>
      <li className='my-4'>
        <Button as={NavLink} to='/projects' activeclass='active'>
          <FaProjectDiagram className='pb-1' /> Projects
        </Button>
      </li>
    </List>
    <div className='my-3'>
      <Button as={NavLink} to='/login' onClick={() => reset()}>
        <FaSignOutAlt className='pb-1' /> LogOut
      </Button>
    </div>
    <div className='my-3 d-md-none'>
      <Button onClick={sidebarFn}>
        <FaTimes className='pb-1' /> Close
      </Button>
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
