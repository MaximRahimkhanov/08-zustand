// 'use client';

// import { useState } from 'react';
// import css from './Note.module.css';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useDebounce } from 'use-debounce';

// import { fetchNotes } from '@/lib/api';
// import { NoteList } from '@/components/NoteList/NoteList';
// import { SearchBox } from '@/components/SearchBox/SearchBox';
// import { Pagination } from '@/components/Pagination/Pagination';
// import { Modal } from '@/components/Modal/Modal';
// import { NoteForm } from '@/components/NoteForm/NoteForm';
// import { Loader } from '@/components/Loader/Loader';

// function NotesClient() {
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [debouncedSearch] = useDebounce(search, 500);

//   const perPage = 12;
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const { data, isLoading, isFetching } = useQuery({
//     queryKey: ['notes', debouncedSearch, page],
//     queryFn: () =>
//       fetchNotes({
//         searchText: debouncedSearch,
//         page,
//         perPage,
//       }),
//     placeholderData: keepPreviousData,
//   });

//   const handleSearch = (text: string) => {
//     setSearch(text);
//     setPage(1);
//   };

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox onSearch={handleSearch} />

//         {data && data.totalPages > 1 && (
//           <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
//         )}
//         <button onClick={openModal} className={css.button}>
//           Create note +
//         </button>

//         {/* {isLoading || (isFetching && <p>Is Loading...</p>)} */}
//         {/* {isError && <p>Помилка при запиті</p>} */}
//       </header>

//       {isModalOpen && (
//         <Modal onClose={closeModal}>
//           <NoteForm onClose={closeModal} />
//         </Modal>
//       )}

//       {data && <NoteList data={data.notes} />}
//       {isLoading || (isFetching && <Loader />)}
//     </div>
//   );
// }
// export default NotesClient;
'use client';
// import { useState } from 'react';
// import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import { useDebouncedCallback } from 'use-debounce';

// import { fetchNotes } from '@/lib/api';
// import { Tag } from '@/types/note';
// import css from './page.module.css';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import { Modal } from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import { NoteList } from '@/components/NoteList/NoteList';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import { Tag } from '@/types/note';
import css from './Note.module.css';

interface NotesClientProps {
  tag: Tag | string;
}
export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const normalizedTag = typeof tag === 'string' ? tag : tag.name;

  const { data } = useQuery({
    queryKey: ['notes', { searchText, currentPage, tag }],
    queryFn: () => fetchNotes({ searchText, page: currentPage, tag: normalizedTag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const toggleModal = () => setIsModalOpen((prev) => !prev);
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
            <button className={css.button} onClick={toggleModal}>
              Create note +
            </button>
          </header>
          {isModalOpen && (
            <Modal onClose={toggleModal}>
              <NoteForm onClose={toggleModal} />
            </Modal>
          )}
          {notes.length > 0 && <NoteList notes={notes} />}
        </section>
      </main>
    </div>
  );
}
