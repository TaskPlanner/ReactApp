import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { update } from 'actions';
import { Redirect } from 'react-router-dom';
import { FaProjectDiagram, FaRegCalendar } from 'react-icons/fa';
import { FaRegClock, FaRegCheckSquare } from 'react-icons/fa';
import { FaCheck, FaAlignCenter } from 'react-icons/fa';
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
  font-size: 1.7rem;
`;

const Fade = styled.div`
  &.in { opacity: 1; }
  &.out { opacity: 0; }
  transition: opacity 1s ease-in-out;
`

class Card extends Component {
  state = {
    redirect: false,
    fade: false,
    inbox: true,
    task: this.props.state,
  }

  componentDidMount() {
    if (this.props.inbox != undefined) {
      if (this.props.inbox == false) {
        this.props.moveFn(this.props.position);
        this.setState({ inbox: this.props.inbox });
      } else {
        this.setState({ inbox: this.props.inbox });
      }
    }
  };

  componentDidUpdate() {
    if (this.state.redirect == true) {
      this.setState({ redirect: false });
    }
    if (this.state.fade == true) {
      this.setState({ fade: false });
    }
    if (this.props.inbox != undefined &&
      this.props.inbox != this.state.inbox) {
      if (this.props.inbox == false) {
        this.props.moveFn(this.props.position);
        this.setState({ inbox: this.props.inbox });
      } else {
        this.setState({ inbox: this.props.inbox });
      }
    }
  };

  detailsFn = () => this.setState({ redirect: true });

  taskFn = () => (
    this.setState({ fade: true }),
    this.state.task == 1 && (
      this.props.moveFn(this.props.position)
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
                <IconTask className='mb-1 mr-2' />
              </div>
              <div className='my-auto'>
                <Title className='d-inline mr-2'>{title}</Title>
                <Text className='d-inline mb-1'>
                  {date && <FaRegCalendar className='ml-2 mb-1' />} {date}
                  {time && <FaRegClock className='ml-2 mb-1' />} {time}
                  {project && <FaProjectDiagram className='ml-2 mb-1' />} {project}
                </Text>
              </div>
            </div>
            <div className='d-flex my-auto'>
              {type === 'task' && <>
                <Text className='d-none d-md-block mx-2 my-auto'>
                  {task == 0 && 'Task'}
                  {task == 1 && 'Progress'}
                  {task == 2 && 'Complete'}
                </Text>
                <Button onClick={this.taskFn} l
                  className={task != 0 && 'active'}>
                  <FaCheck />
                </Button> </>}
              {type === 'note' && <>
                <Text className='d-none d-md-block mx-2 my-auto'>Note</Text>
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
};

Card.defaultProps = {
  module: 'inbox',
  type: 'task',
  _id: '0',
  title: 'Example Task',
};

const mapDispatchToProps = (dispatch) => ({
  update: (content, _id) => dispatch(update(content, _id)),
});

export default connect(null, mapDispatchToProps)
  (contextor(Card));
