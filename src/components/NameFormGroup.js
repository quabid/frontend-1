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
  };

  const onFnameChangeHandler = (e) => setFname(e.target.value.trim());

  const onFnameKeyupHandler = () =>
    setFnameChangeOccured(fname.trim() !== bu_fname.trim() ? true : false);

  const saveChanges = (obj) => {
    if (null !== changes) {
      changes.which = obj.which;
      switch (obj.which) {
        case 'fname':
          changes.fname = obj.value;
          changes.value = obj.value;
          changes.which = obj.which;
          break;

        case 'lname':
          changes.lname = obj.value;
          changes.value = obj.value;
          changes.which = obj.which;
          break;

        default:
          break;
      }
    } else {
      const update = {
        id: id,
        action: 'update',
        property: 'name',
        which: obj.which,
        value: obj.value,
      };
      setChanges(update);
    }
    obj.which === 'fname'
      ? setFnameChangesSaved(true)
      : setLnameChangesSaved(true);
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
  };

  const onLnameChangeHandler = (e) => setLname(e.target.value.trim());

  const onLnameKeyupHandler = () =>
    setLnameChangeOccured(lname.trim() !== bu_lname.trim() ? true : false);

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
                  onClick={() => {
                    saveChanges({
                      which: 'fname',
                      value: fname,
                    });
                  }}
                  className='btn btn-outline-primary d-inline-block border border-primary rounded font-weight-bold'
                >
                  <i className='fas fa-pencil-alt fw'></i> Save
                </span>
              </Col>
            ) : null}

            {fnameChangesSaved ? (
              <>
                {!fnameChangesApplied ? (
                  <Col className='my-3' xs={12} md={6}>
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

                {fnameChangesApplied ? (
                  <Col className='my-3' xs={12} md={6}>
                    <span
                      onClick={() => {
                        resetFname();
                        cancelFname();
                      }}
                      className='btn btn-outline-success d-inline-block border border-success rounded font-weight-bold'
                    >
                      <i className='fas fa-stop fw'></i> Cancel
                    </span>
                  </Col>
                ) : null}
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
                  onClick={() => {
                    saveChanges({
                      which: 'lname',
                      value: lname,
                    });
                  }}
                  className='btn btn-outline-primary d-inline-block border border-primary rounded font-weight-bold'
                >
                  <i className='fas fa-pencil-alt fw'></i> Save
                </span>
              </Col>
            ) : null}

            {lnameChangesSaved ? (
              <>
                {!lnameChangesApplied ? (
                  <Col className='my-3' xs={12} md={6}>
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

                {lnameChangesApplied ? (
                  <Col className='my-3' xs={12} md={6}>
                    <span
                      onClick={() => {
                        resetLname();
                        cancelLname();
                      }}
                      className='btn btn-outline-success d-inline-block border border-success rounded font-weight-bold'
                    >
                      <i className='fas fa-stop fw'></i> Cancel
                    </span>
                  </Col>
                ) : null}
              </>
            ) : null}
          </>
        ) : null}
      </Col>
    </Row>
  );
};

export default NameFormGroup;
