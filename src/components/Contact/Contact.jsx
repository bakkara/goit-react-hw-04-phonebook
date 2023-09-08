import { Button } from "components/ContactForm/ContactForm.styled"
import { ContactWrapper } from "./Contact.styled"
import PropTypes from 'prop-types';

export const Contact = ({
    contact: { id, name, number },
    onDelete
}) => {
    return (
        <ContactWrapper>
            <p>{name}: {number}</p>
            <Button onClick={()=> onDelete(id)}>Delete</Button>
        </ContactWrapper>
    )
}

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  }),
  onDelete: PropTypes.func.isRequired
};