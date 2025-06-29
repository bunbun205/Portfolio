import React, { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  filename: string;
}

const WORKER_URL = "https://portfolio-backend.mayank69123-5d3.workers.dev";
const API_KEY =
  "5fb10b5369a1a45689f95d6aa1fa97df8e5b59925101f93e6e4b790ec0c6782a";

export default function VideoPlayer({ filename }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | null = null;

    async function fetchVideo() {
      setLoading(true);
      try {
        const response = await fetch(
          `${WORKER_URL}/preview/videos/${filename}`,
          {
            headers: { Authorization: `Bearer ${API_KEY}` },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.statusText}`);
        }

        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);

        if (isMounted) {
          setBlobUrl(objectUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchVideo();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [filename]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        Loading video...
      </div>
    );
  }

  if (!blobUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        Failed to load video.
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-black">
      <video
        ref={videoRef}
        src={blobUrl}
        controls
        controlsList="nodownload"
        autoPlay
        className="w-full h-full object-contain"
      />
    </div>
  );
}
