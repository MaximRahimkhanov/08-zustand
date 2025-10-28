'use client';

import { deleteNote } from '@/lib/api';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

type NoteListProps = {
  notes: Note[];
};

export function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  const handleDeleteNote = (noteId: string) => {
    mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag || 'Без тегу'}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button onClick={() => handleDeleteNote(note.id)} className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
