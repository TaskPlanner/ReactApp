import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegCheckSquare, FaCheck } from 'react-icons/fa';
import { FaRegCalendar, FaRegClock } from 'react-icons/fa';
import { FaProjectDiagram } from 'react-icons/fa';
import Button from 'elements/Button';
import Title from 'elements/Title';
import Text from 'elements/Text';
import contextor from 'contextor';

const Wrapper = styled.div`
  padding: 1rem;
  padding-bottom: 0;
  &.archive { opacity: 0.5; }
`;

const IconTask = styled(FaRegCheckSquare)`
  color: ${({ theme }) => (theme.red100)};
  font-size: 1.6rem;
`;

class Card extends Component {
  state = {
    redirect: false,
    archive: false,
  }

  componentDidUpdate() {
    if (this.state.redirect === true) {
      this.setState({ redirect: false });
    }
  }

  detailsFn = () => this.setState({ redirect: true });
  archiveFn = () => this.setState(prevState => ({
    archive: !prevState.archive
  }));

  render() {
    const { module, _id, title } = this.props;
    const { type, date, time, project } = this.props;
    const { redirect, archive } = this.state;

    return (
      <div>
        {redirect && <Redirect to={`/${module}/${_id}`} />}
        <Wrapper className={archive && 'archive'}>
          <div className='d-flex justify-content-between'>
            <div onClick={this.detailsFn} className='d-flex pointer'>
              <div className='my-auto'>
                <IconTask className='mb-2 mr-2' />
                <Title className='d-inline-block mr-2'>{title}</Title>
                <Text className='d-inline-block mb-1'>
                  <FaRegCalendar className='ml-1 mb-1' /> {date} |
                  <FaRegClock className='ml-1 mb-1' /> {time} |
                  <FaProjectDiagram className='ml-1 mb-1' /> {project}
                </Text>
              </div>
            </div>
            <div className='my-auto'>
              {type === 'task' && <>
                <Text className='d-inline mx-2'>Task</Text>
                <Button onClick={this.archiveFn} l
                  className={archive && 'archive'}>
                  <FaCheck />
                </Button> </>}
              {type === 'note' && <>
                <Text className='d-inline mx-2'>Note</Text>
                <Button onClick={this.archiveFn} l
                  className={archive && 'archive'}>
                  <FaCheck />
                </Button> </>}
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

Card.propTypes = {
  module: PropTypes.oneOf(['inbox', 'planner', 'projects']),
  type: PropTypes.oneOf(['task', 'note']),
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.string,
  project: PropTypes.string,
};

Card.defaultProps = {
  module: 'inbox',
  type: 'task',
  _id: '0',
  title: 'Example Task',
  date: 'add date',
  time: 'add time',
  project: 'add project',
};

export default contextor(Card);
