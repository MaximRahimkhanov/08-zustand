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
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
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

// export default CreateNote;
// import { useRouter } from 'next/navigation';

// const CreateNote = () => {
//   const router = useRouter();

//   const handleClose = () => {
//     router.push('/notes/filter/all');
//   };

//   return (
//     <main className={css.main}>
//       <div className={css.container}>
//         <h1 className={css.title}>Create note</h1>
//         <NoteForm onClose={handleClose} />
//       </div>
//     </main>
//   );
// };
export default CreateNote;
