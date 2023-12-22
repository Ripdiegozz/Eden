'use client'

import { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'deleteServer';
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try { 
      setIsLoading(true);
      const { data } = await axios.delete(`/api/servers/${server?.id}/delete`);

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to delete <span className='text-indigo-500 font-semibold'>{server?.name}</span>? You <span className="text-rose-500">can not</span> undo this action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
            <div className='flex items-center justify-between w-full'>
                <Button
                variant='ghost'
                onClick={() => onClose()}
                disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                variant='primary'
                onClick={() => onClick()}
                disabled={isLoading}
                >
                    Delete
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteServerModal;