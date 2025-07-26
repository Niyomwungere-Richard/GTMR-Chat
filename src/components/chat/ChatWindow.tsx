
import type { Conversation, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import { SendHorizonal, Phone, Video, ArrowLeft } from "lucide-react";
import type { User as FirebaseUser } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { getMessages, sendMessage } from "@/lib/firestoreService";
import { cn } from "@/lib/utils";

type ChatWindowProps = {
    conversation: Conversation | null;
    currentUser: FirebaseUser;
    appUsers: User[]; // Placeholder
    onBack?: () => void;
};

export default function ChatWindow({ conversation, currentUser, appUsers, onBack }: ChatWindowProps) {
    const [messages, setMessages] = useState(conversation?.messages || []);
    const [newMessage, setNewMessage] = useState("");
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (conversation) {
            const unsubscribe = getMessages(conversation.id, (msgs) => {
                const populatedMessages = msgs.map(m => ({
                    ...m,
                    sender: appUsers.find(u => u.id === m.senderId)
                }))
                setMessages(populatedMessages);
            });
            return () => unsubscribe();
        } else {
            setMessages([]);
        }
    }, [conversation, appUsers]);

    useEffect(() => {
        // Scroll to bottom when messages change
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight });
        }
    }, [messages]);
    
    const containerClasses = cn(
        "flex-grow flex flex-col h-full",
        !conversation && "hidden md:flex" // Hide on mobile if no conversation is selected
    );

    if (!conversation) {
        return (
            <div className={containerClasses}>
                 <div className="flex-grow flex items-center justify-center text-muted-foreground">
                    Select a conversation to start chatting.
                </div>
            </div>
        )
    }

    const otherParticipant = conversation.participantDetails.find(p => p.id !== currentUser.uid);

    if (!otherParticipant) {
        return <div className="flex-grow flex items-center justify-center text-muted-foreground">Conversation details not found.</div>
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === "" || !conversation) return;
        await sendMessage(conversation.id, currentUser.uid, newMessage);
        setNewMessage("");
    };

    return (
        <div className={containerClasses}>
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    {onBack && (
                        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
                            <ArrowLeft />
                        </Button>
                    )}
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
            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef as any}>
                <div className="space-y-6">
                    {messages.map(msg => (
                        <MessageBubble key={msg.id} message={msg} currentUser={currentUser} />
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
                    <Input 
                        placeholder="Type a message..." 
                        className="flex-grow"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" size="icon">
                        <SendHorizonal />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}
