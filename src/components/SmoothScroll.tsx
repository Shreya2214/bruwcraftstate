import { ReactLenis } from '@studio-freight/react-lenis';

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.2,
    smoothTouch: false, // Disable on touch for native feel
    smooth: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
