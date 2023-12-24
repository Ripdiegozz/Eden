'use client';

import { Trash, X } from 'lucide-react';
import Image from 'next/image';
import { UploadDropzone } from "@/lib/uploadThing";
import pdfLogo from '/public/Types/pdf.png';
import videoLogo from '/public/Types/vid.png';
import audioLogo from '/public/Types/mp3.png';
import textLogo from '/public/Types/txt.png';

interface FileUploadProps {
    endpoint: "messageFile" | "serverImage";
    value: string;
    onChange: (value: string) => void;
    fileName?: string;
}

const typeMap = {
    images: ["png", "jpeg", "gif", "webp", "svg", "ico"],
    pdf: ["pdf"],
    video: ["mp4"],
    audio: ["mpeg", "ogg", "wav", "mp3"],
    text: ["txt"],
}

const typeIconMap = {
    pdf: pdfLogo,
    video: videoLogo,
    audio: audioLogo,
    text: textLogo
}

export const FileUpload = ({
    endpoint,
    value,
    onChange,
    fileName
}: FileUploadProps) => {
    const fileType = value.split(".").pop();

    if (value && endpoint === "serverImage") {
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
    } else if (
        value &&
        endpoint === "messageFile" &&
        typeMap.images.includes(fileType as string)
    ) {
        console.log("Yes im an image")
        return (
            <div className='relative h-40 w-40'>
                <Image 
                  fill
                  src={value}
                  alt='Image Preview'
                  className='rounded-sm cover'
                />
                <button
                  onClick={() => onChange("")}
                  className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
                  type='button'
                >
                    <X className='z-[99999] h-4 w-4'/>
                </button>
        </div>
        );
    } else if (
        value &&
        endpoint === "messageFile" &&
        typeMap.pdf.includes(fileType as string)
    ) {
        return (
            <div className='relative h-auto w-[80%] mx-auto'>
                <div className='flex items-center justify-center gap-x-2 bg-zinc-100 p-2 border-md'>
                    <Image
                      width={80}
                      height={80}                      
                      src={typeIconMap.pdf}
                      alt='Video Preview'
                    />
                    <a
                        href={value}
                        target='_blank'
                        rel='noreferrer'
                        className='text-center p-1 rounded-sm text-blue-500'
                    >
                        {value}
                    </a>
                </div>
                <button
                  onClick={() => onChange("")}
                  className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-3 shadow-sm'
                  type='button'
                >
                    <X className='z-[99999] h-4 w-4'/>
                </button>
        </div>
        );
    } else if (
        value &&
        endpoint === "messageFile" &&
        typeMap.video.includes(fileType as string)
    ) {
        return (
            <div className='relative h-auto w-[80%] mx-auto'>
                <div className='flex items-center justify-center gap-x-2 bg-zinc-100 p-2 border-md'>
                    <Image
                      width={80}
                      height={80}                      
                      src={typeIconMap.video}
                      alt='Video Preview'
                    />
                    <a
                        href={value}
                        target='_blank'
                        rel='noreferrer'
                        className='text-center p-1 rounded-sm text-blue-500'
                    >
                        {value}
                    </a>
                </div>
                <button
                  onClick={() => onChange("")}
                  className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-3 shadow-sm'
                  type='button'
                >
                    <Trash className='z-[99999] h-4 w-4'/>
                </button>
        </div>
        );
    } else if (
        value &&
        endpoint === "messageFile" &&
        typeMap.audio.includes(fileType as string)
    ) {
        return (
            <div className='relative h-auto w-[80%] mx-auto'>
                <div className='flex items-center justify-center gap-x-2 bg-zinc-100 p-2 border-md'>
                    <Image
                      width={80}
                      height={80}                      
                      src={typeIconMap.audio}
                      alt='Video Preview'
                    />
                    <a
                        href={value}
                        target='_blank'
                        rel='noreferrer'
                        className='text-center p-1 rounded-sm text-blue-500'
                    >
                        {value}
                    </a>
                </div>
                <button
                  onClick={() => onChange("")}
                  className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-3 shadow-sm'
                  type='button'
                >
                    <Trash className='z-[99999] h-4 w-4'/>
                </button>
        </div>
        );
    } else if (
        value &&
        endpoint === "messageFile" &&
        typeMap.text.includes(fileType as string)
    ) {
        return (
            <div className='relative h-auto w-[80%] mx-auto'>
                <div className='flex items-center justify-center gap-x-2 bg-zinc-100 p-2 border-md'>
                    <Image
                      width={80}
                      height={80}                      
                      src={typeIconMap.text}
                      alt='Video Preview'
                    />
                    <a
                        href={value}
                        target='_blank'
                        rel='noreferrer'
                        className='text-center p-1 rounded-sm text-blue-500'
                    >
                        {value}
                    </a>
                </div>
                <button
                  onClick={() => onChange("")}
                  className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-3 shadow-sm'
                  type='button'
                >
                    <Trash className='z-[99999] h-4 w-4'/>
                </button>
        </div>
        );
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