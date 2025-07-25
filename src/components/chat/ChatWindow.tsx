import type { Conversation, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import { SendHorizonal, Phone, Video } from "lucide-react";

type ChatWindowProps = {
    conversation: Conversation;
    currentUser: User;
};

export default function ChatWindow({ conversation, currentUser }: ChatWindowProps) {
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);

    if (!otherParticipant) {
        return <div className="flex-grow flex items-center justify-center text-muted-foreground">Select a conversation to start chatting.</div>
    }

    return (
        <div className="flex-grow flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                        <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{otherParticipant.name}</p>
                        <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Phone /></Button>
                    <Button variant="ghost" size="icon"><Video /></Button>
                </div>
            </div>
            <ScrollArea className="flex-grow p-4">
                <div className="space-y-6">
                    {conversation.messages.map(msg => (
                        <MessageBubble key={msg.id} message={msg} currentUser={currentUser} />
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <form className="flex items-center gap-2">
                    <Input placeholder="Type a message..." className="flex-grow" />
                    <Button type="submit" size="icon">
                        <SendHorizonal />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}
