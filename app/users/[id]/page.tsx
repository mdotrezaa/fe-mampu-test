import { getUser } from '@/lib/api';
import Link from 'next/link';

type Props = {
	params: Promise<{ id: string }>;
};

type User = {
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

export async function generateMetadata({ params }: Props) {
	try {
		const { id } = await params;
		const user = await getUser(id);

		return {
			title: `${user.name} | User Details`,
			description: `Details for ${user.name}`,
		};
	} catch {
		return {
			title: 'User Not Found',
		};
	}
}

export default async function UserDetailPage({ params }: Props) {
	const { id } = await params;
	const user: User = await getUser(id);

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
				<div className="flex items-center justify-between">
					<Link href="/" className="text-primary hover:underline">
						← Back to list
					</Link>
				</div>

				<div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
					<div className="bg-primary/10 px-6 md:px-8 py-6">
						<h1 className="text-2xl md:text-3xl font-bold text-primary">
							{user.name}
						</h1>
						<p className="text-sm text-muted-foreground">
							@{user.username}
						</p>
					</div>

					<div className="p-6 md:p-8 space-y-8">
						<div className="grid sm:grid-cols-2 gap-6">
							<Info label="Email" value={user.email} />
							<Info label="Phone" value={user.phone} />

							<div>
								<p className="text-muted-foreground text-sm mb-1">
									Website
								</p>
								<a
									href={`https://${user.website}`}
									className="text-primary hover:underline break-all"
									target="_blank"
								>
									{user.website}
								</a>
							</div>
						</div>

						<div className="grid md:grid-cols-2 gap-6">
							<Section title="Company">
								<p className="font-medium">{user.company.name}</p>
								<p className="text-sm text-muted-foreground italic mt-1">
									"{user.company.catchPhrase}"
								</p>
							</Section>

							<Section title="Address">
								<p>
									{user.address.street}, {user.address.suite}
								</p>
								<p className="text-muted-foreground">
									{user.address.city}, {user.address.zipcode}
								</p>
							</Section>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Info({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-muted-foreground text-sm mb-1">{label}</p>
			<p className="font-medium break-all">{value}</p>
		</div>
	);
}

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="bg-muted rounded-xl p-5 space-y-2">
			<h2 className="font-semibold">{title}</h2>
			<div className="text-sm">{children}</div>
		</div>
	);
}