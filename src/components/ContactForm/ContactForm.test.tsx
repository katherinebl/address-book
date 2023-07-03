import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ContactForm from './ContactForm';

describe('ContactForm', () => {
	test('renders the form', () => {
		const mockProps = {
			onContactAdded: jest.fn(),
			onContactEdited: jest.fn(),
			onContactDeleted: jest.fn(),
			onGoBack: jest.fn(),
			selectedContact: null,
			emailError: false,
			setEmailError: jest.fn(),
		};

		render(<ContactForm contacts={[]} {...mockProps} />);

		expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
	});

	test('calls onContactAdded when "Add Contact" button is clicked', () => {
		const mockProps = {
			onContactAdded: jest.fn(),
			onContactEdited: jest.fn(),
			onContactDeleted: jest.fn(),
			onGoBack: jest.fn(),
			selectedContact: null,
			emailError: false,
			setEmailError: jest.fn(),
		};

		render(<ContactForm contacts={[]} {...mockProps} />);

		const firstNameInput = screen.getByLabelText(/First Name:/i) as HTMLInputElement;
		fireEvent.change(firstNameInput, { target: { value: 'John' } });

		const addButton = screen.getByRole('button', { name: /Add Contact/i }) as HTMLButtonElement;
		fireEvent.click(addButton);

		setTimeout(() => {
			expect(mockProps.onContactAdded).toHaveBeenCalledTimes(1);
			expect(mockProps.onContactAdded).toHaveBeenCalledWith(
				expect.objectContaining({
					firstName: 'John',
				})
			);
		}, 0);
	});

	test('calls onContactEdited when "Update Contact" button is clicked', () => {
		const mockProps = {
			onContactAdded: jest.fn(),
			onContactEdited: jest.fn(),
			onContactDeleted: jest.fn(),
			onGoBack: jest.fn(),
			selectedContact: {
				id: '1',
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				country: 'USA',
			},
			emailError: false,
			setEmailError: jest.fn(),
		};

		render(<ContactForm contacts={[]} {...mockProps} />);

		const firstNameInput = screen.getByLabelText(/First Name:/i) as HTMLInputElement;
		const lastNameInput = screen.getByLabelText(/Last Name:/i) as HTMLInputElement;
		const emailInput = screen.getByLabelText(/Email:/i) as HTMLInputElement;
		const countrySelect = screen.getByLabelText(/Country:/i) as HTMLSelectElement;
		const updateButton = screen.getByRole('button', {
			name: /Update Contact/i,
		}) as HTMLButtonElement;

		fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
		fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
		fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
		fireEvent.change(countrySelect, { target: { value: 'Canada' } });

		fireEvent.click(updateButton);

		expect(mockProps.onContactEdited).toHaveBeenCalledTimes(1);
		expect(mockProps.onContactEdited).toHaveBeenCalledWith({
			id: '1',
			firstName: 'Jane',
			lastName: 'Smith',
			email: 'jane@example.com',
			country: 'Canada',
		});
	});

	test('calls onContactDeleted when "Delete Contact" button is clicked', () => {
		const mockProps = {
			onContactAdded: jest.fn(),
			onContactEdited: jest.fn(),
			onContactDeleted: jest.fn(),
			onGoBack: jest.fn(),
			selectedContact: {
				id: '1',
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				country: 'USA',
			},
			emailError: false,
			setEmailError: jest.fn(),
		};

		render(<ContactForm contacts={[]} {...mockProps} />);

		const deleteButton = screen.getByRole('button', {
			name: /Delete Contact/i,
		}) as HTMLButtonElement;

		fireEvent.click(deleteButton);

		expect(mockProps.onContactDeleted).toHaveBeenCalledTimes(1);
		expect(mockProps.onContactDeleted).toHaveBeenCalledWith('1');
	});

	test('calls onGoBack when "Go Back" button is clicked', () => {
		const mockProps = {
			onContactAdded: jest.fn(),
			onContactEdited: jest.fn(),
			onContactDeleted: jest.fn(),
			onGoBack: jest.fn(),
			selectedContact: null,
			emailError: false,
			setEmailError: jest.fn(),
		};

		render(<ContactForm contacts={[]} {...mockProps} />);

		const goBackButton = screen.getByText(/Go Back/i);

		fireEvent.click(goBackButton);

		expect(mockProps.onGoBack).toHaveBeenCalledTimes(1);
	});
});
