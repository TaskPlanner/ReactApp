import React from 'react';
import PropTypes from 'prop-types';
import { FaBars, FaPlus } from 'react-icons/fa';
import Adding from 'elements/Adding';
import Button from 'elements/Button';
import Title from 'elements/Title';
import Text from 'elements/Text';
import contextor from 'contextor';

const Heading = ({ module, sidebarFn }) => (
  <div>
    <div className='d-flex justify-content-between mx-3'>
      <div className='my-auto d-md-none'>
        <Button onClick={sidebarFn}>
          <FaBars className='pb-1' />
        </Button>
      </div>
      <div className='my-auto text-center text-md-left'>
        <Title secondary>Task Planner | {module}</Title>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      </div>
      <div className='my-auto'>
        <Adding>
          <FaPlus className='pb-1' />
          <span className='d-none d-md-inline'>
            {module === 'inbox' && 'Add new Task / Note'}
            {module === 'planner' && 'Add new Event'}
            {module === 'projects' && 'Add new Project'}
          </span>
        </Adding>
      </div>
    </div>
    <hr className='mt-4 mb-0' />
  </div>
);

Heading.propTypes = {
  module: PropTypes.oneOf(['inbox', 'planner', 'projects']),
  sidebarFn: PropTypes.func,
};

Heading.defaultProps = {
  module: 'inbox',
};

export default contextor(Heading);
