"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"

export function ProjectImage({ fallbackSrc = "/placeholder.svg", alt = "Project image", ...props }: ImageProps & { fallbackSrc?: string }) {
    const [imgSrc, setImgSrc] = useState(props.src)

    return (
        <Image
            alt={alt}
            {...props}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc)
            }}
        />
    )
} 