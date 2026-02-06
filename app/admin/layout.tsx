import { Action, AdminNavbar } from "@/components/admin/AdminNavbar";
import { prisma } from "@/lib/prisma";
import { Car, Clock, Mail, MapPin } from "lucide-react";

async function getStats() {
    const [vehicleCount, pendingCount, newsletterCount, branchCount] =
        await Promise.all([
            prisma.car.count(),
            prisma.consultationBooking.count({ where: { status: "PENDING" } }),
            prisma.newsletterEntry.count({ where: { status: "ACTIVE" } }),
            prisma.branch.count(),
        ]);

    return [
        {
            label: "Total Vehicles",
            value: vehicleCount.toString(),
            change: "+12 this month", // Placeholder for specific time query
            color:
                "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300",
            icon: Car,
        },
        {
            label: "Pending Requests",
            value: pendingCount.toString(),
            change: `${pendingCount} pending reviews`,
            color:
                "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
            icon: Clock,
        },
        {
            label: "Newsletter Subscribers",
            value: newsletterCount.toString(),
            change: "+89 this week", // Placeholder
            color:
                "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
            icon: Mail,
        },
        {
            label: "Active Branches",
            value: branchCount.toString(),
            change: "Nugegoda, Matara, Colombo", // Static list as placeholders or fetch names
            color:
                "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
            icon: MapPin,
        },
    ];
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const stats = await getStats();

    return (
        <div className="min-h-screen bg-background">
            <AdminNavbar />
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                {/* Persistent Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition animate-pop-in"
                        // style={{ animationDelay: `${idx * 100}ms` }} // Need client component wrapper for styles or just normal class
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold mb-2">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </div>
                    ))}
                </section>

                {/* Dynamic Page Content */}
                <div className="mt-6">{children}</div>
            </main>
        </div>
    );
}
