import React, { useEffect } from 'react';
import { MantineSize, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Props {
  children: React.ReactNode;
  title: string;
  size: MantineSize;
  openModal: boolean;
  onClose: () => void;
}

const ModalWrapper = ({ children, title, size, openModal, onClose }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (openModal) {
      open();
    } else {
      close();
    }
  }, [openModal]);

  const handleClosed = () => {
    onClose();
    close();
  };

  return (
    <Modal opened={opened} onClose={handleClosed} title={title} size={size}>
      {children}
    </Modal>
  );
};

export default ModalWrapper;
