import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Plan from 'blocks/Plan';
import Page from 'templates/Page';
import Card from 'blocks/Card';

const Planner = ({ planner, type }) => (
  <Page type={type}>
    {planner.map(item => (
      <Plan
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
      </Plan>
    ))}
  </Page>
);

Planner.propTypes = {
  type: PropTypes.oneOf(['form', 'details', null]),
  planner: PropTypes.array.isRequired,
};

Planner.defaultProps = {
  type: null,
  planner: [],
};

const mapStateToProps = ({ planner }) => ({ planner });

export default connect(mapStateToProps)(Planner);
