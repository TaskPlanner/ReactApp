import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Page from 'templates/Page';
import List from 'templates/List';

const Inbox = ({ inbox, type }) => (
  <Page type={type}>
    <List list={inbox} />
  </Page>
);

Inbox.propTypes = {
  type: PropTypes.oneOf(['form', 'details', null]),
};

Inbox.defaultProps = {
  type: null,
};

const mapStateToProps = ({ inbox }) => ({ inbox });

export default connect(mapStateToProps)(Inbox);
