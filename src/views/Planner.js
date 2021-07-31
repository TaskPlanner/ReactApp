import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Plan from 'blocks/Plan';
import Page from 'templates/Page';
import List from 'templates/List';

const Planner = ({ planner, type }) => (
  <Page type={type}>
    {planner != undefined && planner.map(item => (
      <Plan
        key={item._id}
        name={item.name}
      >
        <List list={item.data} />
      </Plan>
    ))}
  </Page>
);

Planner.propTypes = {
  type: PropTypes.oneOf(['form', 'details', null]),
};

Planner.defaultProps = {
  type: null,
};

const mapStateToProps = ({ planner }) => ({ planner });

export default connect(mapStateToProps)(Planner);
