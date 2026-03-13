'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface Meteor {
  id: number;
  angle: string;
  distance: string;
  duration: string;
  delay: string;
}

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: string;
  delay: string;
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // 生成流星数据
    setMeteors(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        angle: `${(i * 18) + Math.random() * 10}deg`,
        distance: `${400 + Math.random() * 200}px`,
        duration: `${1.5 + Math.random() * 1}s`,
        delay: `${Math.random() * 0.8}s`,
      }))
    );

    // 生成星星数据
    setStars(
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        duration: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * 2}s`,
      }))
    );

    // 模拟加载进度
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // 最少显示 2.5 秒
    const minDisplayTime = setTimeout(() => {
      if (progress >= 100) {
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minDisplayTime);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [progress]);

  if (!isLoading) return null;

  return (
    <div className="preloader-container">
      {/* 深空背景 */}
      <div className="preloader-space-bg" />

      {/* 星云层 */}
      <div className="preloader-nebula-layer">
        <div className="nebula-cloud nebula-cloud-1" />
        <div className="nebula-cloud nebula-cloud-2" />
        <div className="nebula-cloud nebula-cloud-3" />
        <div className="nebula-cloud nebula-cloud-4" />
      </div>

      {/* 星星 */}
      <div className="preloader-stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* 回溯流星雨 */}
      <div className="preloader-meteors">
        {meteors.map((meteor) => (
          <div
            key={meteor.id}
            className="preloader-meteor"
            style={{
              '--angle': meteor.angle,
              '--distance': meteor.distance,
              '--duration': meteor.duration,
              '--delay': meteor.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 中心 Logo */}
      <div className="preloader-content">
        <div className="preloader-logo-wrapper">
          {/* 粒子环绕效果 */}
          <div className="preloader-particle-ring">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="particle-dot"
                style={{
                  '--angle': `${i * 30}deg`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* 中心能量核心 */}
          <div className="preloader-logo">
            <div className="energy-core">
              <div className="core-ring core-ring-1" />
              <div className="core-ring core-ring-2" />
              <div className="core-ring core-ring-3" />
              <div className="core-center" />
            </div>
          </div>

          <div className="preloader-glow" />
        </div>

        <h1 className="preloader-title">{siteConfig.name}</h1>
        <p className="preloader-subtitle">{siteConfig.description}</p>

        {/* 进度条 */}
        <div className="preloader-progress-container">
          <div
            className="preloader-progress-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="preloader-percentage">{Math.floor(Math.min(progress, 100))}%</div>
      </div>
    </div>
  );
}
