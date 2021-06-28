import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { update } from 'actions';
import styled from 'styled-components';
import { FaCheck, FaAlignCenter } from 'react-icons/fa';
import { FaProjectDiagram, FaRegCalendar } from 'react-icons/fa';
import { FaRegClock, FaRegCheckSquare } from 'react-icons/fa';
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

const Fade = styled.div`
  &.in { opacity: 1; }
  &.out { opacity: 0; }
  transition: opacity 1s ease-in-out;
`

class Card extends Component {
  state = {
    redirect: false,
    task: this.props.state,
    fade: false,
  }

  componentDidUpdate() {
    if (this.state.redirect === true) {
      this.setState({ redirect: false });
    }
    if (this.state.fade === true) {
      this.setState({ fade: false });
    }
  }

  detailsFn = () => this.setState({ redirect: true });

  taskFn = () => (
    this.setState({ fade: true }),
    this.state.task == 0 && (
      this.props.moveFn(this.props.position, true)
    ),
    this.state.task == 1 && (
      this.props.moveFn(this.props.position, false)
    ),
    this.props.update({
      state:
        this.state.task == 0 && 1 ||
        this.state.task == 1 && 2 ||
        this.state.task == 2 && 0
    }, this.props._id),
    this.setState(prevState => ({
      task:
        prevState.task == 0 && 1 ||
        prevState.task == 1 && 2 ||
        prevState.task == 2 && 0
    }))
  );

  render() {
    const { module, _id, title } = this.props;
    const { type, date, time, project } = this.props;
    const { redirect, task, fade } = this.state;

    return (
      <Fade className={!fade ? 'in' : 'out'}>
        {redirect && <Redirect to={`/${module}/${_id}`} />}
        <Wrapper className={task == 2 && 'archive'}>
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
                <Text className='d-inline mx-2'>
                  {task == 0 && 'Task'}
                  {task == 1 && 'Progress'}
                  {task == 2 && 'Complete'}
                </Text>
                <Button onClick={this.taskFn} l
                  className={task != 0 && 'active'}>
                  <FaCheck />
                </Button> </>}
              {type === 'note' && <>
                <Text className='d-inline mx-2'>Note</Text>
                <Button l className='active'>
                  <FaAlignCenter />
                </Button> </>}
            </div>
          </div>
        </Wrapper>
      </Fade>
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

const mapDispatchToProps = (dispatch) => ({
  update: (content, _id) =>
    dispatch(update(content, _id)),
});

export default connect(null, mapDispatchToProps)
  (contextor(Card));
