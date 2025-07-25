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
  timestamp: string;
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
  timestamp: string;
  comments: Comment[];
  reactions: Reaction[];
};

export type Message = {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
};
