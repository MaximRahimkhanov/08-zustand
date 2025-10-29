'use client';

import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import { NoteList } from '@/components/NoteList/NoteList';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import { Tag } from '@/types/note';
import css from './Note.module.css';
import Link from 'next/link';

interface NotesClientProps {
  tag: Tag | string;
}
export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const normalizedTag = typeof tag === 'string' ? tag : tag.name;

  const { data } = useQuery({
    queryKey: ['notes', { searchText, currentPage, normalizedTag }],
    queryFn: () => fetchNotes({ searchText, page: currentPage, tag: normalizedTag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
    setCurrentPage(1);
    setSearchText(newQuery);
  }, 300);
  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <main>
        <section>
          <header className={css.toolbar}>
            <SearchBox onSearch={changeSearchQuery} />
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
            <Link href="/notes/action/create">
              <button className={css.button}>Create note +</button>
            </Link>
          </header>

          {notes.length > 0 && <NoteList notes={notes} />}
        </section>
      </main>
    </div>
  );
}
