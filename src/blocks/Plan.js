import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaRegClock } from 'react-icons/fa';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import Button from 'elements/Button';
import Title from 'elements/Title';
import Text from 'elements/Text';

const Wrapper = styled.div`
  padding: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 0;
`;

const IconPlan = styled(FaRegClock)`
  color: ${({ theme }) => (theme.blue200)};
  font-size: 1.6rem;
`;

const Plan = ({ children, name }) => {
  const today = new Date().toISOString().slice(0, 10);
  const [open, setOpen] = useState(name == today ? true : false);

  return (
    <div>
      <Wrapper>
        <div className='d-flex justify-content-between'>
          <div className='d-flex pointer'>
            <div className='my-auto mr-3'>
              <IconPlan />
            </div>
            <div onClick={() => setOpen(!open)} className='my-auto'>
              <Title>{name}</Title>
              <Text>Lorem ipsum dolor sit amet</Text>
            </div>
          </div>
          <div className='my-auto'>
            <Button s type='button'
              onClick={() => setOpen(!open)}>
              {open ? <FaAngleUp /> : <FaAngleDown />}
            </Button>
          </div>
        </div>
        <hr className='mb-0 mt-3' />
      </Wrapper>
      <Collapse in={open}>
        <div className='mx-4'>
          {children}
        </div>
      </Collapse>
    </div>
  );
}

Plan.propTypes = {
  name: PropTypes.string,
};

Plan.defaultProps = {
  name: '01-01-2021',
};

export default Plan;
