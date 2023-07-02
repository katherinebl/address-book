import React, { useEffect, useState } from 'react';

import ContactList, { Contact } from './components/ContactList';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

enum View {
	CONTACT_LIST = 'contactList',
	CONTACT_FORM = 'contactForm',
}

const useLocalStorage = (key: string, initialValue: any) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error('Error retrieving data from localStorage:', error);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			console.error('Error storing data in localStorage:', error);
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
};

const App: React.FC = () => {
	const [currentView, setCurrentView] = useState<View>(View.CONTACT_LIST);
	const [contacts, setContacts] = useLocalStorage('contacts', []);
	const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

	const handleContactForm = () => {
		setCurrentView(View.CONTACT_FORM);
		setSelectedContact(null);
	};

	const handleContactAdded = (contact: Contact) => {
		setContacts((prevContacts: Contact[]) => [...prevContacts, contact]);
		setCurrentView(View.CONTACT_LIST);
	};

	const handleContactEdited = (contact: Contact) => {
		const updatedContacts = contacts.map((c: { id: number }) =>
			c.id === contact.id ? contact : c
		);
		setContacts(updatedContacts);
		setCurrentView(View.CONTACT_LIST);
	};

	const handleContactDeleted = (id: number) => {
		const updatedContacts = contacts.filter((contact: { id: number }) => contact.id !== id);
		setContacts(updatedContacts);
		setCurrentView(View.CONTACT_LIST);
	};

	const handleGoBack = () => {
		setCurrentView(View.CONTACT_LIST);
	};

	const handleViewContact = (contact: Contact) => {
		setSelectedContact(contact);
		setCurrentView(View.CONTACT_FORM);
	};

	const handleEditContact = (contact: Contact) => {
		setSelectedContact(contact);
	};

	return (
		<div>
			<Header />
			{currentView === View.CONTACT_LIST && (
				<div>
					<ContactList
						contacts={contacts}
						setSelectedContact={setSelectedContact}
						onEditContact={handleEditContact}
						onDeleteContact={handleContactDeleted}
						onViewContact={handleViewContact}
					/>
					<button onClick={handleContactForm}>Go to contact form</button>
				</div>
			)}
			{currentView === View.CONTACT_FORM && (
				<ContactForm
					onContactAdded={handleContactAdded}
					onContactEdited={handleContactEdited}
					onContactDeleted={handleContactDeleted}
					onGoBack={handleGoBack}
					contacts={contacts}
					selectedContact={selectedContact}
					setSelectedContact={setSelectedContact}
				/>
			)}
			<Footer />
		</div>
	);
};

export default App;
