import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Project from 'blocks/Project';
import Page from 'templates/Page';
import List from 'templates/List';

const Projects = ({ projects, type }) => (
  <Page type={type}>
    {projects.map(item => (
      <Project
        key={item._id}
        name={item.name}
      >
        <List list={item.data} />
      </Project>
    ))}
  </Page>
);

Projects.propTypes = {
  type: PropTypes.oneOf(['form', 'details', null]),
};

Projects.defaultProps = {
  type: null,
};

const mapStateToProps = ({ projects }) => ({ projects });

export default connect(mapStateToProps)(Projects);
