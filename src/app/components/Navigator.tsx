import React, { useState, useEffect, useRef } from 'react';

interface SectionNavigatorProps {
  sectionIds: string[]; // Array of section IDs
  transitionDuration?: number;
  transitionType?: 'fade' | 'slide' | 'scale' | '3d' | 'blur';
  showNavButtons?: boolean;
}

const Navigator: React.FC<SectionNavigatorProps> = ({
  sectionIds,
  transitionDuration = 200,
  transitionType = 'fade',
  showNavButtons = true,
}) => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const lastScrollYRef = useRef<number>(0);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasSnappedRef = useRef<boolean>(false);

  // Navigate to a specific section
  const navigateToSection = (index: number) => {
    console.log('navigating');
    if (index >= 0 && index < sectionIds.length) {
      // Always allow navigation via buttons, even during transitions
      setIsTransitioning(true);

      const targetSection = document.getElementById(sectionIds[index]);
      if (targetSection) {
        // Apply transition effect before scrolling
        applyTransitionEffect(index);

        // Scroll to the target section
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth',
        });

        setActiveSection(index);

        // If navigating back to home, reset the snap flag
        if (index === 0) {
          hasSnappedRef.current = false;
        }

        // Clear transition state after animation completes
        // if (transitionTimeoutRef.current) {
        //   clearTimeout(transitionTimeoutRef.current);
        // }

        // transitionTimeoutRef.current = setTimeout(() => {
        //   setIsTransitioning(false);
        // }, transitionDuration);
      }
    }
  };

  // Apply transition effect based on selected type
  const applyTransitionEffect = (targetIndex: number) => {
    // Apply different transition effects based on type
    sectionIds.forEach((id, index) => {
      const section = document.getElementById(id);
      if (!section) return;

      // Set base transition property
      section.style.transition = `opacity ${transitionDuration}ms ease-in-out, 
                                 transform ${transitionDuration}ms ease-in-out, 
                                 filter ${transitionDuration}ms ease-in-out`;

      // Is this the target section?
      const isTarget = index === targetIndex;

      // Apply effect based on type
      switch (transitionType) {
        case 'fade':
          section.style.opacity = isTarget ? '1' : '0.5';
          break;

        case 'slide':
          if (isTarget) {
            section.style.transform = 'translateY(0)';
          } else if (index < targetIndex) {
            section.style.transform = 'translateY(-30px)';
          } else {
            section.style.transform = 'translateY(30px)';
          }
          break;

        case 'scale':
          section.style.transform = isTarget ? 'scale(1)' : 'scale(0.95)';
          section.style.opacity = isTarget ? '1' : '0.8';
          break;

        case '3d':
          document.body.style.perspective = '1000px';
          if (isTarget) {
            section.style.transform = 'rotateX(0) translateZ(0)';
          } else if (index < targetIndex) {
            section.style.transform = 'rotateX(-10deg) translateZ(-100px)';
          } else {
            section.style.transform = 'rotateX(10deg) translateZ(-100px)';
          }
          section.style.opacity = isTarget ? '1' : '0.7';
          break;

        case 'blur':
          section.style.filter = isTarget ? 'blur(0)' : 'blur(3px)';
          section.style.opacity = isTarget ? '1' : '0.8';
          break;
      }
    });
  };

  // Reset all section styles
  const resetSectionStyles = () => {
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      // Reset all transformations and effects
      section.style.opacity = '1';
      section.style.transform = 'none';
      section.style.filter = 'none';
    });
  };

  // Use a direct callback with useEffect
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, transitionDuration]);

  // Handle scroll event to detect current section and handle home-to-content snap
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection =
        currentScrollY > lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = currentScrollY;

      // Get visible section
      const viewportMiddle = currentScrollY + window.innerHeight / 2;
      let visibleSectionIndex = 0;

      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (!section) continue;

        // if (i === 0) setIsTransitioning(false);

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
          visibleSectionIndex = i;
          break;
        }
      }

      // Update active section if changed
      if (visibleSectionIndex !== activeSection) {
        setActiveSection(visibleSectionIndex);

        // If we've scrolled back to home, reset the snap flag
        if (visibleSectionIndex === 0) {
          hasSnappedRef.current = false;

          // Also reset all section styles when returning to home
          if (scrollDirection === 'up') {
            resetSectionStyles();
          }
        }
      }

      // Special case: Snap from home to content when scrolling down
      if (
        !isTransitioning &&
        scrollDirection === 'down' &&
        activeSection === 0 &&
        !hasSnappedRef.current
      ) {
        // We're in the home section and haven't snapped yet

        const homeSection = document.getElementById(sectionIds[0]);
        if (!homeSection) return;

        const homeSectionHeight = homeSection.offsetHeight;
        const homeSectionTop = homeSection.offsetTop;
        const scrollProgress =
          (currentScrollY - homeSectionTop) / homeSectionHeight;

        // If we've scrolled more than 20% of home section, snap to content
        if (scrollProgress > 0.2) {
          hasSnappedRef.current = true; // Mark that we've already snapped
          navigateToSection(1); // Navigate to content section (index 1)
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize section styles
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        section.style.transition = `opacity ${transitionDuration}ms ease-in-out, 
                                   transform ${transitionDuration}ms ease-in-out, 
                                   filter ${transitionDuration}ms ease-in-out`;
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [activeSection, isTransitioning, sectionIds, transitionDuration]);

  // Render navigation buttons
  return (
    <div
      className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-50 ${
        !showNavButtons ? 'hidden' : 'visible'
      }`}
    >
      <ul className='flex flex-col gap-4'>
        {sectionIds.map((id, index) => (
          <li key={id}>
            <button
              type='button'
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeSection
                  ? 'bg-accent scale-150'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => navigateToSection(index)}
              aria-label={`Navigate to ${id} section`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigator;
