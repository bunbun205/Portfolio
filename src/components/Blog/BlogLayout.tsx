import BlogCard from './BlogCard';

const BlogLayout = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <div className="space-y-6">
        <BlogCard
          title="My First Post"
          excerpt="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam unde deleniti minima."
          link="/blog/post"
          author="Mayank Yadav"
          date="June 18, 2025"
        />
      </div>
    </section>
  );
};

export default BlogLayout;
