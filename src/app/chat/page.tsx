import PrivateRoute from "@/components/auth/PrivateRoute";
import { mockUsers, mockConversations } from "@/lib/data";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { Card } from "@/components/ui/card";

export default function ChatPage() {
  const currentUser = mockUsers[0];
  const firstConversation = mockConversations[0];

  return (
    <PrivateRoute>
      <Card className="h-[calc(100vh-10rem)] flex">
          <ConversationList conversations={mockConversations} currentUser={currentUser} />
          <ChatWindow conversation={firstConversation} currentUser={currentUser} />
      </Card>
    </PrivateRoute>
  );
}
