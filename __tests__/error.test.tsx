import { render, screen } from '@testing-library/react';
import Error from '@/app/users/[id]/error';

jest.mock('next/link', () => {
    return ({ children, href }: any) => (
        <a href={href}>{children}</a>
    );
});

describe('Error Component', () => {
    it('renders error message', () => {
        render(<Error />);

        expect(
            screen.getByText(/Something went wrong/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/We couldn’t load the user details/i)
        ).toBeInTheDocument();
    });

    it('renders back link', () => {
        render(<Error />);

        const link = screen.getByText(/Back to list/i);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/users');
    });
});