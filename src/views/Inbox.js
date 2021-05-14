import React, { Component } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux';
import { fetch } from 'actions';
import PropTypes from 'prop-types';
import Page from 'templates/Page';
import Card from 'blocks/Card';

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = { items: props.inbox };
    this.onDragEnd = this.onDragEnd.bind(this);
  };

  componentDidMount() {
    this.props.fetch();
    this.setState({ items: this.props.inbox });
  };

  componentDidUpdate() {
    (this.state.items !== this.props.inbox) &&
      this.setState({ items: this.props.inbox });
  };

  onDragEnd(result) {
    if (!result.destination) return;
    const items = this.state.items;
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    this.setState({ items });
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
                        <Card {...item} />
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
})

export default connect(mapStateToProps, mapDispatchToProps)
  (Inbox);
