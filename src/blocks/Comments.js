import React, { Component } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FaPlus, FaRegComment } from 'react-icons/fa';
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
              <div className='d-flex'>
                <FaRegComment className='ml-3 my-auto' />
                <Input
                  className='w-100'
                  autoComplete='off'
                  placeholder='comment...'
                  value={item}
                  onChange={this.change}
                />
              </div>
              <div className='mr-1 my-auto'>
                <Button s type='button'
                  onClick={() => {
                    context.add(item);
                    this.reset();
                  }}>
                  <FaPlus className='p-1' />
                </Button>
              </div>
            </div>
            <DragDropContext onDragEnd={context.onDragEnd}>
              <Droppable droppableId='droppable'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {context.state.comments.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Comment
                              _id={item._id}
                              key={item._id}
                              text={item.text}
                              state={item.state}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </Format.Consumer>
    );
  }
}

export default Comments;
