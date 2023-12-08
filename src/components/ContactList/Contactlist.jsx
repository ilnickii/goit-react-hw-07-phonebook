import { useDispatch, useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { deleteContact } from '../../redux/contactSlice';
import { selectContacts, selectFilter } from 'redux/selectors';

export const ContactsList = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);
    const contacts = useSelector(selectContacts);
    const getContactFromFilter = () => {
        const filterContacts = contacts.filter(({ name }) =>
            name.toLowerCase().includes(filter.toLowerCase())
        );
        return filterContacts;
    };
    const handleDelete = contactId => {
        dispatch(deleteContact(contactId));
    };

    const contactsFilter = getContactFromFilter();
    return (
        <ul className={css.contactsList}>
            {contactsFilter.map(contact => {
                const { id, name, number } = contact;
                return (
                    <li className={css.listItem} key={id}>
                        <span>{name}:</span>
                        <span>{number}</span>
                        <button
                            type="button"
                            className={css.contactsListBtn}
                            onClick={() => handleDelete(id)}
                        >
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};