"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"

export function ProjectImage({ fallbackSrc = "/placeholder.svg", ...props }: ImageProps & { fallbackSrc?: string }) {
    const [imgSrc, setImgSrc] = useState(props.src)

    return (
        <Image
            {...props}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc)
            }}
        />
    )
} 