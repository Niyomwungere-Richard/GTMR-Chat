import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { User as FirebaseUser } from "firebase/auth";

type MessageBubbleProps = {
  message: Message;
  currentUser: FirebaseUser;
};

export default function MessageBubble({ message, currentUser }: MessageBubbleProps) {
  const isCurrentUser = message.senderId === currentUser.uid;
  const sender = message.sender;

  return (
    <div
      className={cn(
        "flex items-end gap-3",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      {!isCurrentUser && sender && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={sender.avatar} alt={sender.name} />
          <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
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
