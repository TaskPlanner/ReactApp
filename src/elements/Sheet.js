import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { add, update, remove } from 'actions';
import { FaAngleUp, FaAngleDown, FaTrash } from 'react-icons/fa';
import { FaRegCalendar, FaRegClock } from 'react-icons/fa';
import { FaProjectDiagram, FaUndo } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Text from 'elements/Text';
import Button from 'elements/Button';
import Input from 'elements/Input';
import Comments from 'blocks/Comments';
import Format from 'format';

const Sheet = ({ add, update, remove, item, module }) => {
  const [openOpt, setOpenOpt] = useState(true);
  const [openCom, setOpenCom] = useState(true);
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
                  <Button s type='button'
                    onClick={() => setOpenOpt(!openOpt)}>
                    {openOpt ? <FaAngleUp /> : <FaAngleDown />}
                  </Button>
                </div>
                <Collapse in={openOpt}>
                  <div>
                    <div className='d-flex'>
                      <FaRegCalendar className='ml-3 my-auto' />
                      <Input
                        className='w-100'
                        autoComplete='off'
                        name='date'
                        placeholder='date...'
                        defaultValue={values.date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='d-flex'>
                      <FaRegClock className='ml-3 my-auto' />
                      <Input
                        className='w-100'
                        autoComplete='off'
                        name='time'
                        placeholder='time...'
                        defaultValue={values.time}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='d-flex'>
                      <FaUndo className='ml-3 my-auto' />
                      <Input
                        className='w-100'
                        autoComplete='off'
                        name='iterate'
                        placeholder='iterate...'
                        defaultValue={values.iterate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='d-flex'>
                      <FaProjectDiagram className='ml-3 my-auto' />
                      <Input
                        className='w-100'
                        autoComplete='off'
                        name='project'
                        placeholder='project...'
                        defaultValue={values.project}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </Collapse>
                <hr className='m-1' />
                <div className='d-flex justify-content-between m-1'>
                  <Text className='my-auto'>Comments</Text>
                  <Button s type='button'
                    onClick={() => setOpenCom(!openCom)}>
                    {openCom ? <FaAngleUp /> : <FaAngleDown />}
                  </Button>
                </div>
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
