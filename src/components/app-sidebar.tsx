"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Nut } from "lucide-react";
import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { sidebarItems } from "@/constants/constants";

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    signOut();

    router.replace("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center p-4 gap-4 rounded-md">
          <div className="flex aspect-square size-10 bg-primary items-center justify-center rounded-full">
            <Nut className="text-primary-foreground size-6" />
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate text-lg font-bold">Acorn</span>
            <span className="text-xs text-muted-foreground">
              Expense Tracker
            </span>
          </div>
        </div>
      </SidebarHeader>
      <Separator className="my-2" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2 "
                    >
                      <item.icon className="text-muted-foreground" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div
                onClick={handleLogout}
                className="gap-3 px-3 py-2 items-center flex hover:cursor-pointer"
              >
                <LogOut className="text-muted-foreground" />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
