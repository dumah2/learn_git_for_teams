export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
    slug: string;
    isPublished: boolean;
    created_at: Date;
    updated_at: Date;
}
