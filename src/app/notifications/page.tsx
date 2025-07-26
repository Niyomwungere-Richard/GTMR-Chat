
"use client";

import PrivateRoute from "@/components/auth/PrivateRoute";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockNotifications, mockUsers } from "@/lib/data";
import { UserPlus, MessageSquare } from "lucide-react";
import Link from "next/link";


export default function NotificationsPage() {

    // We'll use mock data for now. In a real app, this would be fetched.
    const notifications = mockNotifications;
    const friendSuggestions = mockUsers.slice(2, 5);


  return (
    <PrivateRoute>
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    {notifications.length > 0 ? (
                        <ul className="space-y-4">
                            {notifications.map(notification => (
                                <li key={notification.id} className="flex items-start gap-4 p-3 bg-secondary/50 rounded-lg">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={notification.user.avatar} />
                                        <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="text-sm">
                                            <span className="font-semibold">{notification.user.name}</span>
                                            {` ${notification.content}`}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                                        {notification.link && (
                                            <Button variant="link" size="sm" asChild className="p-0 h-auto mt-1">
                                                <Link href={notification.link}>View Post</Link>
                                            </Button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-muted-foreground">No new notifications.</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Friend Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-4">
                        {friendSuggestions.map(user => (
                        <li key={user.id} className="flex items-center space-x-3">
                            <Avatar className="w-12 h-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">@{user.handle}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm">
                                    <UserPlus className="mr-2 h-4 w-4" /> Follow
                                </Button>
                                <Button size="sm" variant="outline">
                                    <MessageSquare className="mr-2 h-4 w-4" /> Message
                                </Button>
                            </div>
                        </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    </PrivateRoute>
  );
}
