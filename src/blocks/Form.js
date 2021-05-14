import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from 'elements/Title';
import Sheet from 'elements/Sheet';
import Format from 'format';
import contextor from 'contextor';

class Form extends Component {
  state = {
    active: {},
    comments: [],
  };

  add = (item) => {
    this.setState(prevState => ({
      comments: [...prevState.comments, {
        _id: `${Math.random().toString(10)}`,
        text: item ? item : 'Example Comment'
      }],
    }));
  };

  update = (e) => {
    this.setState(prevState => ({
      comments: [...prevState.comments.map(
        item => item._id === e.target.id ? {
          _id: e.target.id,
          text: e.target.value,
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

  render() {
    const { module } = this.props;
    const elements = {
      state: this.state,
      add: this.add,
      update: this.update,
      remove: this.remove,
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
