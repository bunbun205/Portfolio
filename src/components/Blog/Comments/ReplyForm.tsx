import { useState } from 'react';

const ReplyForm = ({ parentId }: { parentId: number }) => {
  const [reply, setReply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reply to comment', parentId, reply);
    setReply('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-full rounded border p-2 text-sm"
        placeholder="Write a reply..."
        rows={2}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
      >
        Post Reply
      </button>
    </form>
  );
};

export default ReplyForm;
