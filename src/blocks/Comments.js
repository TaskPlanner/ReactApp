import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from 'elements/Button';
import Input from 'elements/Input';
import Comment from 'elements/Comment';
import Format from 'format';

class Comments extends Component {
  state = { item: '' }

  change = (e) => {
    this.setState({
      item: e.target.value,
    });
  };

  reset = () => {
    this.setState({
      item: '',
    })
  }

  render() {
    const { item } = this.state;

    return (
      <Format.Consumer>
        {(context) => (
          <div>
            <div className='d-flex justify-content-between'>
              <div className='my-auto'>
                <Input
                  className='w-100'
                  autoComplete='off'
                  placeholder='comment...'
                  value={item}
                  onChange={this.change}
                />
              </div>
              <div className='my-auto'>
                <Button secondary type='button'
                  onClick={() => {
                    context.add(item);
                    this.reset();
                  }}>
                  <FaPlus className='pb-1' />
                </Button>
              </div>
            </div>
            <hr className='m-1' />
            {context.state.comments.map(item => (
              <Comment
                _id={item._id}
                key={item._id}
                text={item.text}
              />
            ))}
          </div>
        )}
      </Format.Consumer>
    );
  }
}

export default Comments;
