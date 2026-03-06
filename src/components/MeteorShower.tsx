'use client';

export default function MeteorShower({ count = 8 }: { count?: number }) {
  const meteors = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 50}%`,
    left: `${50 + Math.random() * 50}%`,
    speed: `${2 + Math.random() * 4}s`,
    delay: `${Math.random() * 6}s`,
  }));

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
