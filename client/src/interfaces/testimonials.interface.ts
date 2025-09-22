export interface Testimonial {
    user: {
        username: string;
        avatar: string;
        role: string;
    },
    content: string;
    createdAt: string;
}