import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { auth } from 'actions';
import { Formik, Form } from 'formik';
import Start from 'templates/Start';
import Title from 'elements/Title';
import Button from 'elements/Button';
import Input from 'elements/Input';
import Logo from 'files/logo.png';

const Login = ({ user, auth, login, registered }) => (
  useEffect(() => {
    user && login();
  }),

  <Start>
    <Title className='m-1 m-md-3'>
      <img className='w-50 p-1 p-md-3' src={Logo} alt='Logo' />
    </Title>
    <Title l>Login</Title>
    <div className='my-5'>
      <Formik
        initialValues={{}}
        onSubmit={({ email, password }) => {
          auth(email, password);
        }}
      >
        {({ values, handleChange }) => {
          if (user) {
            return <Redirect to={routes.home} />;
          }
          return (
            <Form>
              <Input
                className='w-100'
                autoComplete='off'
                name='email'
                type='email'
                placeholder='email...'
                defaultValue={values.email}
                onChange={handleChange}
              />
              <hr className='my-2' />
              <Input
                className='w-100'
                autoComplete='off'
                name='password'
                type='password'
                placeholder='password...'
                defaultValue={values.password}
                onChange={handleChange}
              />
              <hr className='my-2' />
              <div className='my-4'>
                <Button secondary type='submit'>
                  Login
                </Button>
              </div>
              {registered && <span>Register success</span>}
            </Form>
          )
        }}
      </Formik>
    </div>
    <div className='my-4'>
      <Button as={Link} to='/register'>
        Register
      </Button>
    </div>
  </Start>
);

const mapStateToProps = ({ user = null, registered = null }) => ({
  user, registered,
});

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password) =>
    dispatch(auth(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)
  (Login);
