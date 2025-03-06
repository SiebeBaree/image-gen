"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SettingsIcon, PanelLeft, ImagesIcon, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: ImagesIcon, label: "Gallery", path: "/gallery" },
    { icon: SettingsIcon, label: "Settings", path: "/settings" },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className={cn(
                "bg-card border-border flex h-screen flex-col border-r transition-all duration-300",
                collapsed ? "w-16" : "w-64",
            )}
        >
            <div className="flex items-center justify-between p-4">
                {!collapsed && <h1 className="text-primary text-xl font-bold">Image Gen</h1>}
                <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
                    <PanelLeft className="h-5 w-5" />
                </Button>
            </div>
            <Separator />

            <ScrollArea className="flex-1 px-3">
                <div className="space-y-2 py-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.path}
                            icon={<item.icon />}
                            label={item.label}
                            collapsed={collapsed}
                            path={item.path}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    collapsed: boolean;
    path: string;
}

function NavItem({ icon, label, collapsed, path }: NavItemProps) {
    const pathname = usePathname();
    const isActive = pathname === path;

    return (
        <Button
            variant={isActive ? "secondary" : "ghost"}
            className={cn("w-full", collapsed ? "justify-center" : "justify-start")}
        >
            {icon}
            {!collapsed && <span>{label}</span>}
        </Button>
    );
}
