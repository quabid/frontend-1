import React, { useState, useEffect } from 'react';
import { Form, Dropdown, Row, Col, Container } from 'react-bootstrap';
import { OPTIONS } from '../constants/DropdownConstants';

const AddressFormGroup = ({
  id,
  category,
  address,
  modifyProperty,
  removeProperty,
  cancelModification,
  uuid,
}) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [_category, setCategory] = useState('');
  const [bu_street, setBuStreet] = useState('');
  const [bu_city, setBuCity] = useState('');
  const [bu_zipcode, setBuZipcode] = useState('');
  const [bu_category, setBuCategory] = useState('');
  const [streetChangeOccured, setStreetChangeOccured] = useState(false);
  const [streetChangeSaved, setStreetChangeSaved] = useState(false);
  const [streetChanges, setStreetChanges] = useState(null);
  const [cityChangeOccured, setCityChangeOccured] = useState(false);
  const [cityChangeSaved, setCityChangeSaved] = useState(false);
  const [cityChanges, setCityChanges] = useState(null);
  const [zipcodeChangeOccured, setZipcodeChangeOccured] = useState(false);
  const [zipcodeChangeSaved, setZipcodeChangeSaved] = useState(null);
  const [zipcodeChanges, setZipcodeChanges] = useState(null);
  const [categoryChangeOccured, setCategoryChangeOccured] = useState(false);
  const [categoryChangeSaved, setCategoryChangeSaved] = useState(null);
  const [categoryChanges, setCategoryChanges] = useState(false);
  const [updateChanges, setUpdateChanges] = useState(null);

  useEffect(() => {
    setCategory(_category || category);
    setStreet(street || address.street);
    setCity(city || address.city);
    setZipcode(zipcode || address.zipcode);
    setBuCategory(category);
    setBuStreet(address.street);
    setBuCity(address.city);
    setBuZipcode(address.zipcode);
  }, [
    category,
    address.street,
    _category,
    address.city,
    address.zipcode,
    street,
    city,
    zipcode,
  ]);

  const update = obj => {
    let changes = {
      action: 'update',
      id: id,
      property: 'address',
      category: _category,
      uuid,
    };
    if (null !== updateChanges) {
      changes = updateChanges;
    } else {
      setUpdateChanges(changes);
    }

    switch (obj.which) {
      case 'street':
        changes.street = obj.street;
        break;

      case 'city':
        changes.city = obj.city;
        break;

      case 'zipcode':
        changes.zipcode = obj.zipcode;
        break;

      case 'category':
        changes.category = obj.category;
        break;

      default:
        break;
    }
  };

  const remove = () => {
    setUpdateChanges({ action: 'remove', id: id, property: 'address', uuid });
  };

  const applyChanges = () => {
    setCategoryChanges(false);
    setStreetChanges(false);
    setCityChanges(false);
    setZipcodeChanges(false);

    switch (updateChanges.action) {
      case 'update':
        modifyProperty(updateChanges);
        break;

      case 'remove':
        removeProperty(updateChanges);
        break;

      case 'cancel':
        cancelModification(updateChanges);
        break;

      default:
        break;
    }

    updateChanges && updateChanges.action === 'update'
      ? modifyProperty(updateChanges)
      : removeProperty(updateChanges);
  };

  // Street Events
  const resetStreet = () => {
    setStreet(bu_street);
    setStreetChangeOccured(false);
    setStreetChangeSaved(false);
    setStreetChanges(null);
    if (updateChanges && updateChanges.street) {
      delete updateChanges.street;
    }
    let changes = {
      action: 'cancel',
      id: id,
      property: 'address',
      street: street,
      which: 'street',
      uuid,
    };
    if (null !== updateChanges) {
      changes = updateChanges;
    } else {
      setUpdateChanges(changes);
    }
  };

  const saveStreetProperty = () => {
    setStreetChanges({ which: 'street', street });
    setStreetChangeSaved(true);
    update({ which: 'street', street });
  };

  const onStreetChangeHandler = e => setStreet(e.target.value);

  const onStreetKeyup = () =>
    setStreetChangeOccured(street !== bu_street ? true : false);

  // City Events
  const resetCity = () => {
    setCity(bu_city);
    setCityChangeOccured(false);
    setCityChangeSaved(false);
    setCityChanges(null);
    if (updateChanges && updateChanges.city) {
      delete updateChanges.city;
    }
    let changes = {
      action: 'cancel',
      id: id,
      property: 'address',
      which: 'city',
      city: city,
      uuid,
    };
    if (null !== updateChanges) {
      changes = updateChanges;
    } else {
      setUpdateChanges(changes);
    }
  };

  const saveCityProperty = () => {
    setCityChanges({ which: 'city', city });
    setCityChangeSaved(true);
    update({ which: 'city', city });
  };

  const onCityChangeHandler = e => setCity(e.target.value);

  const onCityKeyup = () =>
    setCityChangeOccured(city !== bu_city ? true : false);

  // Zipcode Events
  const resetZipcode = () => {
    setZipcode(bu_zipcode);
    setZipcodeChangeOccured(false);
    setZipcodeChanges(null);
    if (updateChanges && updateChanges.zipcode) {
      delete updateChanges.zipcode;
    }
    let changes = {
      action: 'cancel',
      id: id,
      property: 'address',
      zipcode: zipcode,
      which: 'zipcode',
      uuid,
    };
    if (null !== updateChanges) {
      changes = updateChanges;
    } else {
      setUpdateChanges(changes);
    }
  };

  const saveZipcodeProperty = () => {
    setZipcodeChanges({ which: 'zipcode', zipcode: zipcode });
    setZipcodeChangeSaved(true);
    update({ which: 'zipcode', zipcode: zipcode });
  };

  const onZipcodeChangeHandler = e => setZipcode(e.target.value);

  const onZipcodeKeyup = () =>
    setZipcodeChangeOccured(zipcode !== bu_zipcode ? true : false);

  const resetCategory = () => {
    setCategory(bu_category);
    setCategoryChanges(false);
  };

  const resetAll = () => {
    resetStreet();
    resetCity();
    resetZipcode();
    resetCategory();
  };

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
                  id="addressCategory"
                >
                  {_category || 'Address Category'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {OPTIONS.map((option, index) => (
                    <Dropdown.Item
                      key={index + 22}
                      id={option}
                      onSelect={e => {
                        const selectedItem = e.split('#')[1];
                        console.log(
                          `Selected category item changed to: ${selectedItem}`
                        );
                        setCategory(selectedItem);
                        setCategoryChanges(
                          selectedItem.toLowerCase().trim() !==
                            bu_category.toLowerCase().trim()
                            ? true
                            : false
                        );
                        update({ which: 'category', category: selectedItem });
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
              type="text"
              value={street}
              onChange={onStreetChangeHandler}
              onKeyUp={onStreetKeyup}
            />

            {streetChangeOccured ? (
              <>
                <Col className="my-3" xs={12} md={3}>
                  <span
                    onClick={resetStreet}
                    className="btn btn-outline-success d-inline-block border border-success rounded font-weight-bold"
                  >
                    <i className="fas fa-stop fw"></i> Cancel
                  </span>
                </Col>
                {!streetChangeSaved ? (
                  <Col className="my-3" xs={12} md={3}>
                    <span
                      onClick={saveStreetProperty}
                      className="btn btn-outline-primary d-inline-block border border-primary rounded font-weight-bold"
                    >
                      <i className="fas fa-pencil-alt fw"></i> Save
                    </span>
                  </Col>
                ) : null}
              </>
            ) : null}
          </Col>

          <Col xs={12}>
            <Form.Control
              className="my-2 mx-auto"
              style={{ background: 'transparent', color: '#fff' }}
              size="lg"
              as="input"
              type="text"
              value={city}
              onChange={onCityChangeHandler}
              onKeyUp={onCityKeyup}
            />

            {cityChangeOccured ? (
              <>
                <Col className="my-3" xs={12} md={3}>
                  <span
                    onClick={resetCity}
                    className="btn btn-outline-success d-inline-block border border-success rounded font-weight-bold"
                  >
                    <i className="fas fa-stop fw"></i> Cancel
                  </span>
                </Col>
                {!cityChangeSaved ? (
                  <Col className="my-3" xs={12} md={3}>
                    <span
                      onClick={saveCityProperty}
                      className="btn btn-outline-primary d-inline-block border border-primary rounded font-weight-bold"
                    >
                      <i className="fas fa-pencil-alt fw"></i> Save
                    </span>
                  </Col>
                ) : null}
              </>
            ) : null}
          </Col>

          <Col xs={12}>
            <Form.Control
              className="my-2 mx-auto"
              style={{ background: 'transparent', color: '#fff' }}
              size="lg"
              as="input"
              type="zipcode"
              value={zipcode}
              onChange={onZipcodeChangeHandler}
              onKeyUp={onZipcodeKeyup}
            />

            {zipcodeChangeOccured ? (
              <>
                <Col className="my-3" xs={12} md={3}>
                  <span
                    onClick={resetZipcode}
                    className="btn btn-outline-success d-inline-block border border-success rounded font-weight-bold"
                  >
                    <i className="fas fa-stop fw"></i> Cancel
                  </span>
                </Col>
                {!zipcodeChangeSaved ? (
                  <Col className="my-3" xs={12} md={3}>
                    <span
                      onClick={saveZipcodeProperty}
                      className="btn btn-outline-primary d-inline-block border border-primary rounded font-weight-bold"
                    >
                      <i className="fas fa-pencil-alt fw"></i> Save
                    </span>
                  </Col>
                ) : null}
              </>
            ) : null}
          </Col>

          <Col className="my-3" xs={12} md={3}>
            <span
              onClick={remove}
              className="btn btn-outline-danger d-inline-block border border-danger rounded font-weight-bold"
            >
              <i className="fas fa-trash-alt fw"></i> Remove
            </span>
          </Col>

          {streetChanges || cityChanges || zipcodeChanges || categoryChanges ? (
            <>
              <Col className="my-3" xs={12} md={3}>
                <span
                  onClick={applyChanges}
                  className="btn btn-outline-success d-inline-block border border-success rounded font-weight-bold"
                >
                  <i className="fas fa-go fw"></i> Apply Changes
                </span>
              </Col>
            </>
          ) : null}
        </Row>
      </Container>
    </Form.Group>
  );
};

export default AddressFormGroup;
