"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
    Menu,
    X,
    User,
    LogOut,
    Sun,
    Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

export function AdminNavbar() {
    const { data: session } = useSession();
    const user = session?.user;
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    // Admin links configuration
    const adminLinks = [
        { title: "Consultation Bookings", href: "/admin/consultations" },
        { title: "Vehicle Management", href: "/admin/vehicles" },
        { title: "Video Reviews", href: "/admin/reviews" },
        { title: "Newsletter", href: "/admin/newsletters" },
        { title: "Branch Inventory", href: "/admin/branches" },
    ];

    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

    return (
        <header className="border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/images/LogoBG_Removed-light.png"
                        alt="Smart AutoHub Logo"
                        width={120}
                        height={60}
                        className="object-contain block dark:hidden"
                        priority
                    />
                    <Image
                        src="/images/LogoBG_Removed-dark1.png"
                        alt="Smart AutoHub Logo"
                        width={120}
                        height={60}
                        className="object-contain hidden dark:block"
                        priority
                    />
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8 ml-3.5 mr-3.5">
                    {adminLinks.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`relative text-foreground font-medium hover:text-primary transition group ${isActive ? "text-primary" : ""
                                    }`}
                            >
                                {item.title}
                                <span
                                    className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-1/2 hover-effect group-hover:left-0 duration-150 ${isActive ? "w-1/2" : ""
                                        }`}
                                />
                                <span
                                    className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-1/2 hover-effect group-hover:right-0 duration-150 ${isActive ? "w-1/2" : ""
                                        }`}
                                />
                            </Link>
                        );
                    })}
                </div>

                {/* MOBILE TOGGLE */}
                <button
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-muted"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>

                {/* DESKTOP AUTH */}
                <div className="hidden md:flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="relative"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 hover:opacity-80 transition relative">
                                    <div className="relative flex items-center justify-center">
                                        {/* RING - Preserved luminance effect */}
                                        <span
                                            className="absolute inset-0 avatar-ring avatar-ring-admin"
                                        />

                                        {/* AVATAR */}
                                        <Avatar className="relative z-10 h-10 w-10 bg-background">
                                            <AvatarImage src={user.image || ""} />
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {getInitials(user.name || "U")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="text-left">
                                        <p className="text-sm font-medium text-foreground">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Admin</p>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive cursor-pointer"
                                    onClick={() => signOut({ callbackUrl: "/login" })}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-card border-t border-border">
                    <div className="px-4 py-4 space-y-4">
                        {adminLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block text-foreground hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}

                        <div className="border-t border-border my-4" />

                        <button
                            className="flex items-center gap-2 text-foreground hover:text-primary py-2 w-full text-left"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" ? (
                                <>
                                    <Sun className="h-4 w-4" />
                                    <span>Light Mode</span>
                                </>
                            ) : (
                                <>
                                    <Moon className="h-4 w-4" />
                                    <span>Dark Mode</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="flex items-center gap-2 text-foreground hover:text-destructive py-2 w-full text-left"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
