import { render, screen } from '@testing-library/react';
import Loading from '@/app/users/[id]/loading';

describe('Loading Component', () => {
    it('renders skeleton UI', () => {
        const { container } = render(<Loading />);

        expect(container).toBeInTheDocument();

        const skeletons = container.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBeGreaterThan(0);
    });
});