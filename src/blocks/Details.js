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
  constructor(props) {
    super(props);
    this.state = { active: {}, comments: [] };
    this.onDragEnd = this.onDragEnd.bind(this);
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
        .catch(err => {
          console.log(err);
          window.location.reload();
        });
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
        .catch(err => {
          console.log(err);
          window.location.reload();
        });
    }
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
    const { active } = this.state;
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
  if (state['inbox']) {
    return {
      active: state['inbox'].filter(
        item => item._id === ownProps.element
      )
    }
  }
  return {}
};

export default contextor
  (connect(mapStateToProps)(Details));
