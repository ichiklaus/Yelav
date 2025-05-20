// Fade.tsx
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

type FadeProps = {
  children: React.ReactNode;
  effect?: 'in' | 'out'; // Default: "in"
  direction?: 'TTB' | 'BTT' | 'LTR' | 'RTL'; // Default: "BTT"
  duration?: number; // Default: 0.6
  delay?: number; // Default: 0
  threshold?: number; // Optional: how much of the element should be visible
};

const getVariants = (
  effect: 'in' | 'out',
  direction: 'TTB' | 'BTT' | 'LTR' | 'RTL',
  duration: number,
  delay: number,
) => {
  let x = 0;
  let y = 0;

  switch (direction) {
    case 'TTB':
      y = -40;
      break;
    case 'BTT':
      y = 40;
      break;
    case 'RTL':
      x = -40;
      break;
    case 'LTR':
      x = 40;
      break;
  }

  const hidden =
    effect === 'in' ? { opacity: 0, x, y } : { opacity: 1, x: 0, y: 0 };

  const visible =
    effect === 'in' ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y };

  return {
    hidden,
    visible: {
      ...visible,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };
};

const Fade = ({
  children,
  effect = 'in',
  direction = 'BTT',
  duration = 0.6,
  delay = 0,
  threshold = 0.2,
}: FadeProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  const variants = getVariants(effect, direction, duration, delay);

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Fade;
