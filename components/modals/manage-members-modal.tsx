'use client';

import { Check, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
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
import { ServerWithMembersWithProfiles } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAvatar } from '@/components/user-avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuPortal,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import { MemberRole } from '@prisma/client';

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className='w-4 h-4 ml-2 text-indigo-500' />,
    "ADMIN": <ShieldAlert className='w-4 h-4 ml-2 text-rose-500' />,
    "MEMBER": null,
}

const ManageMembersModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState<string | null>("");
  const isModalOpen = isOpen && type === 'members';

  const { server } = data as {
    server: ServerWithMembersWithProfiles;
  };

  const handleClose = () => {
    onClose();
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    setLoadingId(memberId);
    try {
        // await changeRole(id, role);
    } catch (error) {
        console.log(error);
    } finally {
        setLoadingId("");
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Manage Members
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            {server?.members?.length} members in this server
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='mt-8 max-h-[420px] pr-6'>
            {server?.members?.map((member) => (
                <div
                    key={member.id}
                    className='flex items-center gap-x-2 mb-6'
                >
                    <UserAvatar src={member.profile.imageUrl} />
                    <div>
                        <div className='flex gap-x-1 items-center justify-left font-bold'>
                            {member.profile.name}
                            {roleIconMap[member.role]}
                        </div>
                        <div className='text-sm text-zinc-500'>
                            {member.profile.email}
                        </div>
                    </div>
                    {server.profileId !== member.profile.id && loadingId !== member.id && (
                        <div className="ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical className="h-4 w-4 text-zinc-500" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side='left'>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger
                                            className="flex items-center"
                                        >
                                            <ShieldQuestion className='w-4 h-4 mr-2' />
                                            <span>Change Role</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>
                                                    <Shield className="h-4 w-4 mr-2" />
                                                    <span>Guest</span>
                                                    {member.role === MemberRole.GUEST && (
                                                        <Check className="h-4 w-4 ml-auto" />
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <ShieldCheck className="h-4 w-4 mr-2" />
                                                    <span>Moderator</span>
                                                    {member.role === MemberRole.MODERATOR && (
                                                        <Check className="h-4 w-4 ml-auto" />
                                                    )}
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Kick 
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                    {
                        loadingId === member.id && (
                            <Loader2 className='loader-spin text-zin-500 ml-auto w-4 h-4' />
                        )
                    }
                </div>
                ))
            }
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ManageMembersModal
