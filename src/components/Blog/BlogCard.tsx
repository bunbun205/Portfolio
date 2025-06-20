type Props = {
  title: string;
  excerpt: string;
  link: string;
  author: string;
  date: string;
};

const BlogCard = ({ title, excerpt, link, author, date }: Props) => (
  <a
    href={link}
    className="block border border-gray-700 dark:border-gray-300 rounded-xl p-4 hover:shadow-md transition bg-light-text dark:bg-dark-text"
  >
    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
      <img src="/light-avatar.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
      <span>{author}</span> • <span>{date}</span>
    </div>
    <h2 className="text-xl font-semibold mb-1 text-dark-text dark:text-light-text">{title}</h2>
    <p className="text-gray-500 text-sm">{excerpt}</p>
  </a>
);

export default BlogCard;
