export default function VideoPlayer({ filename }: { filename: string }) {
  return (
    <div className="w-full h-full bg-black text-white flex items-center justify-center">
      Video Player Placeholder: {filename}
    </div>
  );
}
