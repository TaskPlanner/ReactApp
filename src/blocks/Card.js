import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegStickyNote, FaCheck } from 'react-icons/fa';
import { FaRegCheckSquare } from 'react-icons/fa';
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
  font-size: 2rem;
`;

const IconNote = styled(FaRegStickyNote)`
  color: ${({ theme }) => (theme.red100)};
  font-size: 2rem;
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
              <div className='my-auto mr-3'>
                {type === 'task' && <IconTask />}
                {type === 'note' && <IconNote />}
              </div>
              <div className='my-auto'>
                <Title>{title}</Title>
                <Text>{date} | {time} | {project}</Text>
              </div>
            </div>
            <div className='my-auto'>
              {type === 'task' &&
                <Button onClick={this.archiveFn} secondary
                  className={archive ? 'archive mx-1' : 'mx-1'}>
                  <FaCheck className='pb-1' /> Complete
                </Button>}
              {type === 'note' &&
                <Button onClick={this.archiveFn} secondary
                  className={archive ? 'archive mx-1' : 'mx-1'}>
                  <FaCheck className='pb-1' /> Archive
                </Button>}
            </div>
          </div>
          <hr className='mb-0 mt-3' />
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
