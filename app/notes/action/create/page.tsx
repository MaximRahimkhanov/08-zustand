import { NoteForm } from '@/components/NoteForm/NoteForm';

import css from './CreateNote.module.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note – NoteHub',
  description: 'Сторінка для створення нової нотатки з вибором категорії та контенту.',
  openGraph: {
    title: 'Create Note – NoteHub',
    description: 'Створіть нову нотатку, виберіть категорію та збережіть її в NoteHub.',
    url: 'http://localhost:3000/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note picture',
      },
    ],
  },
};

const CreateNote = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
