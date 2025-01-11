"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
}

const StarEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // Constants
  const NUM_STARS = 200;
  const MIN_RADIUS = 3;
  const MAX_RADIUS = 5;
  const MIN_SPEED = 0.2;
  const MAX_SPEED = 1;
  const WIND_VARIATION = 0.1;

  const createStar = useCallback(
    (canvas: HTMLCanvasElement): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS,
      speed: Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED,
      wind: Math.random() * WIND_VARIATION - WIND_VARIATION / 2,
    }),
    []
  );

  const updateCanvasSize = useCallback(() => {
    if (canvasRef.current) {
      const parent = canvasRef.current.parentElement;
      if (parent) {
        setCanvasSize({
          width: parent.offsetWidth,
          height: parent.offsetHeight,
        });
      }
    }
  }, []);

  const initializeStars = useCallback(
    (canvas: HTMLCanvasElement) => {
      starsRef.current = Array.from({ length: NUM_STARS }, () =>
        createStar(canvas)
      );
    },
    [createStar]
  );

  const drawStar = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
      const spikes = 5;
      const outerRadius = radius;
      const innerRadius = radius / 2;
      let rotation = (Math.PI / 2) * 3;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(x, y - outerRadius);

      for (let i = 0; i < spikes; i++) {
        let x1 = x + Math.cos(rotation) * outerRadius;
        let y1 = y + Math.sin(rotation) * outerRadius;
        ctx.lineTo(x1, y1);
        rotation += step;

        let x2 = x + Math.cos(rotation) * innerRadius;
        let y2 = y + Math.sin(rotation) * innerRadius;
        ctx.lineTo(x2, y2);
        rotation += step;
      }

      ctx.lineTo(x, y - outerRadius);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
    },
    []
  );

  const updateAndDrawStars = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Update position
        star.y += star.speed;
        star.x += star.wind;

        // Reset if out of bounds
        if (star.y > canvas.height) {
          star.y = -star.radius;
          star.x = Math.random() * canvas.width;
        }
        if (star.x > canvas.width) {
          star.x = 0;
        } else if (star.x < 0) {
          star.x = canvas.width;
        }

        // Draw star
        drawStar(ctx, star.x, star.y, star.radius);
      });
    },
    [drawStar]
  );

  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      updateAndDrawStars(ctx, canvas);
      animationFrameRef.current = requestAnimationFrame(() =>
        animate(ctx, canvas)
      );
    },
    [updateAndDrawStars]
  );

  useEffect(() => {
    const debouncedResize = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      updateCanvasSize();
    };

    window.addEventListener("resize", debouncedResize);
    updateCanvasSize();

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [updateCanvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Initialize and start animation
    initializeStars(canvas);
    animate(ctx, canvas);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      starsRef.current = [];
    };
  }, [canvasSize, animate, initializeStars]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: 0.8,
        willChange: "transform",
      }}
    />
  );
};

export default StarEffect;