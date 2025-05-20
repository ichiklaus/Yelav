import React from 'react';
import { Modal } from './Modal';
import Image from 'next/image';

type LightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
};

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  alt = 'Image preview',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='xl'
      scrollLock={true}
      closeOnBackdropClick={true}
      scrollable={false}
    >
      <div className='w-full h-full flex justify-center items-center'>
        <Image
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
          src={imageUrl}
          alt={alt}
          className='rounded-xl max-h-[80vh] max-w-full object-contain'
        />
      </div>
    </Modal>
  );
};
