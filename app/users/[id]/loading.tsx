export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 animate-pulse">
                <div className="h-4 w-32 bg-muted rounded" />

                <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 space-y-8">
                    <div className="space-y-2">
                        <div className="h-6 w-48 bg-muted rounded" />
                        <div className="h-4 w-32 bg-muted rounded" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="h-3 w-20 bg-muted rounded" />
                            <div className="h-4 w-40 bg-muted rounded" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-3 w-20 bg-muted rounded" />
                            <div className="h-4 w-40 bg-muted rounded" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-3 w-20 bg-muted rounded" />
                            <div className="h-4 w-56 bg-muted rounded" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-muted rounded-xl p-5 space-y-2">
                            <div className="h-4 w-24 bg-background rounded" />
                            <div className="h-4 w-40 bg-background rounded" />
                            <div className="h-3 w-56 bg-background rounded" />
                        </div>

                        <div className="bg-muted rounded-xl p-5 space-y-2">
                            <div className="h-4 w-24 bg-background rounded" />
                            <div className="h-4 w-48 bg-background rounded" />
                            <div className="h-3 w-40 bg-background rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}