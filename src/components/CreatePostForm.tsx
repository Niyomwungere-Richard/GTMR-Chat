"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import type { User } from "@/lib/types";
import { Image as ImageIcon, Link2, Smile } from "lucide-react";

type CreatePostFormProps = {
  user: User;
};

export default function CreatePostForm({ user }: CreatePostFormProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <form>
              <Textarea
                placeholder="What's on your mind?"
                className="w-full bg-secondary border-0 focus-visible:ring-primary mb-2"
                rows={3}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Add image</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Link2 className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Add link</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Add emoji</span>
                  </Button>
                </div>
                <Button>Post</Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
