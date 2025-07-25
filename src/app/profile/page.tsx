import Image from "next/image";
import { mockPosts, mockUsers } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const currentUser = mockUsers[0];
  const userPosts = mockPosts.filter(
    (post) => post.user.id === currentUser.id
  );

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-48 bg-secondary relative">
          <Image
            src="https://placehold.co/1200x400.png"
            alt="Cover image"
            className="object-cover"
            fill
            data-ai-hint="abstract background"
          />
        </div>
        <CardContent className="p-6 relative">
          <div className="flex items-end gap-6 -mt-20">
            <Avatar className="h-32 w-32 border-4 border-card">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow pb-2">
              <h1 className="text-3xl font-bold">{currentUser.name}</h1>
              <p className="text-muted-foreground">@{currentUser.handle}</p>
            </div>
            <Button>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userPosts.length > 0 ? (
              userPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="text-center text-muted-foreground col-span-2">No posts yet.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">About {currentUser.name}</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>Web developer passionate about creating beautiful and functional user experiences. Fan of React, Next.js, and all things TypeScript.</p>
                 <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={currentUser.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="handle">Username</Label>
                  <Input id="handle" defaultValue={`@${currentUser.handle}`} />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" defaultValue="Web developer passionate about creating beautiful and functional user experiences." />
                </div>
                <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="friends" className="mt-6">
            <p className="text-center text-muted-foreground">Friends list coming soon.</p>
        </TabsContent>
        <TabsContent value="photos" className="mt-6">
            <p className="text-center text-muted-foreground">Photo gallery coming soon.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
