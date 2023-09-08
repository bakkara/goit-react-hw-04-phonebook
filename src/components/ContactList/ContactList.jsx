import { Contact } from "components/Contact/Contact"
import { List } from "./ContactList.styled"
import PropTypes from 'prop-types';

export const ContactList = ({filterContactsList, deleteContact}) => {
    return (
     <List>
        {filterContactsList.map(item => (
            <li key={item.id}>
            <Contact contact={item} onDelete={deleteContact} />
            </li>
      ))}
     </List>
 )
}

ContactList.propTypes = {
  filterContactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ),
  deleteContact: PropTypes.func.isRequired
};