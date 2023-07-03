import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ContactList, { Contact, ContactListProps } from './ContactList';

const mockContacts: Contact[] = [
	{
		id: '1',
		firstName: 'John',
		lastName: 'Doe',
		email: 'john@example.com',
		country: 'USA',
	},
	{
		id: '2',
		firstName: 'Jane',
		lastName: 'Smith',
		email: 'jane@example.com',
		country: 'Canada',
	},
];

const mockProps: ContactListProps = {
	contacts: mockContacts,
	setSelectedContact: jest.fn(),
	onViewContact: jest.fn(),
	handleContactForm: jest.fn(),
};

describe('ContactList', () => {
	test('renders the list of contacts', () => {
		render(<ContactList {...mockProps} />);
		const contactListItems = screen.getAllByRole('listitem');
		expect(contactListItems).toHaveLength(mockContacts.length);
	});

	test('calls onViewContact when a contact is clicked', () => {
		render(<ContactList {...mockProps} />);
		const contactListItem = screen.getByText('John Doe');
		fireEvent.click(contactListItem);
		expect(mockProps.onViewContact).toHaveBeenCalledTimes(1);
		expect(mockProps.onViewContact).toHaveBeenCalledWith(mockContacts[0]);
	});

	test('calls handleContactForm when "Go to form" button is clicked', () => {
		render(<ContactList {...mockProps} />);
		const goToFormButton = screen.getByRole('button', { name: /Go to form/i });
		fireEvent.click(goToFormButton);
		expect(mockProps.handleContactForm).toHaveBeenCalledTimes(1);
	});

	test('displays "No contacts found." when contacts array is empty', () => {
		const emptyProps: ContactListProps = {
			contacts: [],
			setSelectedContact: jest.fn(),
			onViewContact: jest.fn(),
			handleContactForm: jest.fn(),
		};
		render(<ContactList {...emptyProps} />);
		const noContactsText = screen.getByText('No contacts found.');
		expect(noContactsText).toBeInTheDocument();
	});
});
