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
    archive: false,
  };

  change = (e) => {
    this.setState({
      item: e.target.value,
    })
  };

  archiveFn = () => this.setState(prevState => ({
    archive: !prevState.archive
  }));

  render() {
    const { _id } = this.props;
    const { item, archive } = this.state;

    return (
      <Format.Consumer>
        {(context) => (
          <Wrapper className={archive ? 'archive px-1' : 'px-1'}>
            <div className='d-flex justify-content-between'>
              <Input
                id={_id}
                value={item}
                onChange={this.change}
                onBlur={context.update}
              />
              <div className='my-auto mr-2'>
                <Button className={archive ? 'archive mx-1' : 'mx-1'}
                  xs type='button' onClick={this.archiveFn}>
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
