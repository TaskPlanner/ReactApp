import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Page from 'templates/Page';
import List from 'templates/List';
import Button from 'elements/Button';
import Text from 'elements/Text';

const Inbox = ({ inbox, type }) => {
  const [filter, setFilter] = useState(true);
  const list = filter ? (inbox && inbox.filter(i => i.inbox == true)) : inbox;

  return (
    <div>
      <Page type={type}>
        <List list={list} />
      </Page>
      <Col className='px-1 px-sm-3 d-flex'
        lg={{ span: 10, offset: 2 }}
        md={{ span: 9, offset: 3 }}>
        <div className='m-2 mt-4'>
          <Text className='d-inline'>Filter list: </Text>
          <Button className={filter ? 'active mx-1' : 'mx-1'}
            onClick={() => setFilter(!filter)}> Inbox
          </Button>
          <Button className={!filter ? 'active mx-1' : 'mx-1'}
            onClick={() => setFilter(!filter)}> All
          </Button>
        </div>
      </Col>
    </div>
  );
}

Inbox.propTypes = {
  type: PropTypes.oneOf(['form', 'details', null]),
};

Inbox.defaultProps = {
  type: null,
};

const mapStateToProps = ({ inbox }) => ({ inbox });

export default connect(mapStateToProps)(Inbox);
