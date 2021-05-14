import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import { FaCheck, FaTrash } from 'react-icons/fa';
import Button from 'elements/Button';
import Input from 'elements/Input';
import Format from 'format';

const Wrapper = styled.div`
  &.archive { opacity: 0.5; }
`;

const IconComment = styled(FaRegComment)`
  color: ${({ theme }) => (theme.blue100)};
  font-size: 1rem;
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
          <Wrapper className={archive ? 'archive px-2' : 'px-2'}>
            <div className='d-flex justify-content-between'>
              <div className='d-flex'>
                <div className='my-auto'>
                  <IconComment />
                </div>
                <div className='my-auto'>
                  <Input
                    className='w-100'
                    id={_id}
                    value={item}
                    onChange={this.change}
                    onBlur={context.update}
                  />
                </div>
              </div>
              <div className='my-auto'>
                <Button className={archive ? 'archive mx-1' : 'mx-1'}
                  secondary type='button' onClick={this.archiveFn}>
                  <FaCheck className='pb-1' />
                </Button>
                <Button secondary type='button'
                  onClick={() => context.remove(_id)}>
                  <FaTrash className='pb-1' />
                </Button>
              </div>
            </div>
            <hr className='m-1' />
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
