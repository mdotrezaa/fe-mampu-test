import { render, screen } from '@testing-library/react';
import UserDetailPage, { generateMetadata } from '@/app/users/[id]/page';

jest.mock('@/lib/api', () => ({
	getUser: jest.fn(),
	getPosts: jest.fn(),
	getTodos: jest.fn(),
}));

describe('User Detail Page', () => {
	const api = require('@/lib/api');

	const mockUser = {
		id: 1,
		name: 'John Doe',
		username: 'john',
		email: 'john@mail.com',
		phone: '123',
		website: 'test.com',
		company: { name: 'Company', catchPhrase: 'Nice' },
		address: { street: 'Street', suite: 'Apt', city: 'City', zipcode: '123' },
	};

	beforeEach(() => {
		jest.clearAllMocks();

		api.getUser.mockResolvedValue(mockUser);
		api.getPosts.mockResolvedValue([
			{ id: 1, userId: 1, title: 'Post 1', body: 'Body' },
		]);
		api.getTodos.mockResolvedValue([
			{ id: 1, userId: 1, title: 'Todo 1', completed: true },
		]);
	});

	it('renders user details', async () => {
		const page = await UserDetailPage({
			params: Promise.resolve({ id: '1' }),
		});

		render(page);

		expect(await screen.findByText('John Doe')).toBeInTheDocument();
		expect(await screen.findByText('Post 1')).toBeInTheDocument();
		expect(await screen.findByText('Todo 1')).toBeInTheDocument();
	});

	it('handles invalid user', async () => {
		api.getUser.mockRejectedValue(new Error());

		await expect(
			UserDetailPage({
				params: Promise.resolve({ id: '999' }),
			})
		).rejects.toThrow();
	});

	it('generateMetadata returns correct metadata', async () => {
		const result = await generateMetadata({
			params: Promise.resolve({ id: '1' }),
		});

		expect(result).toEqual({
			title: 'John Doe | User Details',
			description: 'Details for John Doe',
		});
	});

	it('generateMetadata handles error', async () => {
		api.getUser.mockRejectedValue(new Error());

		const result = await generateMetadata({
			params: Promise.resolve({ id: '999' }),
		});

		expect(result).toEqual({
			title: 'User Not Found',
		});
	});
});