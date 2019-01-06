export interface Comment {
  commentId: string;
  articleId: string;
  userId: string;
  content: string;
  parentId: string;
  createDate: Date;
}
