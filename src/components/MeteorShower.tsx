'use client';

import { useState, useEffect } from 'react';

export default function MeteorShower({ count = 8 }: { count?: number }) {
  const [meteors, setMeteors] = useState<Array<{
    id: number;
    top: string;
    left: string;
    speed: string;
    delay: string;
  }>>([]);

  useEffect(() => {
    // 只在客户端生成随机位置
    setMeteors(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 50}%`,
        left: `${50 + Math.random() * 50}%`,
        speed: `${2 + Math.random() * 4}s`,
        delay: `${Math.random() * 6}s`,
      }))
    );
  }, [count]);

  // 服务端渲染时返回空容器
  if (meteors.length === 0) {
    return <div className="meteor-shower" />;
  }

  return (
    <div className="meteor-shower">
      {meteors.map((m) => (
        <div
          key={m.id}
          className="meteor"
          style={{
            top: m.top,
            left: m.left,
            '--speed': m.speed,
            '--delay': m.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
