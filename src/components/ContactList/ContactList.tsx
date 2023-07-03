import React from 'react';

import styles from './ContactList.module.scss';

export interface Contact {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	country: string;
}

interface ContactListProps {
	contacts: Contact[];
	setSelectedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
	onViewContact: (contact: Contact) => void;
	handleContactForm: () => void;
}

const ContactListItem: React.FC<{ contact: Contact; onClick: () => void }> = ({
	contact,
	onClick,
}) => (
	<li key={contact.id} onClick={onClick} className={styles.contactCard}>
		<strong>
			{contact.firstName} {contact.lastName}
		</strong>
		<div>{contact.email}</div>
		<div>{contact.country}</div>
	</li>
);

const ContactList: React.FC<ContactListProps> = ({
	contacts,
	setSelectedContact,
	onViewContact,
	handleContactForm,
}) => {
	const handleContactClick = (contact: Contact) => {
		onViewContact(contact);
	};

	const handleContactFormClick = () => {
		handleContactForm();
		setSelectedContact(null);
	};

	return (
		<div className={styles.container}>
			{contacts.length === 0 ? (
				<p>No contacts found.</p>
			) : (
				<ul>
					{contacts.map((contact) => (
						<ContactListItem
							key={contact.id}
							contact={contact}
							onClick={() => handleContactClick(contact)}
						/>
					))}
				</ul>
			)}

			<button onClick={handleContactFormClick}>Go to form</button>
		</div>
	);
};

export default ContactList;
