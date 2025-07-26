import { Timestamp } from "firebase/firestore";

export type User = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
};

export type Comment = {
  id: string;
  userId: string;
  user?: User;
  content: string;
  timestamp: Timestamp;
};

export type Reaction = {
  id: string;
  userId: string;
  user?: User;
  type: "like" | "love" | "haha" | "wow" | "sad" | "angry";
};

export type Post = {
  id: string;
  userId: string;
  user: User; // Populated after fetching
  content: string;
  imageUrl?: string;
  timestamp: Timestamp;
  comments: Comment[]; // These would be fetched from a subcollection
  reactions: Reaction[]; // These would be fetched from a subcollection
};

export type Message = {
  id:string;
  senderId: string;
  content: string;
  timestamp: Timestamp;
  sender?: User; // Optional: populated after fetching
};

export type Conversation = {
  id: string;
  participants: string[]; // Array of user IDs
  participantDetails: User[]; // Populated after fetching
  messages: Message[];
  lastMessage: Message | null;
};
