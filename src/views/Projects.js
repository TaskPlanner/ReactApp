import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Project from 'blocks/Project';
import Page from 'templates/Page';
import Card from 'blocks/Card';

const Projects = ({ projects, type }) => (
  <Page type={type}>
    {projects.map(item => (
      <Project
        key={item._id}
        name={item.name}
      >
        {item.data.map(i => (
          <Card
            _id={i._id}
            key={i._id}
            inbox={i.inbox}
            title={i.title}
            type={i.type}
            date={i.date}
            time={i.time}
            iterate={i.iterate}
            project={i.project}
            priority={i.priority}
            comments={i.comments}
          />
        ))}
      </Project>
    ))}
  </Page>
);

Projects.propTypes = {
  type: PropTypes.oneOf(['form', 'details', null]),
  projects: PropTypes.array.isRequired,
};

Projects.defaultProps = {
  type: null,
  projects: [],
};

const mapStateToProps = ({ projects }) => ({ projects });

export default connect(mapStateToProps)(Projects);
