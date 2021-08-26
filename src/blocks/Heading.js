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
        <Button xl onClick={sidebarFn}>
          <FaBars />
        </Button>
      </div>
      <div className='my-auto text-center text-md-left'>
        <Title l>Task Planner | {module}</Title>
        <Text>Lorem ipsum dolor sit amet.</Text>
      </div>
      <div className='my-auto'>
        <Text className='d-none d-md-inline m-2'>
          Add new task
        </Text>
        <Adding xl><FaPlus /></Adding>
      </div>
    </div>
    <hr className='mt-3 mb-0' />
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
