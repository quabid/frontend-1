import * as ContactsConsts from '../constants/ContactsActionTypes';

export const contactsListReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case ContactsConsts.LIST_CONTACTS_REQUEST:
      return { loading: true, contacts: [] };

    case ContactsConsts.LIST_CONTACTS_SUCCESS:
      return { loading: false, contacts: action.payload };

    case ContactsConsts.LIST_CONTACTS_FAILED:
      return { loading: false, error: action.payload };

    case ContactsConsts.LIST_CONTACTS_NO_RESULTS:
      return { loading: false, nogo: true };

    default:
      return state;
  }
};

export const getContactReducer = (state = { contact: {} }, action) => {
  switch (action.type) {
    case ContactsConsts.GET_CONTACT_REQUEST:
      return { loading: true, contact: {} };

    case ContactsConsts.GET_CONTACT_SUCCESS:
      return { loading: false, contact: action.payload };

    case ContactsConsts.GET_CONTACT_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createContactReducer = (state = { contact: {} }, action) => {
  switch (action.type) {
    case ContactsConsts.CREATE_CONTACT_REQUEST:
      return { loading: true, contact: {} };

    case ContactsConsts.CREATE_CONTACT_SUCCESS:
      return { loading: false, contact: action.payload };

    case ContactsConsts.CREATE_CONTACT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
