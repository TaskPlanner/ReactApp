import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { reg } from 'actions';
import { Formik, Form } from 'formik';
import Start from 'templates/Start';
import Title from 'elements/Title';
import Button from 'elements/Button';
import Input from 'elements/Input';
import Logo from 'files/logo.png';

const Register = ({ registered, reg }) => (
  <Start>
    <Title className='m-1 m-md-3'>
      <img className='w-50 p-1 p-md-3' src={Logo} alt='Logo' />
    </Title>
    <Title l>Register</Title>
    <div className='my-5'>
      <Formik
        initialValues={{}}
        onSubmit={({ email, password, confirm }) => {
          password === confirm && reg(email, password);
        }}
      >
        {({ values, handleChange }) => {
          if (registered) {
            return <Redirect to={routes.login} />;
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
              <Input
                className='w-100'
                autoComplete='off'
                name='confirm'
                type='password'
                placeholder='confirm...'
                defaultValue={values.confirm}
                onChange={handleChange}
              />
              <hr className='my-2' />
              <div className='my-4'>
                <Button secondary type='submit'>
                  Register
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
    <div className='my-4'>
      <Button as={Link} to='/login'>
        Login
      </Button>
    </div>
  </Start>
);

const mapStateToProps = ({ registered = null }) => ({
  registered,
});

const mapDispatchToProps = dispatch => ({
  reg: (email, password) =>
    dispatch(reg(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)
  (Register);
