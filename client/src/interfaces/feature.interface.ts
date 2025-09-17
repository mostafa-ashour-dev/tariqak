export interface Feature {
    id: number,
    img: {
        src: string,
        alt: string,
        width?: number | string
    },
    content: {
        title?: string,
        description: string,
        callToAction: {
            link: string,
            text: string
        }
    }
}