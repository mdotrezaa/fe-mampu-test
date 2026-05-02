import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
	}),
	useSearchParams: () => ({
		get: () => null,
	}),
}));


jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
	useSearchParams: () => new URLSearchParams(),
}));