import { Formik } from "formik";
import * as Yup from 'yup';
import { Button, ErrorMsg, Label, StyledField, StyledForm } from "./ContactForm.styled";
import PropTypes from 'prop-types';

 const ContactSchema = Yup.object().shape({
    name: Yup.string()
    .test(
      "name",
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      value => /^[a-zA-Zа-яА-Я]+((['][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(value)
    )
    .required('Required'),
    number: Yup.string()
    .test(
      "number",
      "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
      value =>
        /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/.test(
          value
        )
    )
    .required('Required'),
 });

export const ContactForm = ({onAdd}) => {
    return (
        <Formik
            initialValues={
                {
                    name: "",
                    number: "",
                }}
            onSubmit={(values, actions) =>{
                    onAdd(values);
                    actions.resetForm();
                }}
            validationSchema={ContactSchema}
        >
            <StyledForm>
                 <Label> Name:
                <StyledField name="name" type="text" />
                    <ErrorMsg name="name" component="div"/>
                </Label>
                <Label>Number: 
                <StyledField name="number" type="tel" />
                    <ErrorMsg name="number" component="div"/>
                    </Label>
                <Button type="submit">Add contact</Button>
            </StyledForm>
        </Formik >
    )
}

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};