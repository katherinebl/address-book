import React, { useState, useEffect } from 'react';
import countryList from 'country-list';

interface Contact {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	country: string;
}

interface ContactFormProps {
	contactToEdit?: Contact;
	contacts: Contact[];
	onContactAdded: (contact: Contact) => void;
	onContactEdited: (contact: Contact) => void;
	onContactDeleted: (id: number) => void;
	onGoBack: () => void;
	selectedContact: Contact | null;
	setSelectedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
}

const ContactForm: React.FC<ContactFormProps> = ({
	contactToEdit,
	onContactAdded,
	onContactEdited,
	onContactDeleted,
	onGoBack,
	contacts,
	selectedContact,
	setSelectedContact,
}) => {
	const [formFields, setFormFields] = useState({
		firstName: '',
		lastName: '',
		email: '',
		country: '',
	});
	const countries = countryList.getData();

	useEffect(() => {
		if (selectedContact) {
			setFormFields(selectedContact);
		} else {
			resetForm();
		}
	}, [selectedContact]);

	const addContact = () => {
		if (isFormValid()) {
			const newContact: Contact = {
				id: contacts.length + 1,
				...formFields,
			};
			onContactAdded(newContact);
			resetForm();
		} else {
			alert('Please fill in all the fields');
		}
	};

	const editContact = () => {
		if (selectedContact && isFormValid()) {
			const updatedContact: Contact = {
				...selectedContact,
				...formFields,
			};
			onContactEdited(updatedContact);
			resetForm();
			onGoBack();
		} else {
			alert('Please fill in all the fields');
		}
	};

	const deleteContact = () => {
		if (selectedContact) {
			onContactDeleted(selectedContact.id);
			resetForm();
			onGoBack();
		}
	};

	const isFormValid = () => {
		const { firstName, lastName, email, country } = formFields;
		return firstName && lastName && email && country;
	};

	const resetForm = () => {
		setFormFields({
			firstName: '',
			lastName: '',
			email: '',
			country: '',
		});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormFields((prevFormFields) => ({
			...prevFormFields,
			[name]: value,
		}));
	};

	return (
		<div>
			<h2>{contactToEdit ? 'Edit Contact' : 'Add Contact'}</h2>
			<form>
				<div>
					<label>
						First Name:
						<input
							type="text"
							name="firstName"
							value={formFields.firstName}
							onChange={handleInputChange}
							required
						/>
					</label>
				</div>

				<div>
					<label>
						Last Name:
						<input
							type="text"
							name="lastName"
							value={formFields.lastName}
							onChange={handleInputChange}
							required
						/>
					</label>
				</div>

				<div>
					<label>
						Email:
						<input
							type="email"
							name="email"
							value={formFields.email}
							onChange={handleInputChange}
							required
						/>
					</label>
				</div>

				<div>
					<label>
						Country:
						<select name="country" value={formFields.country} onChange={handleInputChange} required>
							<option value="">Select</option>
							{countries.map((country) => (
								<option key={country.code} value={country.name}>
									{country.name}
								</option>
							))}
						</select>
					</label>
				</div>

				<button type="button" onClick={selectedContact ? editContact : addContact}>
					{selectedContact ? 'Update Contact' : 'Add Contact'}
				</button>

				{selectedContact && (
					<button type="button" onClick={deleteContact}>
						Delete Contact
					</button>
				)}

				<button type="button" onClick={onGoBack}>
					Go Back
				</button>
			</form>
		</div>
	);
};

export default ContactForm;
