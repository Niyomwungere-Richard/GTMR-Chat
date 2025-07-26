
import type { Conversation } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import type { User as FirebaseUser } from "firebase/auth";
import type { User } from "@/lib/types";

type ConversationListProps = {
  conversations: Conversation[];
  currentUser: FirebaseUser;
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string | null;
  appUsers: User[]; // Placeholder for user data
};

function formatTimestamp(timestamp: any) {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ConversationList({ 
    conversations, 
    currentUser, 
    onSelectConversation, 
    selectedConversationId,
    appUsers 
}: ConversationListProps) {
  
  const getOtherParticipant = (conv: Conversation) => {
    const otherId = conv.participants.find(p => p !== currentUser.uid);
    return appUsers.find(u => u.id === otherId);
  }

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Messages</h2>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages" className="pl-9" />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="flex flex-col">
          {conversations.map((conv) => {
            const otherParticipant = getOtherParticipant(conv);
            if (!otherParticipant) return null;

            return (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv)}
                className={cn(
                  "flex items-center gap-3 p-4 text-left hover:bg-secondary/50 transition-colors w-full",
                  conv.id === selectedConversationId && "bg-secondary"
                )}
              >
                <Avatar>
                  <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                  <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <p className="font-semibold truncate">{otherParticipant.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.lastMessage?.content}
                  </p>
                </div>
                <time className="text-xs text-muted-foreground self-start">
                  {formatTimestamp(conv.lastMessage?.timestamp)}
                </time>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
