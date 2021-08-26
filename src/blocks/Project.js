import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { update } from 'actions';
import { proUpdate, proRemove } from 'actions/projects';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { FaRegFolder, FaTimes } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Button from 'elements/Button';
import Title from 'elements/Title';
import Input from 'elements/Input';

const Wrapper = styled.div`
  padding: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 0;
`;

const IconProject = styled(FaRegFolder)`
  color: ${({ theme }) => (theme.blue200)};
  font-size: 1.6rem;
`;

const Project = ({ children, list, title, _id, update, proUpdate, proRemove }) => {
  const [open, setOpen] = useState(false);
  const [editPro, setEditPro] = useState(false);

  return (
    <div>
      <Wrapper>
        <div className='d-flex justify-content-between'>
          <div className='d-flex pointer'>
            <div className='my-auto mr-3'>
              <IconProject />
            </div>
            {editPro ? <>
              <Formik initialValues={{ title }}
                onSubmit={values => {
                  list.map(i => update({ project: values.title }, i._id));
                  proUpdate({ ...values }, _id);
                  setEditPro(!editPro);
                }}>
                {({ values, handleChange }) => (
                  <Form>
                    <Input
                      className='p-2'
                      radius={1}
                      autoComplete='off'
                      name='title'
                      placeholder='Edit project...'
                      value={values.title}
                      onChange={handleChange}
                    />
                    <Button className='p-2 ml-2' type='submit'>
                      Edit project
                    </Button>
                  </Form>
                )}
              </Formik>
              <Button s onClick={() => setEditPro(!editPro)}>
                <FaTimes className='pb-1' />
              </Button>
            </> : <>
              <div onClick={() => setOpen(!open)} className='my-auto mr-2'>
                <Title>{title}</Title>
              </div>
              <Button s onClick={() => setEditPro(!editPro)}>
                <FaEdit className='pb-1' />
              </Button>
            </>}
            <Button s onClick={() => {
              proRemove(_id); list.map(i => update({ project: '' }, i._id));
            }}> <FaTrash className='pb-1' />
            </Button>
          </div>
          <div className='my-auto'>
            <Button s onClick={() => setOpen(!open)}>
              {open ? <FaAngleUp /> : <FaAngleDown />}
            </Button>
          </div>
        </div>
        <hr className='mb-0 mt-3' />
      </Wrapper>
      <Collapse in={open}>
        <div className='mx-4'>{children}</div>
      </Collapse>
    </div>
  );
}

Project.propTypes = {
  title: PropTypes.string,
};

Project.defaultProps = {
  title: 'Example Project',
};

const mapDispatchToProps = (dispatch) => ({
  update: (content, _id) => dispatch(update(content, _id)),
  proUpdate: (content, _id) => dispatch(proUpdate(content, _id)),
  proRemove: (_id) => dispatch(proRemove(_id)),
});

export default connect(null, mapDispatchToProps)
  (Project);
