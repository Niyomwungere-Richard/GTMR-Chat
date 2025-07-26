
"use client";

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
import { MessageSquare, Users, Home, User, Search } from "lucide-react";
import CreatePostForm from "@/components/CreatePostForm";
import PostCard from "@/components/PostCard";
import ContentSuggestions from "@/components/ContentSuggestions";
import { mockUsers } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Post as PostType } from "@/lib/types";
import { getPosts } from "@/lib/firestoreService";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const { currentUser } = useAuth();
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // This is a placeholder until we have real user profiles in Firestore
  const displayUser = mockUsers.find(u => u.id === currentUser?.uid) || mockUsers[0];
  const userPosts = allPosts.filter(p => p.userId === currentUser?.uid);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getPosts((newPosts) => {
      setAllPosts(newPosts);
      setFilteredPosts(newPosts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const results = allPosts.filter(post =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchQuery, allPosts]);


  return (
    <PrivateRoute>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                <AvatarFallback>{displayUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{displayUser.name}</h2>
              <p className="text-sm text-muted-foreground">@{displayUser.handle}</p>
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
          <CreatePostForm user={displayUser} />
          <div className="space-y-6">
            {loading ? (
              <>
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </>
            ) : (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
            {filteredPosts.length === 0 && !loading && (
                <p className="text-center text-muted-foreground">No posts found.</p>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search posts and users..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          <ContentSuggestions 
            userId={currentUser?.uid}
            userPosts={userPosts}
          />
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
