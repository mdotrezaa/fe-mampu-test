export type User = {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
	};
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
	};
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getUsers(): Promise<User[]> {
	const res = await fetch(`${BASE_URL}/users`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error('Failed to fetch users');
	}

	return res.json();
}

export async function getUser(id: string): Promise<User> {
	const res = await fetch(`${BASE_URL}/users/${id}`, {
		cache: 'no-store',
	});

	if (res.status === 404) {
		throw new Error('Failed to fetch user');
	}

	if (!res.ok) {
		throw new Error('Failed to fetch user');
	}

	const data = await res.json();

	if (!data?.id) {
		throw new Error('User not found');
	}

	return data;
}

export async function getPosts() {
	const res = await fetch(`${BASE_URL}/posts`, { cache: 'no-store' });
	if (!res.ok) throw new Error('Failed to fetch posts');
	return res.json();
}

export async function getTodos() {
	const res = await fetch(`${BASE_URL}/todos`, { cache: 'no-store' });
	if (!res.ok) throw new Error('Failed to fetch todos');
	return res.json();
}