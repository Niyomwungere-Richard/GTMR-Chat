
"use client";

import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { Card } from "@/components/ui/card";
import { Conversation, User } from "@/lib/types";
import { getUserConversations } from "@/lib/firestoreService";
import { mockUsers } from "@/lib/data"; // Using mockUsers for now
import { useIsMobile } from "@/hooks/use-mobile";

export default function ChatPage() {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getUserConversations(currentUser.uid, (convs) => {
        setConversations(convs);
        setLoading(false);
        // Auto-select first conversation on desktop only
        if (!isMobile && !selectedConversation && convs.length > 0) {
            setSelectedConversation(convs[0]);
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser, isMobile, selectedConversation]);
  
  // This is a placeholder until we have real user profiles in Firestore
  const appUsers = mockUsers;

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  }

  const showConversationList = isMobile ? !selectedConversation : true;
  const showChatWindow = isMobile ? !!selectedConversation : true;

  return (
    <PrivateRoute>
      <Card className="h-[calc(100vh-10rem)] flex">
        {showConversationList && (
            <ConversationList
            conversations={conversations}
            currentUser={currentUser!}
            onSelectConversation={handleSelectConversation}
            selectedConversationId={selectedConversation?.id}
            appUsers={appUsers}
            />
        )}
        {showChatWindow && (
            <ChatWindow
            conversation={selectedConversation}
            currentUser={currentUser!}
            appUsers={appUsers}
            onBack={isMobile ? handleBackToList : undefined}
            />
        )}
      </Card>
    </PrivateRoute>
  );
}
