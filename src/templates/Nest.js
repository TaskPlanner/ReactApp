import React, { Component } from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux';
import { update } from 'actions';
import Card from 'blocks/Card';

class Nest extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.moveFn = this.moveFn.bind(this);
  };

  componentDidMount() {
    this.setState({
      items: this.props.nest.sort((a, b) =>
        (Number(a.position) > Number(b.position)) ? 1 : -1),
      result: this.props.result,
    });
  };

  componentDidUpdate() {
    if (this.props.result != undefined &&
      this.props.result != this.state.result) {
      this.setState({ result: this.props.result });
      this.dragFn(this.props.result);
    }
    if (this.props.nest != undefined &&
      this.props.nest != this.state.items) {
      if (this.props.nest.every(i => i._id == (
        this.state.items[i.position] != undefined &&
        this.state.items[i.position]._id
      ))) {
        this.setState({
          items: this.props.nest.sort((a, b) =>
            (Number(a.position) > Number(b.position)) ? 1 : -1),
        });
      }
      if (this.props.nest.length != this.state.items.length) {
        this.setState({
          items: this.props.nest.sort((a, b) =>
            (Number(a.position) > Number(b.position)) ? 1 : -1),
        });
      }
    }
  };

  dragFn(result) {
    if (!result.destination) return;
    if (result.type === this.props.type) {
      const items = this.state.items;
      const [removed] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, removed);
      this.setState({ items });
      items.map((item, index) =>
        this.props.update({ position: index }, item._id));
    }
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
    const { type } = this.props;

    return (
      <Droppable droppableId={type} type={type}>
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
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  update: (content, _id) => dispatch(update(content, _id)),
})

export default connect(null, mapDispatchToProps)
  (Nest);
