import React, { useState, useEffect } from "react";
import countryList from "country-list";

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
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [country, setCountry] = useState("");
	const countries = countryList.getData();

	useEffect(() => {
		if (selectedContact) {
			setFormFields(selectedContact);
		} else {
			resetForm();
		}
	}, [selectedContact]);

	const setFormFields = (contact: Contact) => {
		setFirstName(contact.firstName);
		setLastName(contact.lastName);
		setEmail(contact.email);
		setCountry(contact.country);
	};

	const addContact = () => {
		if (isFormValid()) {
			const newContact: Contact = {
				id: contacts.length + 1,
				firstName,
				lastName,
				email,
				country,
			};
			onContactAdded(newContact);
			resetForm();
		} else {
			alert("Please fill in all the fields");
		}
	};

	const editContact = () => {
		if (selectedContact) {
			const updatedContact: Contact = {
				...selectedContact,
				firstName,
				lastName,
				email,
				country,
			};
			onContactEdited(updatedContact);
			resetForm();
			onGoBack();
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
		return firstName && lastName && email && country;
	};

	const resetForm = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setCountry("");
	};

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value);
	};

	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCountry(e.target.value);
	};

	return (
		<div>
			<h2>{contactToEdit ? "Edit Contact" : "Add Contact"}</h2>
			<form>
				<div>
					<label>
						First Name:
						<input
							type="text"
							value={firstName}
							onChange={handleFirstNameChange}
							required
						/>
					</label>
				</div>

				<div>
					<label>
						Last Name:
						<input
							type="text"
							value={lastName}
							onChange={handleLastNameChange}
							required
						/>
					</label>
				</div>

				<div>
					<label>
						Email:
						<input
							type="email"
							value={email}
							onChange={handleEmailChange}
							required
						/>
					</label>
				</div>

				<div>
					<label>
						Country:
						<select value={country} onChange={handleCountryChange} required>
							<option value="">Select</option>
							{countries.map((country) => (
								<option key={country.code} value={country.name}>
									{country.name}
								</option>
							))}
						</select>
					</label>
				</div>

				<button
					type="button"
					onClick={selectedContact ? editContact : addContact}
				>
					{selectedContact ? "Update Contact" : "Add Contact"}
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
