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
} from "@/components/ui/sidebar";
import { Nut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { sidebarItems } from "@/constants/sidebar-items";

export function AppSidebar() {
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
    </Sidebar>
  );
}
