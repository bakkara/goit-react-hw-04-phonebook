import { Input } from "./Filter.styled";
import PropTypes from 'prop-types';

export const Filter = ({filter, onSearchContact}) => {
    return (
        <div>
            <label htmlFor="filter">Find contacts by name
            <Input
                name="filter"
        type="text"
        value={filter}
        onChange={evt => onSearchContact(evt.target.value)}
        placeholder="Search contact"
                />
            </label>
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string, 
  onSearchContact: PropTypes.func.isRequired
};