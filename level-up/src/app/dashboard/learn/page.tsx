"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface VideoRecommendationsProps {
  sections?: {
    title: string;
    videos: {
      id: string;
      title: string;
      tags: string[];
    }[];
  }[];
}

const defaultSections = [
  {
    title: "Physics Lectures",
    videos: [
      {
        id: "bHIhgxav9LY", // Introduction to Classical Mechanics
        title: "The Essence of Classical Mechanics",
        tags: ["Physics", "Beginner"],
      },
      {
        id: "bHIhgxav9LY", // Introduction to Classical Mechanics
        title: "The Essence of Classical Mechanics",
        tags: ["Physics", "Beginner"],
      },
      {
        id: "bHIhgxav9LY", // Introduction to Classical Mechanics
        title: "The Essence of Classical Mechanics",
        tags: ["Physics", "Beginner"],
      },
      {
        id: "bHIhgxav9LY", // Introduction to Classical Mechanics
        title: "The Essence of Classical Mechanics",
        tags: ["Physics", "Beginner"],
      },
        //   {
        //     id: "yTWO2thyRIY", // Quantum Physics concepts
        //     title: "Exploring Quantum Mechanics",
        //     tags: ["Physics", "Advanced"],
        //   },
    ],
  },
  {
    title: "Programming Tutorials",
    videos: [
      {
        id: "Ke90Tje7VS0", // React tutorial
        title: "Learn React in 10 Minutes",
        tags: ["React", "Frontend"],
      },
      {
        id: "rfscVS0vtbw", // Python crash course
        title: "Python Crash Course for Beginners",
        tags: ["Python", "Backend"],
      },
      {
        id: "Ke90Tje7VS0", // React tutorial
        title: "Learn React in 10 Minutes",
        tags: ["React", "Frontend"],
      },
      {
        id: "rfscVS0vtbw", // Python tutorial
        title: "Python Crash Course for Beginners",
        tags: ["Python", "Backend"],
      },
    ],
  },    

];

export default function VideoRecommendations({
  sections = defaultSections,
}: VideoRecommendationsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!sections || sections.length === 0) {
    return <div className="w-full p-4">No video sections available</div>;
  }

  return (
    <div className="w-full ">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8 space-x-4">
          <h2 className="text-xl font-semibold mb-4 px-4">{section.title}</h2>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg-black/70"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto px-4 scrollbar-hide snap-x snap-mandatory"
            >
              {section.videos.map((video, videoIndex) => (
                <div
                  key={videoIndex}
                  className="flex-none w-[300px] snap-start"
                >
                  <div className="relative aspect-video mb-2">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                    />
                  </div>
                  <h3 className="font-medium line-clamp-2 mb-1">
                    {video.title}
                  </h3>
                  <div className="flex gap-2">
                    {/* {video.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))} */}
                  </div>
                </div>
              ))}
            </div>
            {/* <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button> */}
          </div>
        </div>
      ))}
    </div>
  );
}
