import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { add, update, remove } from 'actions';
import { proAdd } from 'actions/projects';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { FaRegCalendar, FaRegClock } from 'react-icons/fa';
import { FaProjectDiagram, FaTrash } from 'react-icons/fa';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Text from 'elements/Text';
import Button from 'elements/Button';
import Input from 'elements/Input';
import Comments from 'blocks/Comments';
import Format from 'format';

const Sheet = ({ add, update, remove, proAdd, item, module, projects }) => {
  const [openOpt, setOpenOpt] = useState(true);
  const [openCom, setOpenCom] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [addPro, setAddPro] = useState(false);
  const [inbox, setInbox] = useState(true);
  const [type, setType] = useState('task');

  useEffect(() => {
    item && setInbox(item.inbox);
    item && setType(item.type);
  }, [item]);

  return (
    <div>
      {redirect && <Redirect to={`/${module}`} />}
      <Format.Consumer>
        {(context) => (
          <Formik enableReinitialize initialValues={{ ...item }}
            onSubmit={values => {
              item ?
                update({
                  ...values, type: type, inbox: inbox,
                  comments: context.state.comments.map((i) =>
                    ({ text: i.text, state: i.state }))
                }, item._id) :
                add({
                  ...values, state: 0, position: 0, type: type, inbox: inbox,
                  comments: context.state.comments.map((i) =>
                    ({ text: i.text, state: i.state }))
                });
              addPro && proAdd({ title: values.project, position: 0 });
              setRedirect(true);
            }}>
            {({ values, handleChange }) => (
              <Form>
                <div className='d-flex justify-content-between my-1'>
                  <div>
                    <Button className={type == 'task' ? 'active m-1' : 'm-1'}
                      type='button' onClick={() => setType('task')}>
                      Task
                    </Button>
                    <Button className={type == 'note' ? 'active m-1' : 'm-1'}
                      type='button' onClick={() => setType('note')}>
                      Note
                    </Button>
                  </div>
                  <Button className={inbox ? 'active m-1' : 'm-1'}
                    type='button' onClick={() => setInbox(!inbox)}>
                    Inbox
                  </Button>
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
                        name='date'
                        type='date'
                        defaultValue={values.date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='d-flex'>
                      <FaRegClock className='ml-3 my-auto' />
                      <Input
                        name='time'
                        type='time'
                        defaultValue={values.time}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='d-flex'>
                      <FaProjectDiagram className='ml-3 my-auto' />
                      {addPro ? <Input
                        autoComplete='off'
                        name='project'
                        placeholder='project...'
                        defaultValue={values.project}
                        onChange={handleChange}
                      /> : <Input
                        as='select'
                        name='project'
                        value={values.project}
                        onChange={handleChange}
                      >
                        <option value='add project'>project...</option>
                        {projects.map(i =>
                          <option key={i._id} value={i.title}>{i.title}</option>)}
                      </Input>}
                      <Button s type='button' className='mr-1 ml-auto'
                        onClick={() => setAddPro(!addPro)}>
                        {addPro ? <FaMinus className='p-1' /> : <FaPlus className='p-1' />}
                      </Button>
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
                    <FaTrash />
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

const mapStateToProps = ({ projects }) => ({ projects });

const mapDispatchToProps = (dispatch) => ({
  add: (content) => dispatch(add(content)),
  update: (content, _id) => dispatch(update(content, _id)),
  remove: (_id) => dispatch(remove(_id)),
  proAdd: (content) => dispatch(proAdd(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (Sheet);
