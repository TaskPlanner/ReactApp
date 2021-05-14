import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { url } from 'routes';
import axios from 'axios';
import Title from 'elements/Title';
import Sheet from 'elements/Sheet';
import Format from 'format';
import contextor from 'contextor';

class Details extends Component {
  state = {
    active: {},
    comments: [],
  };

  componentDidMount() {
    if (this.props.active && this.props.active.length) {
      this.setState({
        active: this.props.active[0] || {},
        comments: this.props.active[0].comments || [],
      });
    } else {
      axios({
        method: "GET",
        withCredentials: true,
        url: url + '/elements/' + this.props.element,
      })
        .then(({ data }) => {
          this.setState({
            active: data || {},
            comments: data.comments || [],
          });
        })
        .catch(err => console.log(err));
    }
  };

  componentDidUpdate() {
    if (this.props.active && this.props.active.length) {
      if (this.state.active !== this.props.active[0]) {
        this.setState({
          active: this.props.active[0] || {},
          comments: this.props.active[0].comments || [],
        });
      }
    } else {
      axios({
        method: "GET",
        withCredentials: true,
        url: url + '/elements/' + this.props.element,
      })
        .then(({ data }) => {
          if (this.state.active !== data) {
            this.setState({
              active: data || {},
              comments: data.comments || [],
            });
          }
        })
        .catch(err => console.log(err));
    }
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
    const { active } = this.state;
    const { module } = this.props;
    const elements = {
      state: this.state,
      add: this.add,
      update: this.update,
      remove: this.remove,
    }

    return (
      <div>
        <Title>{module} Details</Title>
        <br className='mt-5' />
        <Format.Provider value={elements}>
          <Sheet item={active} module={module} />
        </Format.Provider>
      </div>
    );
  }
}

Details.propTypes = {
  module: PropTypes.oneOf(['inbox', 'planner', 'projects']),
};

Details.defaultProps = {
  module: 'inbox',
};

const mapStateToProps = (state, ownProps) => {
  if (state[ownProps.module]) {
    return {
      active: state[ownProps.module].filter(
        item => item._id === ownProps.element
      )
    }
  }
  return {}
};

export default contextor
  (connect(mapStateToProps)(Details));
