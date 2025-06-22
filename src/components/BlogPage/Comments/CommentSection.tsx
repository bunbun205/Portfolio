import Comment from './Comment';
import { mockComments } from '../../../utils/comment';

const CommentSection = ({ showAll = false }: { showAll?: boolean }) => {
  const commentsToShow = showAll ? mockComments : mockComments.slice(0, 2);

  return (
    <div className="mt-12 space-y-6">
      <h3 className="text-2xl font-semibold">Comments</h3>
      {commentsToShow.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentSection;
