'use client';

import Link from 'next/link';

export default function Error() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				<div className="bg-white border rounded-2xl shadow-sm p-8 text-center space-y-6">
					<div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-500 text-xl font-semibold">
						!
					</div>

					<div className="space-y-2">
						<h1 className="text-xl font-semibold">
							Something went wrong
						</h1>
						<p className="text-sm text-muted-foreground">
							We couldn’t load the user details. Please try again.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Link
							href="/users"
							className="px-4 py-2 rounded-lg border hover:bg-muted"
						>
							Back to list
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}