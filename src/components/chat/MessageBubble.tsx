import { cn } from "@/lib/utils";
import type { Message, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type MessageBubbleProps = {
  message: Message;
  currentUser: User;
};

export default function MessageBubble({ message, currentUser }: MessageBubbleProps) {
  const isCurrentUser = message.sender.id === currentUser.id;

  return (
    <div
      className={cn(
        "flex items-end gap-3",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}
