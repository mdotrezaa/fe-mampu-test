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
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error('Failed to fetch users');
	}

	return res.json();
}

export async function getUser(id: string): Promise<User> {
	const res = await fetch(`${BASE_URL}/users/${id}`, {
		next: { revalidate: 60 },
	});

	if (res.status === 404) {
		throw new Error('User not found');
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
	const res = await fetch(`${BASE_URL}/posts`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) throw new Error('Failed to fetch posts');

	return res.json();
}

export async function getTodos() {
	const res = await fetch(`${BASE_URL}/todos`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) throw new Error('Failed to fetch todos');

	return res.json();
}