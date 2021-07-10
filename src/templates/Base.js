import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from 'context';
import { withRouter } from 'react-router';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

<link href='https://fonts.googleapis.com/css2?family=Lato:wght@400;700' />

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 1100px) {
    html { font-size: 90%; }
  }
  
  body {
    margin: 0;
    background: #fcfcfc;
    font-family: 'Lato';
  }

  button, input, textarea, select {
    border: none;
    outline: none;
    font-family: 'Lato';
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    margin-left: -20px;
  }

  a, a:hover {
    text-decoration: none;
  }

  .pointer { 
    cursor: pointer; 
  }
`;

const themeStyle = {
  s: '0.9rem',
  xs: '0.7rem',
  l: '1.2rem',
  xl: '1.6rem',
  dark100: '#555555',
  dark200: '#333333',
  blue100: '#576f9e',
  blue200: '#515875',
  gray100: '#fcfcfc',
  gray200: '#f2f2f2',
  gray300: '#444444',
};

class Base extends Component {
  state = { module: 'inbox' }

  componentDidMount() {
    this.setModule();
  }

  componentDidUpdate(pp, ps) {
    this.setModule(ps);
  }

  setModule = (ps = '') => {
    const modules = ['inbox', 'planner', 'projects'];
    const { location: { pathname } } = this.props;
    const [current] = modules.filter(module =>
      pathname.includes(module)
    );
    if (ps.module !== current) {
      this.setState({ module: current });
    }
  }

  render() {
    const { children } = this.props;
    const { module } = this.state;

    return (
      <div>
        <Context.Provider value={module}>
          <GlobalStyle />
          <ThemeProvider theme={themeStyle}>
            {children}
          </ThemeProvider>
        </Context.Provider>
      </div>
    );
  }
}

Base.propTypes = {
  children: PropTypes.element.isRequired,
}

export default withRouter(Base);
