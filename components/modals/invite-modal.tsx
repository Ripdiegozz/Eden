'use client'

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { CheckIcon, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import axios from 'axios';

const InviteServerModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === 'invite';
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;


  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
        setIsLoading(true);

        const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);

        onOpen("invite", { server: res.data })
    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Invite People to your server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Eden experiences are always better with friends and coleagues. Invite people to your server to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
            <Label
                className='uppercase text-xs font-bold text-zinc-500 dark:text-secibdary/70'
            >
                Server Invite Link
            </Label>
            <div className="flex items-center mt-2 gap-x-2">
                <Input 
                    className='bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                    disabled={isLoading}
                    value={inviteUrl}
                />
                <Button
                    size="icon"
                    onClick={onCopy}
                    disabled={isLoading}
                    className='transition-colors hover:bg-zinc-600 dark:hover:bg-zinc-400/50'
                >
                    {copied ? <CheckIcon className='h-5 w-5 text-emerald-400' /> : <Copy className='h-5 w-5' />}
                </Button>
            </div>
            <Button
                variant="link"
                size="sm"
                className="text-xs text-zinc-500 mt-4"
                onClick={onNew}
                disabled={isLoading}
            >
                Generate a new link
                <RefreshCw className='h-4 w-4 ml-2' />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InviteServerModal