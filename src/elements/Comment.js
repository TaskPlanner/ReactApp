import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaCheck, FaTrash } from 'react-icons/fa';
import Button from 'elements/Button';
import Input from 'elements/Input';
import Format from 'format';

const Wrapper = styled.div`
  &.archive { opacity: 0.5; }
`;

class Comment extends Component {
  state = {
    item: this.props.text,
  };

  change = (e) => {
    this.setState({
      item: e.target.value,
    })
  };

  render() {
    const { _id, state } = this.props;
    const { item } = this.state;

    return (
      <Format.Consumer>
        {(context) => (
          <Wrapper className={state == 1 ? 'archive px-1' : 'px-1'}>
            <div className='d-flex justify-content-between'>
              <Input
                id={_id}
                value={item}
                onChange={this.change}
                onBlur={context.update}
              />
              <div className='my-auto mr-2'>
                <Button className={state == 1 ? 'archive mx-1' : 'mx-1'}
                  xs type='button' onClick={() => context.archive(_id)}>
                  <FaCheck />
                </Button>
                <Button xs type='button'
                  onClick={() => context.remove(_id)}>
                  <FaTrash />
                </Button>
              </div>
            </div>
          </Wrapper>
        )}
      </Format.Consumer>
    );
  }
}

Comment.propTypes = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Comment.defaultProps = {
  _id: '0',
  text: 'Example Comment',
};

export default Comment;
