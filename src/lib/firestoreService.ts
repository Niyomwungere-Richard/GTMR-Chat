import { db } from "./firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import type { Conversation, Message, User, Post } from "./types";
import { mockUsers } from "./data"; // Placeholder for user data

// This is a placeholder function to get user details
// In a real app, you'd fetch this from a 'users' collection in Firestore
const getUserDetails = async (userId: string): Promise<User | null> => {
    // For now, find in mock data
    const user = mockUsers.find(u => u.id === userId);
    if (user) return user;

    // In a real app, you would do this:
    /*
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() } as User;
    }
    */
    return null;
}


export const getUserConversations = (
  userId: string,
  callback: (conversations: Conversation[]) => void
) => {
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", userId)
  );

  return onSnapshot(q, async (querySnapshot) => {
    const conversations: Conversation[] = [];
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      
      const participantDetails = await Promise.all(
          data.participants.map(id => getUserDetails(id))
      ) as User[];

      conversations.push({
        id: doc.id,
        ...data,
        participantDetails: participantDetails.filter(Boolean),
        lastMessage: data.lastMessage || null,
      } as Conversation);
    }
    callback(conversations);
  });
};

export const getMessages = (
    conversationId: string,
    callback: (messages: Message[]) => void
) => {
    const q = query(collection(db, "conversations", conversationId, "messages"), orderBy("timestamp", "asc"));

    return onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Message));
        callback(messages);
    });
}

export const sendMessage = async (conversationId: string, senderId: string, content: string) => {
    const messagesCollection = collection(db, "conversations", conversationId, "messages");
    await addDoc(messagesCollection, {
        senderId,
        content,
        timestamp: serverTimestamp()
    });
}

export const createPost = async (userId: string, content: string, imageUrl?: string) => {
    const postsCollection = collection(db, "posts");
    await addDoc(postsCollection, {
        userId,
        content,
        imageUrl: imageUrl || null,
        timestamp: serverTimestamp(),
        comments: [],
        reactions: []
    });
};

export const getPosts = (callback: (posts: Post[]) => void) => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    return onSnapshot(q, async (querySnapshot) => {
        const posts: Post[] = [];
        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const user = await getUserDetails(data.userId);

            if (user) {
                posts.push({
                    id: doc.id,
                    ...data,
                    user: user,
                    timestamp: data.timestamp,
                    // These would be populated from subcollections in a real app
                    comments: [], 
                    reactions: []
                } as Post);
            }
        }
        callback(posts);
    });
}
