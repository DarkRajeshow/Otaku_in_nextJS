import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import { Contexts } from '../App';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);
  const { loading } = useContext(Contexts);
  const socialIcons = [
    { icon: faFacebook, link: 'https://www.facebook.com' },
    { icon: faGithub, link: 'https://github.com/DarkRajeshow/' },
    { icon: faLinkedin, link: 'https://www.linkedin.com/in/rajesh-adeli-880a89259/' },
  ];

  const iconVariants = {
    hover: { scale: 1.2 },
  };

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
      setShowFooter(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!showFooter || loading) {
    return null;
  }

  return (
    <motion.footer
      className='w-10/12 mx-[8.333%] align-middle flex my-auto bottom-0 justify-between fixed left-0 right-0'
      initial={{
        opacity: 0,
      }}
      exit={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: 'tween',
          duration: 1
        }
      }}
      transition={{
        duration: 1
      }}
    >
      <div className="name mb-10 flex align-middle my-5">
        <h1 className='md:text-3xl text-[16px] font-bold my-auto border-r-4 border-white pr-5'>DarkRajeshow</h1>
      </div>
      <div className="footer-icons text-right my-5">
        {socialIcons.map(({ icon, link }) => (
          <motion.a
            className='md:text-3xl text-[16px] mx-1'
            key={link}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={iconVariants}
          >
            <FontAwesomeIcon icon={icon} />
          </motion.a>
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;
