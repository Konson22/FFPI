export interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    author: string;
    comments: PostComment[];
    comments_count: number;
    allow_comments: boolean;
    allow_sharing: boolean;
    views_count: number;
    likes: number;
    timestamp: string;
}

export interface PostComment {
    id: number;
    content: string;
    reactions_count: number;
    replies_count: number;
    commented_at: string;
}

export interface CreatePostData {
    title: string;
    content: string;
    category: string;
    allow_comments?: boolean;
    allow_sharing?: boolean;
}

export interface UpdatePostData {
    title?: string;
    content?: string;
    category?: string;
    allow_comments?: boolean;
    allow_sharing?: boolean;
}

export interface PostStoreState {
    posts: Post[];
    loading: boolean;
    error: string | null;
    currentPost: Post | null;
}
