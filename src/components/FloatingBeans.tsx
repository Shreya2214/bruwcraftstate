const FloatingBeans = () => {
  const beans = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${12 + Math.random() * 8}s`,
    size: 8 + Math.random() * 12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beans.map((bean) => (
        <div
          key={bean.id}
          className="absolute opacity-0"
          style={{
            left: bean.left,
            width: bean.size,
            height: bean.size * 1.4,
            borderRadius: "50%",
            background: "hsl(var(--copper) / 0.15)",
            animation: `bean-float ${bean.duration} ${bean.delay} linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBeans;
