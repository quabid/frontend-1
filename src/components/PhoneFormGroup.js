import React, { useState, useEffect } from 'react';
import { Form, Dropdown, Row, Col, Container } from 'react-bootstrap';
import { OPTIONS } from '../constants/DropdownConstants';

const PhoneFormGroup = ({
  id,
  category,
  phone,
  modifyProperty,
  removeProperty,
  cancelModification,
}) => {
  const [_phone, setPhone] = useState('');
  const [_category, setCategory] = useState('');
  const [bu_phone, setBuPhone] = useState('');
  const [bu_category, setBuCategory] = useState('');
  const [changeOccured, setChangeOccured] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const [changesApplied, setChangesApplied] = useState(false);
  const [changes, setChanges] = useState(null);

  useEffect(() => {
    setCategory(_category || category);
    setPhone(_phone || phone);
    setBuCategory(category);
    setBuPhone(phone);
  }, [category, phone, _category, _phone]);

  const resetPhone = () => {
    setCategory(bu_category);
    setPhone(bu_phone);
    setChangeOccured(false);
    setChangesApplied(false);
    setChangesSaved(false);
    setChanges(null);
    cancelModification({
      id: id,
      property: 'phone',
      phone: _phone,
      category: _category,
    });
  };

  const saveProperty = () => {
    setChanges({
      action: 'update',
      id: id,
      category: _category,
      property: 'phone',
      phone: _phone,
    });
    setChangesSaved(true);
  };

  const applyChanges = () => {
    setChangesApplied(true);
  };

  const deleteProperty = () => {
    resetPhone();

    setChanges({
      action: 'remove',
      id: id,
      category: _category,
      type: 'phone',
      email: _phone,
    });

    setChangeOccured(false);
  };

  const onChangeHandler = e => {
    setPhone(
      e.target.value.trim() !== _phone.trim() ? e.target.value.trim() : bu_phone
    );
  };

  const onKeyupHandler = () =>
    setChangeOccured(_phone.trim() !== bu_phone.trim() ? true : false);

  return (
    <Form.Group controlId="exampleForm.SelectCustom">
      <Container fluid>
        <Row>
          <Col xs={3}>
            <Form.Label
              className="font-weight-bolder text-white my-2"
              style={{ fontSize: '1.2rem' }}
            >
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-success"
                  size="sm"
                  id="phoneCategory"
                >
                  {_category || 'Phone Category'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {OPTIONS.map((option, index) => (
                    <Dropdown.Item
                      key={index + 22}
                      id={option}
                      onSelect={e => {
                        const selectedItem = e.split('#')[1];
                        console.log(
                          `Selected item changed to: ${selectedItem}`
                        );
                        setCategory(selectedItem);
                      }}
                      href={'#' + option}
                      active={
                        option.toLowerCase() === _category.toLowerCase()
                          ? true
                          : false
                      }
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Label>
          </Col>
          <Col xs={12}>
            <Form.Control
              className="my-2 mx-auto"
              style={{ background: 'transparent', color: '#fff' }}
              size="lg"
              as="input"
              type="phone"
              value={_phone}
              onChange={onChangeHandler}
              onKeyUp={onKeyupHandler}
              disabled={changesSaved ? true : false}
            />
          </Col>
          {changeOccured ? (
            <>
              {!changesSaved ? (
                <Col className="my-3" xs={12} md={3}>
                  <span
                    onClick={saveProperty}
                    className="btn btn-outline-primary d-inline-block border
                border-primary rounded font-weight-bold"
                  >
                    <i className="fas fa-pencil-alt fw"></i> Save
                  </span>
                </Col>
              ) : null}

              {changesSaved ? (
                <>
                  {!changesApplied ? (
                    <Col className="my-3" xs={12} md={3}>
                      <span
                        onClick={() => {
                          applyChanges();
                          changes && changes.action === 'update'
                            ? modifyProperty(changes)
                            : removeProperty(changes);
                        }}
                        className="btn btn-outline-success d-inline-block border border-success rounded font-weight-bold"
                      >
                        <i className="fas fa-go fw"></i> Apply
                      </span>
                    </Col>
                  ) : null}

                  <Col className="my-3" xs={12} md={3}>
                    <span
                      onClick={resetPhone}
                      className="btn btn-outline-success d-inline-block border border-success rounded font-weight-bold"
                    >
                      <i className="fas fa-stop fw"></i> Cancel
                    </span>
                  </Col>
                </>
              ) : null}
            </>
          ) : null}

          <Col className="my-3" xs={12} md={3}>
            <span
              onClick={deleteProperty}
              className="btn btn-outline-danger d-inline-block border border-danger rounded font-weight-bold"
            >
              <i className="fas fa-trash-alt fw"></i> Remove
            </span>
          </Col>
        </Row>
      </Container>
    </Form.Group>
  );
};

export default PhoneFormGroup;
