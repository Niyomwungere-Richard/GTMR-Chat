import type { Conversation, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type ConversationListProps = {
  conversations: Conversation[];
  currentUser: User;
};

export default function ConversationList({ conversations, currentUser }: ConversationListProps) {
  return (
    <div className="w-1/3 border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Messages</h2>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages" className="pl-9" />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="flex flex-col">
          {conversations.map((conv, index) => {
            const otherParticipant = conv.participants.find(p => p.id !== currentUser.id);
            if (!otherParticipant) return null;
            
            const lastMessage = conv.messages[conv.messages.length - 1];

            return (
              <button
                key={conv.id}
                className={cn(
                  "flex items-center gap-3 p-4 text-left hover:bg-secondary/50 transition-colors",
                  index === 0 && "bg-secondary"
                )}
              >
                <Avatar>
                  <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                  <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <p className="font-semibold truncate">{otherParticipant.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {lastMessage?.content}
                  </p>
                </div>
                <time className="text-xs text-muted-foreground self-start">
                  {lastMessage?.timestamp}
                </time>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
