import { useState } from 'react';
import type { CommentType } from '../../../utils/comment';
import ReplyForm from './ReplyForm';

const Comment = ({ comment }: { comment: CommentType }) => {
  const [likes, setLikes] = useState(comment.likes || 0);
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="border border-gray-300 dark:border-gray-700 p-4 rounded space-y-2">
      <p className="text-sm font-semibold">{comment.author}</p>
      <p>{comment.content}</p>
      <div className="flex gap-4 text-sm text-gray-500">
        <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
        <button onClick={() => setShowReplyForm(!showReplyForm)}>💬 Reply</button>
      </div>

      {showReplyForm && <ReplyForm parentId={comment.id} />}

      {comment.replies?.length && (
        <div className="ml-4 mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
