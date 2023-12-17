'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { UploadDropzone } from "@/lib/uploadThing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
    endpoint: "messageFile" | "serverImage";
    value: string;
    onChange: (value: string) => void;
}

export const FileUpload = ({
    endpoint,
    value,
    onChange
}: FileUploadProps) => {
    const fileType = value.split(".").pop();
    // valid types: "image", "pdf", "video", "audio", "text", "application/x-rar-compressed", "application/zip"
    if (value && fileType !== "pdf" && fileType !== "video" && fileType !== "audio" && fileType !== "text" && fileType !== "application/x-rar-compressed" && fileType !== "application/zip") {
        return (
            <div className='relative h-20 w-20'>
                <Image 
                  fill
                  sizes='80px'
                  src={value}
                  alt='Image Preview'
                  className='rounded-full'
                />
                <button
                  onClick={() => onChange("")}
                  className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
                  type='button'
                >
                    <X className='z-[99999] h-4 w-4'/>
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(err: Error) => {
                console.log(err)
            }}
        />
    )
}