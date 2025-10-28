import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import { fetchNotes } from '@/lib/api';
import { Metadata } from 'next';
const queryClient = new QueryClient();

interface Props {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug ?? [];
  const tag = slug[0] ?? 'all';

  const title = `NoteHub- Filter: ${tag}`;
  const description = `Перегляд нотаток, відфільтрованих за тегом "${tag}".`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `http://localhost:3000/notes/filter/${slug.join('/') || 'all'}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub Filter ${tag}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const tag: Tag | string = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () =>
      fetchNotes({
        searchText: '',
        page: 1,
        ...(tag && tag !== 'All' ? { tag: tag as string } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
