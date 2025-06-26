import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaHeart, FaFlag } from 'react-icons/fa';
import type { Comment } from '../../../utils/interfaces';
import { postComment, updateComment } from '../../../utils/postComments';

interface Props {
  postId?: string;
  initialComments: Comment[]; // ✅ incoming from Astro
}

const CommentSection = ({ postId = 'fallback', initialComments }: Props) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    localStorage.setItem(`comments-cache-${postId}`, JSON.stringify(initialComments));
  }, [initialComments, postId]);

  const updateLocal = (updated: Comment[]) => {
    setComments(updated);
    localStorage.setItem(`comments-cache-${postId}`, JSON.stringify(updated));
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: uuidv4(),
      user_id: 'guest',
      post_id: postId,
      content: newComment.trim(),
      parent_comment_id: null,
      likes: 0,
      flags: 0,
      created_at: new Date().toISOString(),
    };

    const updated = [comment, ...comments];
    updateLocal(updated);
    setNewComment('');
    await postComment(comment);
  };

  const addReply = async (parentId: string, replyText: string) => {
    const reply: Comment = {
      id: uuidv4(),
      user_id: 'guest',
      post_id: postId,
      content: replyText.trim(),
      parent_comment_id: parentId,
      likes: 0,
      flags: 0,
      created_at: new Date().toISOString(),
    };

    const updated = [reply, ...comments];
    updateLocal(updated);
    await postComment(reply);
  };

  const handleLike = async (commentId: string) => {
    const updated = comments.map((c) => {
      if (c.id === commentId) {
        const likedKey = `liked-${commentId}`;
        const alreadyLiked = localStorage.getItem(likedKey) === 'true';
        localStorage.setItem(likedKey, (!alreadyLiked).toString());

        const likes = alreadyLiked ? c.likes - 1 : c.likes + 1;
        updateComment(commentId, { likes }).catch(console.error);
        return { ...c, likes };
      }
      return c;
    });

    updateLocal(updated);
  };

  const handleFlag = async (commentId: string) => {
    const updated = comments.map((c) => {
      if (c.id === commentId) {
        const flaggedKey = `flagged-${commentId}`;
        const alreadyFlagged = localStorage.getItem(flaggedKey) === 'true';
        localStorage.setItem(flaggedKey, (!alreadyFlagged).toString());

        const flags = alreadyFlagged ? c.flags - 1 : c.flags + 1;
        updateComment(commentId, { flags }).catch(console.error);
        return { ...c, flags };
      }
      return c;
    });

    updateLocal(updated);
  };

  const renderReplies = (parentId: string) =>
    comments
      .filter((c) => c.parent_comment_id === parentId)
      .map((reply) => (
        <div key={reply.id} className="ml-6 mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
          <div className="text-sm text-gray-700 dark:text-gray-300">{reply.content}</div>
          <div className="flex gap-3 text-xs mt-1">
            <button onClick={() => handleLike(reply.id)} className="flex items-center gap-1 text-red-500">
              <FaHeart /> {reply.likes}
            </button>
            <button onClick={() => handleFlag(reply.id)} className="flex items-center gap-1 text-yellow-600">
              <FaFlag /> {reply.flags}
            </button>
          </div>
        </div>
      ));

  const CommentBox = ({ comment }: { comment: Comment }) => {
    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState('');

    return (
      <div className="border-t pt-4 mt-4">
        <div className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</div>
        <div className="flex gap-3 text-xs mt-1">
          <button onClick={() => handleLike(comment.id)} className="flex items-center gap-1 text-red-500">
            <FaHeart /> {comment.likes}
          </button>
          <button onClick={() => handleFlag(comment.id)} className="flex items-center gap-1 text-yellow-600">
            <FaFlag /> {comment.flags}
          </button>
          <button onClick={() => setShowReply(!showReply)} className="text-blue-500">Reply</button>
        </div>
        {showReply && (
          <div className="mt-2 flex gap-2">
            <input
              className="flex-1 p-1 border rounded text-sm"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              onClick={() => {
                if (replyText.trim()) {
                  addReply(comment.id, replyText);
                  setReplyText('');
                  setShowReply(false);
                }
              }}
              className="px-3 py-1 bg-light-accent dark:bg-dark-accent text-white rounded text-sm"
            >
              Send
            </button>
          </div>
        )}
        {renderReplies(comment.id)}
      </div>
    );
  };

  return (
    <section className="mt-10">
      <h3 className="text-lg font-bold mb-2">Comments</h3>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={addComment}
          className="px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded"
        >
          Post
        </button>
      </div>

      {comments
        .filter((c) => c.parent_comment_id === null)
        .map((comment) => (
          <CommentBox key={comment.id} comment={comment} />
        ))}
    </section>
  );
};

export default CommentSection;
