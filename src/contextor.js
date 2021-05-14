import React from 'react';
import Context from 'context';
import { useParams } from 'react-router-dom';

const contextor = Component => {
  return (props) => {
    const { id } = useParams();

    return (
      <Context.Consumer>
        {context => (
          <Component {...props} module={context} element={id} />
        )}
      </Context.Consumer>
    );
  };
};

export default contextor;
