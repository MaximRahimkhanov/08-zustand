import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import { fetchNotes } from '@/lib/api';
const queryClient = new QueryClient();

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
