import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteClient from './Notes.client';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/serverApi';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `NoteHub | Your ${slug} notes`,
    description: `Your ${slug} notes`,
    openGraph: {
      title: `${slug} notes`,
      description: `${slug} notes`,
      url: `https://notehub.com/`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${slug} notes`,
        },
      ],
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tagKey = slug[0] ?? 'all';
  const tag = tagKey === 'all' ? undefined : tagKey;

  const queryClient = new QueryClient();
  const response = await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes(1, undefined, tag),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteClient tag={tag} />
      </HydrationBoundary>
    </>
  );
}
