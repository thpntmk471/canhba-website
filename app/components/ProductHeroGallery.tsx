"use client";

import Image from "next/image";
import { useState } from "react";

const galleryImages = [
    {
        src: "/images/product-main-1.jpg",
        alt: "Bộ bài Canh Ba",
    },
    {
        src: "/images/product-box-1.jpg",
        alt: "Hộp bài Canh Ba",
    },
    {
        src: "/images/product-cards.jpg",
        alt: "Các thẻ bài Canh Ba",
    },
    {
        src: "/images/lu-khach.jpg",
        alt: "Không khí chợ Định Yên",
    },
];

export default function ProductHeroGallery() {
    const [activeImage, setActiveImage] = useState(galleryImages[0]);

    return (
        <div>
            <div className="rounded-[30px] border border-white/10 bg-[#101010] p-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#0b0b0b]">
                    <Image
                        key={activeImage.src}
                        src={activeImage.src}
                        alt={activeImage.alt}
                        fill
                        priority
                        className="object-cover transition duration-500"
                        sizes="(max-width: 1024px) 100vw, 560px"
                    />
                </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
                {galleryImages.map((image) => {
                    const active = activeImage.src === image.src;

                    return (
                        <button
                            key={image.src}
                            type="button"
                            onClick={() => setActiveImage(image)}
                            className={[
                                "relative aspect-square overflow-hidden rounded-2xl border bg-[#151515] transition duration-300",
                                active
                                    ? "border-[#ffae17] ring-2 ring-[#ffae17]/35"
                                    : "border-white/10 hover:border-[#ffae17]/50",
                            ].join(" ")}
                            aria-label={`Xem ảnh ${image.alt}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className={[
                                    "object-cover transition duration-300",
                                    active
                                        ? "scale-105 opacity-100"
                                        : "opacity-75 hover:opacity-100",
                                ].join(" ")}
                                sizes="120px"
                            />

                            {active ? (
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#ffae17]" />
                            ) : null}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}