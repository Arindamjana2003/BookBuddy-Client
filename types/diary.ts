export interface DiaryNote {
  id: string;
  title: string;
  message?: string;
  entry?: string;
  mood: string;
  tags: string[];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  diaryId: string;
  user: any;
}
