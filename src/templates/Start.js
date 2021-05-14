import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaCode } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import Title from 'elements/Title';
import Text from 'elements/Text';

const Wrapper = styled(Container)`
  background: ${({ theme }) => (theme.gray200)};
`;

const Start = ({ children }) => (
  <div>
    <Wrapper fluid className='text-center'>
      <Row className='p-5'>
        <Col className='mx-5 px-5'>
          {children}
        </Col>
        <Col className='m-5 p-5'>
          <Title secondary className='mb-5'>
            Project System
          </Title>
          <Title className='my-2'>
            <FaCode className='mr-2' />Inbox
          </Title>
          <Text className='my-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Quisque interdum pretium sagittis. Cras egestas aliquam suscipit.
          </Text>
          <hr className='my-4' />
          <Title className='my-2'>
            <FaCode className='mr-2' />Planner
          </Title>
          <Text className='my-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Quisque interdum pretium sagittis. Cras egestas aliquam suscipit.
          </Text>
          <hr className='my-4' />
          <Title className='my-2'>
            <FaCode className='mr-2' />Projects
          </Title>
          <Text className='my-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Quisque interdum pretium sagittis. Cras egestas aliquam suscipit.
          </Text>
        </Col>
      </Row>
    </Wrapper>
  </div>
);

Start.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Start;
