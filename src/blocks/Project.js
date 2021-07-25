import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaRegFolder, FaSearch, FaPlus } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import Adding from 'elements/Adding';
import Button from 'elements/Button';
import Title from 'elements/Title';
import Text from 'elements/Text';

const Wrapper = styled.div`
  padding: 1rem;
  padding-bottom: 0;
`;

const IconProject = styled(FaRegFolder)`
  color: ${({ theme }) => (theme.red100)};
  font-size: 1.6rem;
`;

const Project = ({ children, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Wrapper>
        <div className='d-flex justify-content-between'>
          <div className='d-flex pointer'>
            <div className='my-auto mr-3'>
              <IconProject />
            </div>
            <div onClick={() => setOpen(!open)} className='my-auto'>
              <Title>{name}</Title>
              <Text>Lorem ipsum dolor sit amet</Text>
            </div>
          </div>
          <div className='my-auto'>
            <Button secondary onClick={() => setOpen(!open)} >
              <FaSearch className='pb-1' /> Details
            </Button>
          </div>
        </div>
        <hr className='mb-0 mt-3' />
      </Wrapper>
      <Collapse in={open}>
        <div className='mx-4'>
          {children}
          <Adding module='projects' secondary className='m-3'>
            <FaPlus className='pb-1' /> Add Task / Note to Project
          </Adding>
        </div>
      </Collapse>
    </div>
  );
}

Project.propTypes = {
  name: PropTypes.string,
};

Project.defaultProps = {
  name: 'Example Project',
};

export default Project;
