export type CommentType = {
  id: number;
  author: string;
  content: string;
  likes: number;
  replies?: CommentType[];
};

export const mockComments: CommentType[] = [
  {
    id: 1,
    author: 'Jane Doe',
    content: 'Amazing write-up! Looking forward to more.',
    likes: 5,
    replies: [
      {
        id: 2,
        author: 'Mayank Yadav',
        content: 'Thank you so much!',
        likes: 2,
      },
    ],
  },
  {
    id: 3,
    author: 'John Smith',
    content: 'I love the way you explained this.',
    likes: 3,
  },
];
