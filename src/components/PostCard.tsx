import Image from "next/image";
import type { Post } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { MessageSquare, ThumbsUp, MoreHorizontal, Heart, Smile } from "lucide-react";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.user.name}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <p className="mb-4">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden border">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="object-cover"
              data-ai-hint="social media post"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start gap-4">
        <div className="flex justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            {post.reactions.length > 0 && 
                <>
                    <ThumbsUp className="h-4 w-4 text-primary" />
                    <span>{post.reactions.length}</span>
                </>
            }
          </div>
          <span>
            {post.comments.length > 0 && `${post.comments.length} comments`}
          </span>
        </div>
        <div className="w-full border-t pt-2 grid grid-cols-3 gap-2">
            <Button variant="ghost" className="text-muted-foreground font-semibold">
                <ThumbsUp className="mr-2 h-5 w-5" /> Like
            </Button>
            <Button variant="ghost" className="text-muted-foreground font-semibold">
                <MessageSquare className="mr-2 h-5 w-5" /> Comment
            </Button>
            <Button variant="ghost" className="text-muted-foreground font-semibold">
                <Heart className="mr-2 h-5 w-5" /> Love
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
