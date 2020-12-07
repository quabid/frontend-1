import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const NameFormGroup = ({
  id,
  firstName,
  lastName,
  modifyProperty,
  cancelModification,
}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [bu_fname, setBuFname] = useState('');
  const [bu_lname, setBuLname] = useState('');
  const [fnameChangeOccured, setFnameChangeOccured] = useState(false);
  const [lnameChangeOccured, setLnameChangeOccured] = useState(false);
  const [fnameChangesSaved, setFnameChangesSaved] = useState(false);
  const [lnameChangesSaved, setLnameChangesSaved] = useState(false);
  const [fnameChangesApplied, setFnameChangesApplied] = useState(false);
  const [lnameChangesApplied, setLnameChangesApplied] = useState(false);
  const [changes, setChanges] = useState(null);

  useEffect(() => {
    setFname(firstName);
    setLname(lastName);
    setBuFname(firstName);
    setBuLname(lastName);
  }, [firstName, lastName]);

  const cancelFname = () => {
    cancelModification({
      action: 'cancel',
      id: id,
      property: 'name',
      which: 'fname',
    });
  };

  const resetFname = () => {
    setFname(bu_fname);
    setFnameChangeOccured(false);
    setFnameChangesApplied(false);
    setFnameChangesSaved(false);
    cancelFname();
  };

  const onFnameChangeHandler = (e) => setFname(e.target.value.trim());

  const onFnameKeyupHandler = () =>
    setFnameChangeOccured(fname.trim() !== bu_fname.trim() ? true : false);

  const saveFnameChanges = () => {
    if (changes) {
      changes.fname = fname;
    } else {
      setChanges({
        id: id,
        action: 'update',
        property: 'name',
        which: 'fname',
        fname: fname,
        lname: lname,
      });
    }
    setFnameChangesSaved(true);
  };

  const applyFnameChanges = () => setFnameChangesApplied(true);

  const cancelLname = () => {
    cancelModification({
      action: 'cancel',
      id: id,
      property: 'name',
      which: 'lname',
    });
  };

  const resetLname = () => {
    setLname(bu_lname);
    setLnameChangeOccured(false);
    setLnameChangesApplied(false);
    setLnameChangesSaved(false);
    cancelLname();
  };

  const onLnameChangeHandler = (e) => setLname(e.target.value.trim());

  const onLnameKeyupHandler = () =>
    setLnameChangeOccured(lname.trim() !== bu_lname.trim() ? true : false);

  const saveLnameChanges = () => {
    if (changes) {
      changes.lname = lname;
    } else {
      setChanges({
        id: id,
        action: 'update',
        property: 'name',
        which: 'lname',
        lname: lname,
        fname: fname,
      });
    }
    setLnameChangesSaved(true);
  };

  const applyLnameChanges = () => setLnameChangesApplied(true);

  return (
    <Row>
      <Col xs={12} md={6}>
        <Form.Control
          className='my-2 mx-auto'
          style={{ background: 'transparent', color: '#fff' }}
          size='lg'
          as='input'
          type='text'
          value={fname}
          onChange={onFnameChangeHandler}
          onKeyUp={onFnameKeyupHandler}
          disabled={fnameChangesSaved ? true : false}
        />
        {fnameChangeOccured ? (
          <>
            {!fnameChangesSaved ? (
              <Col className='my-3' xs={12} md={6}>
                <span
                  onClick={saveFnameChanges}
                  className='btn btn-outline-primary d-inline-block border border-primary rounded font-weight-bold'
                >
                  <i className='fas fa-pencil-alt fw'></i> Save
                </span>
              </Col>
            ) : null}

            {fnameChangesSaved ? (
              <>
                {!fnameChangesApplied ? (
                  <Col className='my-3' xs={12} md={3}>
                    <span
                      onClick={() => {
                        applyFnameChanges();
                        changes &&
                          changes.action === 'update' &&
                          modifyProperty(changes);
                      }}
                      className='btn btn-outline-success d-inline-block border border-success rounded font-weight-bold'
                    >
                      <i className='fas fa-go fw'></i> Apply
                    </span>
                  </Col>
                ) : null}

                <Col className='my-3' xs={12} md={6}>
                  <span
                    onClick={resetFname}
                    className='btn btn-outline-success d-inline-block border border-success rounded font-weight-bold'
                  >
                    <i className='fas fa-stop fw'></i> Cancel
                  </span>
                </Col>
              </>
            ) : null}
          </>
        ) : null}
      </Col>

      <Col xs={12} md={6}>
        <Form.Control
          className='my-2 mx-auto'
          style={{ background: 'transparent', color: '#fff' }}
          size='lg'
          as='input'
          type='text'
          // updateContact
          value={lname}
          onChange={onLnameChangeHandler}
          onKeyUp={onLnameKeyupHandler}
          disabled={lnameChangesSaved ? true : false}
        />
        {lnameChangeOccured ? (
          <>
            {!lnameChangesSaved ? (
              <Col className='my-3' xs={12} md={6}>
                <span
                  onClick={saveLnameChanges}
                  className='btn btn-outline-primary d-inline-block border border-primary rounded font-weight-bold'
                >
                  <i className='fas fa-pencil-alt fw'></i> Save
                </span>
              </Col>
            ) : null}

            {lnameChangesSaved ? (
              <>
                {!lnameChangesApplied ? (
                  <Col className='my-3' xs={12} md={3}>
                    <span
                      onClick={() => {
                        applyLnameChanges();
                        changes &&
                          changes.action === 'update' &&
                          modifyProperty(changes);
                      }}
                      className='btn btn-outline-success d-inline-block border border-success rounded font-weight-bold'
                    >
                      <i className='fas fa-go fw'></i> Apply
                    </span>
                  </Col>
                ) : null}

                <Col className='my-3' xs={12} md={6}>
                  <span
                    onClick={resetLname}
                    className='btn btn-outline-success d-inline-block border border-success rounded font-weight-bold'
                  >
                    <i className='fas fa-stop fw'></i> Cancel
                  </span>
                </Col>
              </>
            ) : null}
          </>
        ) : null}
      </Col>
    </Row>
  );
};

export default NameFormGroup;
