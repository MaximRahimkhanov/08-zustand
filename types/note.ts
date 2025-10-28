export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string | null;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}
export interface Tag {
  name: string;
}
