import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { proFetch, proAdd, proUpdate } from 'actions/projects';
import { fetch, update } from 'actions';
import Project from 'blocks/Project';
import Page from 'templates/Page';
import Input from 'elements/Input';
import Button from 'elements/Button';
import Nest from 'templates/Nest';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [] };
    this.onDragEnd = this.onDragEnd.bind(this);
  };

  componentDidMount() {
    this.props.fetch();
    this.props.proFetch();
  };

  componentDidUpdate() {
    if (this.props.projects != undefined &&
      this.props.projects != this.state.projects) {
      if (this.props.projects.every(i => i._id == (
        this.state.projects[i.position] != undefined &&
        this.state.projects[i.position]._id
      ))) {
        this.setState({
          projects: this.props.projects.sort((a, b) =>
            (a.position > b.position) ? 1 : -1),
        });
      }
      if (this.props.projects.length != this.state.projects.length) {
        this.setState({
          projects: this.props.projects.sort((a, b) =>
            (a.position > b.position) ? 1 : -1),
        });
      }
    }
  };

  onDragEnd(result) {
    if (!result.destination) return;
    if (result.type === 'projects') {
      const projects = this.state.projects;
      const [removed] = projects.splice(result.source.index, 1);
      projects.splice(result.destination.index, 0, removed);
      this.setState({ projects });
      projects.map((item, index) =>
        this.props.proUpdate({ position: index }, item._id));
    }
    if (result.type === 'nest') {
      this.setState({ result });
    }
  };

  render() {
    const { type, proAdd } = this.props;

    return (
      <div>
        <Page type={type}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId='projects' type='projects'>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {this.state.projects.map((item, index) => (
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
                          <Project
                            key={item._id} _id={item._id}
                            title={item.title} list={item.data}
                          >
                            <Nest
                              nest={item.data}
                              result={this.state.result}
                            />
                          </Project>
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
        <Col className='px-1 px-sm-3 d-flex'
          lg={{ span: 10, offset: 2 }}
          md={{ span: 9, offset: 3 }}>
          <Formik initialValues={{ title: '' }}
            onSubmit={(values, { resetForm }) => {
              proAdd({ ...values, position: 0 });
              resetForm();
            }}>
            {({ values, handleChange }) => (
              <Form className='m-2 mt-4'>
                <Input
                  radius={1}
                  autoComplete='off'
                  name='title'
                  placeholder='Add new project...'
                  value={values.title}
                  onChange={handleChange}
                />
                <Button className='ml-2' type='submit'>
                  Add new project
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </div>
    );
  }
}

Projects.propTypes = {
  type: PropTypes.oneOf(['form', 'details', null]),
};

Projects.defaultProps = {
  type: null,
};

const mapStateToProps = ({ projects }) => ({ projects });

const mapDispatchToProps = (dispatch) => ({
  fetch: () => (dispatch(fetch())),
  update: (content, _id) => dispatch(update(content, _id)),
  proFetch: () => (dispatch(proFetch())),
  proAdd: (content) => dispatch(proAdd(content)),
  proUpdate: (content, _id) => dispatch(proUpdate(content, _id)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (Projects);
