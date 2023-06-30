import React from "react";

export interface Contact {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	country: string;
}

interface ContactListProps {
	contacts: Contact[];
	setSelectedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
	onEditContact: (contact: Contact) => void;
	onDeleteContact: (id: number) => void;
	onViewContact: (contact: Contact) => void;
}

const ContactListItem: React.FC<{ contact: Contact; onClick: () => void }> = ({
	contact,
	onClick,
}) => (
	<li
		key={contact.id}
		onClick={onClick}
		style={{
			display: "flex",
			flexDirection: "column",
			border: "solid 3px white",
			marginBottom: "10px",
		}}
	>
		<div>
			{contact.firstName} {contact.lastName}
		</div>
		<div>{contact.email}</div>
		<div>{contact.country}</div>
	</li>
);

const ContactList: React.FC<ContactListProps> = ({
	contacts,
	setSelectedContact,
	onEditContact,
	onDeleteContact,
	onViewContact,
}) => {
	const handleContactClick = (contact: Contact) => {
		onViewContact(contact);
	};

	return (
		<div style={{ backgroundColor: "blue", color: "white", padding: "10px" }}>
			<h2>Contact List :)</h2>

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
		</div>
	);
};

export default ContactList;
