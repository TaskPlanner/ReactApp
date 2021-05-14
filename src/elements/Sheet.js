import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { add, update, remove } from 'actions';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Text from 'elements/Text';
import Button from 'elements/Button';
import Input from 'elements/Input';
import Comments from 'blocks/Comments';
import Format from 'format';

const Sheet = ({ add, update, remove, item, module }) => {
  const [openOpt, setOpenOpt] = useState(true);
  const [openCom, setOpenCom] = useState(false);
  const [redirect, setRedirect] = useState(false);

  return (
    <div>
      {redirect && <Redirect to={`/${module}`} />}
      <Format.Consumer>
        {(context) => (
          <Formik enableReinitialize initialValues={{ ...item }}
            onSubmit={values => {
              item ?
                update({
                  ...values,
                  comments: context.state.comments.map((i) => ({ text: i.text }))
                }, item._id) :
                add({
                  ...values,
                  comments: context.state.comments.map((i) => ({ text: i.text }))
                });
              setRedirect(true);
            }}>
            {({ values, handleChange }) => (
              <Form>
                <div className='d-flex justify-content-between my-1'>
                  <div>
                    <Button className='m-1' secondary type='button'>Task</Button>
                    <Button className='m-1' secondary type='button'>Note</Button>
                  </div>
                  <Button className='m-1' secondary type='button'>Inbox</Button>
                </div>
                <hr className='m-1' />
                <Input
                  className='w-100'
                  autoComplete='off'
                  as='textarea'
                  name='title'
                  placeholder='title...'
                  defaultValue={values.title}
                  onChange={handleChange}
                />
                <hr className='m-1' />
                <div className='d-flex justify-content-between m-1'>
                  <Text className='my-auto'>Options</Text>
                  <Button onClick={() => setOpenOpt(!openOpt)}
                    secondary type='button'>
                    <FaSearch className='pb-1' /> More
                </Button>
                </div>
                <hr className='m-1' />
                <Collapse in={openOpt}>
                  <div>
                    <Input
                      className='w-100'
                      autoComplete='off'
                      name='date'
                      placeholder='date...'
                      defaultValue={values.date}
                      onChange={handleChange}
                    />
                    <hr className='m-1' />
                    <Input
                      className='w-100'
                      autoComplete='off'
                      name='time'
                      placeholder='time...'
                      defaultValue={values.time}
                      onChange={handleChange}
                    />
                    <hr className='m-1' />
                    <Input
                      className='w-100'
                      autoComplete='off'
                      name='iterate'
                      placeholder='iterate...'
                      defaultValue={values.iterate}
                      onChange={handleChange}
                    />
                    <hr className='m-1' />
                    <Input
                      className='w-100'
                      autoComplete='off'
                      name='project'
                      placeholder='project...'
                      defaultValue={values.project}
                      onChange={handleChange}
                    />
                    <hr className='m-1' />
                    <Input
                      className='w-100'
                      autoComplete='off'
                      name='priority'
                      placeholder='priority...'
                      defaultValue={values.priority}
                      onChange={handleChange}
                    />
                    <hr className='m-1' />
                  </div>
                </Collapse>
                <div className='d-flex justify-content-between m-1'>
                  <Text className='my-auto'>Comments</Text>
                  <Button onClick={() => setOpenCom(!openCom)}
                    secondary type='button'>
                    <FaSearch className='pb-1' /> More
                </Button>
                </div>
                <hr className='m-1' />
                <Collapse in={openCom}>
                  <div><Comments /></div>
                </Collapse>
                <Button className='mt-5 mr-2' type='submit'>
                  Save
                </Button>
                {item ?
                  <Button onClick={() => {
                    remove(item._id);
                    setRedirect(true);
                  }}>
                    <FaTrash className='pb-1' />
                  </Button> :
                  <Button onClick={() => setRedirect(true)}>
                    Close
                  </Button>
                }
              </Form>
            )}
          </Formik>
        )}
      </Format.Consumer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  add: (content) => dispatch(add(content)),
  update: (content, _id) =>
    dispatch(update(content, _id)),
  remove: (_id) => dispatch(remove(_id)),
});

export default connect(null, mapDispatchToProps)(Sheet);
