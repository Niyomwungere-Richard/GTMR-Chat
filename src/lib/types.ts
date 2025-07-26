import { Timestamp } from "firebase/firestore";

export type User = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
};

export type Comment = {
  id: string;
  user: User;
  content: string;
  timestamp: Timestamp;
};

export type Reaction = {
  id: string;
  user: User;
  type: "like" | "love" | "haha" | "wow" | "sad" | "angry";
};

export type Post = {
  id: string;
  user: User;
  content: string;
  imageUrl?: string;
  timestamp: string; // Keeping as string for mock, can be Timestamp for firestore
  comments: Comment[];
  reactions: Reaction[];
};

export type Message = {
  id: string;
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
