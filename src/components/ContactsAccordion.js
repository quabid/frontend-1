import React, { useState } from 'react';
import {
  Card,
  Accordion,
  Row,
  Col,
  Form,
  Jumbotron,
  CardImg,
} from 'react-bootstrap';
import NameFormGroup from '../components/NameFormGroup';
import EmailFormGroup from '../components/EmailFormGroup';
import PhoneFormGroup from '../components/PhoneFormGroup';
import { log, hasKeys, stringify } from '../utils';

const ContactsAccordion = ({ contacts, handleContactsUpdate }) => {
  const [contactsToUpdate, setContactsToUpdate] = useState([]);
  const [hasUpdates, setHasUpdates] = useState(false);

  const checkUpdateStatus = () => {
    setHasUpdates(contactsToUpdate.length > 0);
    log(`\n\nContacts that will be updated `);
    log(contactsToUpdate);
    log(`\n\n`);
  };

  const updateEntity = obj => {
    if (obj.id) {
      const contact = contactsToUpdate.find(x => x.id === obj.id);
      console.log(`${obj.action} ${obj.property}`);
      // If contact is in the list
      if (contact) {
        switch (obj.property) {
          case 'email':
            if (!contact.emails) {
              contact.emails = [];
            }
            const email = contact.emails.find(e => e.email === obj.email);

            if (email) {
              email.category = obj.category;
              email.email = obj.email;
            } else {
              contact.emails.push({
                category: obj.category || null,
                email: obj.email || null,
              });
            }
            break;

          case 'phone':
            if (!contact.phones) {
              contact.phones = [];
            }
            const phone = contact.phones.find(p => p.phone === obj.phone);

            if (phone) {
              phone.category = obj.category;
              phone.phone = obj.phone;
            } else {
              contact.phones.push({
                category: obj.category,
                phone: obj.phone,
              });
            }
            break;

          case 'name':
            contact.name[`${obj.which}`] = obj.value;
            break;

          default:
            console.log(`Nothing to update`);
            break;
        }
      } else {
        // If contact is not in the list add it by ID and action
        const contact = {
          id: obj.id,
          action: obj.action,
        };
        contactsToUpdate.push(contact);

        switch (obj.property) {
          case 'email':
            console.log(`${obj.action} ${obj.property}`);
            contact.emails = [];
            contact.emails.push({
              action: obj.action,
              category: obj.category || null,
              email: obj.email || null,
              which: obj.which,
              property: obj.property,
            });
            break;

          case 'phone':
            contact.phones = [];
            contact.phones.push({
              action: obj.action,
              category: obj.category || null,
              phone: obj.phone || null,
            });
            break;

          case 'name':
            contact.name = {};
            contact.action = obj.action;
            switch (obj.which) {
              case 'fname':
                contact.name.fname = obj.value;
                break;

              case 'lname':
                contact.name.lname = obj.value;
                break;

              default:
                break;
            }
            break;

          default:
            console.log(`Nothing to update`);
            break;
        }
      }
    } else {
      console.log(`\n\n\t\t\tID not provided\n\n`);
      return;
    }

    checkUpdateStatus();
  };

  const cancelUpdate = obj => {
    const contactIndex = contactsToUpdate.findIndex(x => x.id === obj.id);

    if (contactIndex !== -1) {
      const contact = contactsToUpdate[contactIndex];

      switch (obj.property) {
        case 'name':
          log(`Cancel update for ${contact.name[obj.which]}`);
          switch (obj.which) {
            case 'fname':
              delete contact.name.fname;
              break;

            case 'lname':
              delete contact.name.lname;
              break;

            default:
              break;
          }
          break;

        case 'email':
          let emailIndex = contact.emails.findIndex(x => x.email === obj.email);
          if (emailIndex !== -1) {
            log(`Cancel update for property ${obj.property}`);
            const email = contact.emails[emailIndex];
            // delete email.email;
            // delete email.category;
            if (hasKeys(email)) {
              contact.emails.splice(emailIndex, (emailIndex += 1));
            }
          }
          break;

        case 'phone':
          let phoneIndex = contact.phones.findIndex(x => x.phone === obj.phone);
          if (phoneIndex !== -1) {
            log(`Cancel update for property ${obj.property}`);
            const phone = contact.phones[phoneIndex];
            // delete phone.phone;
            // delete phone.category;
            if (hasKeys(phone)) {
              contact.phones.splice(phoneIndex, (phoneIndex += 1));
            }
          }
          break;

        default:
          break;
      }
    } else {
      console.log(`\n\n\t\tContact not found: ${stringify(obj)}\n\n`);
    }

    checkUpdateStatus();
  };

  const removeProperty = obj => {
    let contact = contactsToUpdate.find(x => x.id === obj.id);

    if (contact) {
      contact.action = obj.action;
      log(`\n\n\t\t\tSet removal request on listed contact\n\n`);
      switch (obj.property) {
        case 'name':
          break;

        case 'email':
          const emailIndex = contact.emails.findIndex(
            x => x.email === obj.email
          );
          if (emailIndex !== -1) {
            const email = contact.emails[emailIndex];
            email.action = obj.action;
          }
          break;

        case 'phone':
          const phoneIndex = contact.phones.findIndex(
            x => x.phone === obj.phone
          );
          if (phoneIndex !== -1) {
            const phone = contact.phones[phoneIndex];
            phone.action = obj.action;
          }
          break;

        default:
          break;
      }
    } else {
      contactsToUpdate.push(obj);
      log(`\n\n\t\t\tAdded contact for removal request\n\n`);
    }
    checkUpdateStatus();
  };

  const pushUpdate = () => {
    handleContactsUpdate(contactsToUpdate);
  };

  const accordion = contacts.map(contact => {
    return (
      <Card
        key={contact._id}
        className="text-white my-1"
        style={{ background: 'transparent', fontSize: '1.9rem' }}
      >
        <Accordion.Toggle as={Card.Header} eventKey={contact._id}>
          <span className="font-weight-bolder text-white">
            {contact.fname.substring(0, 1).toUpperCase()}
            {contact.fname.substring(1)}
          </span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={contact._id}>
          <Card.Body
            className="text-white border border-white rounded"
            style={{ background: 'transparent', fontSize: '1.9rem' }}
          >
            <Jumbotron
              className="mx-0 my-0 px-1 py-1 text-center text-white"
              style={{ background: 'transparent', fontSize: '1rem' }}
            >
              <Row>
                <Col xs={12}>
                  {contact.image ? (
                    <CardImg alt={contact.fname} src={contact.image} />
                  ) : (
                    <i className="fas fa-user fa-8x fw"></i>
                  )}
                </Col>

                <Col xs={12} style={{ fontSize: '1.2rem' }}>
                  <p className="mx-0 my-1">
                    {contact.fname.substring(0, 1).toUpperCase()}
                    {contact.fname.substring(1)}{' '}
                    {contact.lname.substring(0, 1).toUpperCase()}
                    {contact.lname.substring(1)}
                  </p>
                </Col>

                <Col xs={12} style={{ fontSize: '1.2rem' }}>
                  <Form>
                    <Row className="border border-secondary rounded my-2">
                      <Col className="p-3">
                        <h2 className="h5 text-left font-weight-bolder">
                          Name
                        </h2>
                        <NameFormGroup
                          id={contact._id}
                          firstName={contact.fname}
                          lastName={contact.lname}
                          modifyProperty={updateEntity}
                          cancelModification={cancelUpdate}
                        />
                      </Col>
                    </Row>
                    <Row className="border border-secondary rounded my-2">
                      <Col className="p-3">
                        <h2 className="h5 text-left font-weight-bolder">
                          Phones
                        </h2>
                        {contact.phones.map((phone, index) => (
                          <PhoneFormGroup
                            key={index + 1}
                            id={contact._id}
                            phone={phone.phone}
                            category={phone.category}
                            modifyProperty={updateEntity}
                            removeProperty={removeProperty}
                            cancelModification={cancelUpdate}
                          />
                        ))}
                      </Col>
                    </Row>
                    <Row className="border border-secondary rounded my-2">
                      <Col className="p-3">
                        <h2 className="h5 text-left font-weight-bolder">
                          Emails
                        </h2>
                        {contact.emails.map((email, index) => (
                          <EmailFormGroup
                            key={index + 1}
                            id={contact._id}
                            email={email.email}
                            category={email.category}
                            modifyProperty={updateEntity}
                            removeProperty={removeProperty}
                            cancelModification={cancelUpdate}
                          />
                        ))}
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Jumbotron>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  });

  return (
    <>
      <Row style={{ textAlign: 'center' }}>
        {hasUpdates ? (
          <Col className="mb-3" xs={12} md={6}>
            <span
              onClick={pushUpdate}
              className="btn btn-outline-success d-inline-block border border-success rounded font-weight-bold"
            >
              <i className="fas fa-go fw"></i> Upload Changes
            </span>
          </Col>
        ) : null}
      </Row>
      <Row>
        <Col xs={12}>
          <Accordion>{accordion}</Accordion>
        </Col>
      </Row>
    </>
  );
};

export default ContactsAccordion;
