"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import type { User } from "@/lib/types";
import { Image as ImageIcon, Link2, Smile } from "lucide-react";
import { useState } from "react";
import { createPost } from "@/lib/firestoreService";
import { useToast } from "@/hooks/use-toast";

type CreatePostFormProps = {
  user: User;
};

export default function CreatePostForm({ user }: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === "" || !user) return;
    
    setLoading(true);
    try {
      await createPost(user.id, content);
      setContent("");
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to create post. Please try again.",
            variant: "destructive"
        })
    } finally {
        setLoading(false);
    }
  };


  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <form onSubmit={handlePost}>
              <Textarea
                placeholder="What's on your mind?"
                className="w-full bg-secondary border-0 focus-visible:ring-primary mb-2"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={loading}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" type="button" disabled>
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Add image</span>
                  </Button>
                  <Button variant="ghost" size="icon" type="button" disabled>
                    <Link2 className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Add link</span>
                  </Button>
                  <Button variant="ghost" size="icon" type="button" disabled>
                    <Smile className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Add emoji</span>
                  </Button>
                </div>
                <Button type="submit" disabled={loading || content.trim() === ""}>
                  {loading ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
