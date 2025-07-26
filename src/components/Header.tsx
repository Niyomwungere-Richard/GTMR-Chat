"use client";

import Link from "next/link";
import { GtmrChatLogo } from "./GtmrChatLogo";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { mockUsers } from "@/lib/data";
import { MessageSquare, Bell, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/lib/authService";
import { useRouter } from "next/navigation";

export default function Header() {
  const { currentUser } = useAuth();
  const router = useRouter();
  // Using mock user for display purposes until user profiles are implemented
  const displayUser = mockUsers[0]; 

  const handleLogout = async () => {
    await logOut();
    router.push('/login');
  };

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <GtmrChatLogo className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">
              GTMR Chat
            </span>
          </Link>

          {currentUser && (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/chat">
                  <MessageSquare />
                  <span className="sr-only">Messages</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Bell />
                <span className="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={displayUser.avatar}
                        alt={currentUser.email || ""}
                      />
                      <AvatarFallback>{currentUser.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {/* Using email as name for now */}
                        {currentUser.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        @{currentUser.email?.split('@')[0]}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
