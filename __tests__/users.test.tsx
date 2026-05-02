import { screen, fireEvent } from '@testing-library/react';
import UsersPage from '@/app/users/page';
import { renderWithClient } from '../test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('@/lib/api', () => ({
	getUsers: jest.fn(),
	getPosts: jest.fn(),
	getTodos: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
	useSearchParams: () => new URLSearchParams(),
}));

const mockUsers = [
	{ id: 1, name: 'John Doe', email: 'john@mail.com' },
];

const mockPosts = [
	{ userId: 1 },
	{ userId: 1 },
];

const mockTodos = [
	{ userId: 1, completed: true },
	{ userId: 1, completed: false },
];

describe('Users Page', () => {
	const api = require('@/lib/api');

	beforeEach(() => {
		api.getUsers.mockResolvedValue(mockUsers);
		api.getPosts.mockResolvedValue(mockPosts);
		api.getTodos.mockResolvedValue(mockTodos);
	});

	it('renders users with activity signals', async () => {
		renderWithClient(<UsersPage />);

		expect(await screen.findByText('John Doe')).toBeInTheDocument();
		expect(await screen.findByText(/Posts: 2/)).toBeInTheDocument();
		expect(await screen.findByText(/Completed: 1/)).toBeInTheDocument();
		expect(await screen.findByText(/Pending: 1/)).toBeInTheDocument();
	});

	it('filters users by search', async () => {
		renderWithClient(<UsersPage />);

		const input = await screen.findByPlaceholderText('Search...');
		fireEvent.change(input, { target: { value: 'john' } });

		expect(await screen.findByText('John Doe')).toBeInTheDocument();
	});

	it('sorts by pending todos', async () => {
		renderWithClient(<UsersPage />);

		const select = await screen.findByDisplayValue('Sort by Name');

		await userEvent.selectOptions(select, 'pending');

		expect(select).toHaveValue('pending');
	});

	it('updates query params on search and sort', async () => {
		const push = jest.fn();

		const nav = require('next/navigation');
		nav.useRouter = () => ({ push });
		nav.useSearchParams = () => new URLSearchParams();

		renderWithClient(<UsersPage />);

		const input = await screen.findByPlaceholderText('Search...');
		await userEvent.type(input, 'john');

		const select = await screen.findByDisplayValue('Sort by Name');
		await userEvent.selectOptions(select, 'posts');

		expect(push).toHaveBeenCalled();
	});

	it('sorts by posts', async () => {
		renderWithClient(<UsersPage />);

		const select = await screen.findByDisplayValue('Sort by Name');

		await userEvent.selectOptions(select, 'posts');

		expect(select).toHaveValue('posts');
	});

	it('shows empty state', async () => {
		api.getUsers.mockResolvedValue([]);

		renderWithClient(<UsersPage />);

		expect(await screen.findByText(/No users found/i)).toBeInTheDocument();
	});

	it('handles error state', async () => {
		api.getUsers.mockRejectedValue(new Error());

		renderWithClient(<UsersPage />);

		expect(await screen.findByText(/Failed to load users/i)).toBeInTheDocument();
	});

	it('navigates to user detail on click', async () => {
		const push = jest.fn();

		const nav = require('next/navigation');
		nav.useRouter = () => ({ push });
		nav.useSearchParams = () => new URLSearchParams();

		renderWithClient(<UsersPage />);

		const userCard = await screen.findByText('John Doe');

		await userEvent.click(userCard);

		expect(push).toHaveBeenCalledWith('/users/1');
	});
});