import type { User, Post, Conversation } from './types';

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Johnson",
    handle: "alexj",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    id: "user-2",
    name: "Maria Garcia",
    handle: "mariag",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    id: "user-3",
    name: "Chen Wei",
    handle: "chenw",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    id: "user-4",
    name: "Fatima Al-Fassi",
    handle: "fatima_af",
    avatar: "https://placehold.co/100x100.png",
  },
];

export const mockPosts: Post[] = [
  {
    id: "post-1",
    user: mockUsers[1],
    content: "Just enjoying a beautiful sunset at the beach! 🌅 #sunset #beachlife",
    imageUrl: "https://placehold.co/600x400.png",
    timestamp: "2 hours ago",
    comments: [
      {
        id: "comment-1",
        user: mockUsers[0],
        content: "Wow, that looks amazing!",
        timestamp: "1 hour ago",
      },
    ],
    reactions: [{ id: "reaction-1", user: mockUsers[0], type: "love" }],
  },
  {
    id: "post-2",
    user: mockUsers[2],
    content: "Excited to share my new project built with Next.js and Tailwind CSS. Check it out!",
    timestamp: "5 hours ago",
    comments: [],
    reactions: [{ id: "reaction-2", user: mockUsers[1], type: "like" }],
  },
  {
    id: "post-3",
    user: mockUsers[3],
    content: "Trying out a new recipe for homemade pasta. It was delicious! 🍝",
    imageUrl: "https://placehold.co/600x400.png",
    timestamp: "1 day ago",
    comments: [],
    reactions: [],
  },
];

export const mockConversations: Conversation[] = [
    {
        id: 'conv-1',
        participants: [mockUsers[0], mockUsers[1]],
        messages: [
            { id: 'msg-1', sender: mockUsers[1], content: 'Hey! How are you?', timestamp: '10:00 AM'},
            { id: 'msg-2', sender: mockUsers[0], content: 'Hi Maria! I\'m good, thanks. How about you?', timestamp: '10:01 AM'},
            { id: 'msg-3', sender: mockUsers[1], content: 'Doing great! Just saw your post about the sunset, it was beautiful.', timestamp: '10:02 AM'},
        ]
    },
    {
        id: 'conv-2',
        participants: [mockUsers[0], mockUsers[2]],
        messages: [
            { id: 'msg-4', sender: mockUsers[2], content: 'Hi Alex, I have a question about your project.', timestamp: 'Yesterday'},
            { id: 'msg-5', sender: mockUsers[0], content: 'Sure, Chen. Ask away!', timestamp: 'Yesterday'},
        ]
    },
    {
        id: 'conv-3',
        participants: [mockUsers[0], mockUsers[3]],
        messages: [
            { id: 'msg-6', sender: mockUsers[3], content: 'That pasta looked so good!', timestamp: '2 days ago'},
        ]
    }
]
