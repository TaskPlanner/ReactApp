import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { add } from 'actions/projects';
import Project from 'blocks/Project';
import Page from 'templates/Page';
import List from 'templates/List';
import Input from 'elements/Input';

const Projects = ({ projects, type, add }) => (
  <Page type={type}>
    {projects != undefined && projects.map(item => (
      <Project
        key={item._id}
        name={item.name}
      >
        <List list={item.data} />
      </Project>
    ))}
    <Formik initialValues={{}}
      onSubmit={values => { add({ ...values }) }}>
      {({ values, handleChange }) => (
        <Form className='m-2 mt-4'>
          <Input
            style={{ zIndex: 100 }}
            radius={1}
            className='w-100'
            autoComplete='off'
            name='title'
            placeholder='add new project...'
            defaultValue={values.title}
            onChange={handleChange}
          />
        </Form>
      )}
    </Formik>
  </Page>
);

Projects.propTypes = {
  type: PropTypes.oneOf(['form', 'details', null]),
};

Projects.defaultProps = {
  type: null,
};

const mapStateToProps = ({ projects }) => ({ projects });

const mapDispatchToProps = (dispatch) => ({
  add: (content) => dispatch(add(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (Projects);
