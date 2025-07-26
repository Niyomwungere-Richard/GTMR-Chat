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

export default function ChatPage() {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getUserConversations(currentUser.uid, (convs) => {
        setConversations(convs);
        setLoading(false);
        if (!selectedConversation && convs.length > 0) {
            setSelectedConversation(convs[0]);
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser, selectedConversation]);
  
  // This is a placeholder until we have real user profiles in Firestore
  const appUsers = mockUsers;

  return (
    <PrivateRoute>
      <Card className="h-[calc(100vh-10rem)] flex">
        <ConversationList
          conversations={conversations}
          currentUser={currentUser!}
          onSelectConversation={setSelectedConversation}
          selectedConversationId={selectedConversation?.id}
          appUsers={appUsers}
        />
        <ChatWindow
          conversation={selectedConversation}
          currentUser={currentUser!}
          appUsers={appUsers}
        />
      </Card>
    </PrivateRoute>
  );
}
