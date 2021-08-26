import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from 'elements/Title';
import Sheet from 'elements/Sheet';
import Format from 'format';
import contextor from 'contextor';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { active: {}, comments: [] };
    this.onDragEnd = this.onDragEnd.bind(this);
  };

  add = (item) => {
    this.setState(prevState => ({
      comments: [...prevState.comments, {
        _id: `${Math.random().toString(10)}`,
        text: item ? item : 'Example Comment',
        state: 0,
      }],
    }));
  };

  update = (e) => {
    this.setState(prevState => ({
      comments: [...prevState.comments.map(
        item => item._id === e.target.id ? {
          _id: e.target.id,
          text: e.target.value,
          state: item.state,
        } : item
      )],
    }));
  };

  remove = (_id) => {
    this.setState(prevState => ({
      comments: [...prevState.comments.filter(
        item => item._id !== _id
      )],
    }));
  };

  archive = (_id) => {
    this.setState(prevState => ({
      comments: [...prevState.comments.map(
        item => item._id === _id ? {
          _id: item._id,
          text: item.text,
          state: item.state == 0 ? 1 : 0,
        } : item
      )],
    }));
  };

  onDragEnd(result) {
    if (!result.destination) return;
    const comments = this.state.comments;
    const [removed] = comments.splice(result.source.index, 1);
    comments.splice(result.destination.index, 0, removed);
    this.setState({ comments });
  };

  render() {
    const { module } = this.props;
    const elements = {
      state: this.state,
      add: this.add,
      update: this.update,
      remove: this.remove,
      archive: this.archive,
      onDragEnd: this.onDragEnd,
    }

    return (
      <div>
        <Title>{module} Form</Title>
        <br className='mt-5' />
        <Format.Provider value={elements}>
          <Sheet module={module} />
        </Format.Provider>
      </div>
    );
  }
}

Form.propTypes = {
  module: PropTypes.oneOf(['inbox', 'planner', 'projects']),
};

Form.defaultProps = {
  module: 'inbox',
};

export default contextor(Form);
