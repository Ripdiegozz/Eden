"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from '@/components/ui/tooltip'

interface ActionTooltipProps {
    label: string;
    children: React.ReactNode;
    side?: 'top' | 'right' | 'left' | 'bottom';
    align?: 'start' | 'center' | 'end';
}

export const ActionTooltip = ({ label, children, side = 'top', align = 'center' }: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className='font-semibold text-sm capitalize'>
                        {label.toLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}