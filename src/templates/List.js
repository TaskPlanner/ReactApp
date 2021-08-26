import React, { Component } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux';
import { fetch, update } from 'actions';
import { proFetch } from 'actions/projects';
import Card from 'blocks/Card';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.moveFn = this.moveFn.bind(this);
  };

  componentDidMount() {
    this.props.fetch();
    this.props.proFetch();
  };

  componentDidUpdate() {
    if (this.props.list != undefined &&
      this.props.list != this.state.items) {
      if (this.props.list.every(i => i._id == (
        this.state.items[i.position] != undefined &&
        this.state.items[i.position]._id
      ))) {
        this.setState({
          items: this.props.list.sort((a, b) =>
            (a.position > b.position) ? 1 : -1),
        });
      }
      if (this.props.list.length != this.state.items.length) {
        this.setState({
          items: this.props.list.sort((a, b) =>
            (a.position > b.position) ? 1 : -1),
        });
      }
    }
  };

  onDragEnd(result) {
    if (!result.destination) return;
    const items = this.state.items;
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    this.setState({ items });
    items.map((item, index) =>
      this.props.update({ position: index }, item._id));
  };

  moveFn(source) {
    const src = Number(source);
    const dest = Number(this.state.items.length);
    const items = this.state.items;
    const [removed] = items.splice(src, 1);
    items.splice(dest, 0, removed);
    this.setState({ items });
    items.map((item, index) =>
      this.props.update({ position: index }, item._id));
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.items.map((item, index) => (
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
                      <Card moveFn={this.moveFn}{...item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetch: () => (dispatch(fetch())),
  update: (content, _id) => dispatch(update(content, _id)),
  proFetch: () => (dispatch(proFetch())),
})

export default connect(null, mapDispatchToProps)
  (List);
