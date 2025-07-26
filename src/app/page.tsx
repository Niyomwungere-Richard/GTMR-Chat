import PrivateRoute from "@/components/auth/PrivateRoute";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Home, User } from "lucide-react";
import CreatePostForm from "@/components/CreatePostForm";
import PostCard from "@/components/PostCard";
import ContentSuggestions from "@/components/ContentSuggestions";
import { mockPosts, mockUsers } from "@/lib/data";

export default function HomePage() {
  const currentUser = mockUsers[0];

  return (
    <PrivateRoute>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{currentUser.name}</h2>
              <p className="text-sm text-muted-foreground">@{currentUser.handle}</p>
              <Button variant="secondary" size="sm" className="mt-4 w-full" asChild>
                <Link href="/profile">View Profile</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2">
              <nav className="flex flex-col space-y-1">
                <Button variant="ghost" className="justify-start gap-2" asChild>
                  <Link href="/"><Home className="w-4 h-4"/> Home</Link>
                </Button>
                <Button variant="ghost" className="justify-start gap-2" asChild>
                  <Link href="/chat"><MessageSquare className="w-4 h-4"/> Messages</Link>
                </Button>
                <Button variant="ghost" className="justify-start gap-2" asChild>
                  <Link href="/profile"><User className="w-4 h-4"/> Profile</Link>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-2 space-y-6">
          <CreatePostForm user={currentUser} />
          <div className="space-y-6">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <ContentSuggestions />
          <Card>
            <CardHeader>
              <CardTitle>Who to follow</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {mockUsers.slice(1, 4).map(user => (
                  <li key={user.id} className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">@{user.handle}</p>
                    </div>
                    <Button size="sm" variant="outline">Follow</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </PrivateRoute>
  );
}
