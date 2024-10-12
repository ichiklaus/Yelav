import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { motion } from 'framer-motion';

export default function Social() {
  return (
    <div className='flex gap-4'>
      <motion.a
        whileHover={{
          color: '#B488FF',
        }}
        href='https://www.linkedin.com/in/yelav?locale=en_US'
        target='_blank'
        className='text-2xl'
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </motion.a>
      <motion.a
        whileHover={{
          color: '#B488FF',
        }}
        href='https://github.com/ichiklaus'
        target='_blank'
        className='text-2xl'
      >
        <FontAwesomeIcon icon={faGithub} />
      </motion.a>
      <motion.a
        whileHover={{
          color: '#B488FF',
        }}
        href='https://www.frontendmentor.io/profile/ichiklaus'
        target='_blank'
        className='text-2xl'
      >
        <FontAwesomeIcon icon={faBriefcase} />
      </motion.a>
      <motion.a
        whileHover={{
          color: '#B488FF',
        }}
        href='mailto:nicola1994n@gmail.com'
        target='_blank'
        className='text-2xl'
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </motion.a>
    </div>
  );
}
