import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from 'elements/Button';
import contextor from 'contextor';

class Adding extends Component {
  state = { redirect: false }

  componentDidUpdate() {
    if (this.state.redirect === true) {
      this.setState({ redirect: false });
    }
  }

  formFn = () => this.setState({ redirect: true });

  render() {
    const { children, module, ...props } = this.props;
    const { redirect } = this.state;

    return (
      <div>
        {redirect && <Redirect to={`/${module}/form`} />}
        <Button onClick={this.formFn} {...props}>
          {children}
        </Button>
      </div>
    );
  }
}

Adding.propTypes = {
  children: PropTypes.array.isRequired,
  module: PropTypes.oneOf(['inbox', 'planner', 'projects']),
};

Adding.defaultProps = {
  module: 'inbox',
};

export default contextor(Adding);
