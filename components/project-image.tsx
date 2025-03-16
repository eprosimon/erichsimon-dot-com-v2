"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"

export function ProjectImage(props: ImageProps) {
    const [imgSrc, setImgSrc] = useState(props.src)

    return (
        <Image
            {...props}
            src={imgSrc}
            onError={() => {
                setImgSrc("/placeholder.svg")
            }}
        />
    )
} 