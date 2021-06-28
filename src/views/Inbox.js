import React, { Component } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux';
import { fetch, update } from 'actions';
import PropTypes from 'prop-types';
import Page from 'templates/Page';
import Card from 'blocks/Card';

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.inbox.sort((a, b) =>
        (a.position > b.position) ? 1 : -1),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.moveFn = this.moveFn.bind(this);
  };

  componentDidMount() {
    this.props.fetch();
    this.setState({
      items: this.props.inbox.sort((a, b) =>
        (a.position > b.position) ? 1 : -1),
    });
  };

  componentDidUpdate() {
    if (this.state.items !== this.props.inbox) {
      if (this.props.inbox.every(i =>
        i._id === (this.state.items[i.position] != undefined &&
          this.state.items[i.position]._id))) {
        this.setState({
          items: this.props.inbox.sort((a, b) =>
            (a.position > b.position) ? 1 : -1),
        });
      }
      if (this.props.inbox.length !== this.state.items.length) {
        this.setState({
          items: this.props.inbox.sort((a, b) =>
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

  moveFn(source, top) {
    const src = Number(source);
    const dest = top ? 0 : Number(this.state.items.length);
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
      <Page type={type}>
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
      </Page>
    );
  }
}

Inbox.propTypes = {
  type: PropTypes.oneOf(['form', 'details', null]),
};

Inbox.defaultProps = {
  type: null,
};

const mapStateToProps = ({ inbox }) => ({ inbox });

const mapDispatchToProps = (dispatch) => ({
  fetch: () => (dispatch(fetch())),
  update: (content, _id) =>
    dispatch(update(content, _id)),
})

export default connect(mapStateToProps, mapDispatchToProps)
  (Inbox);
