// import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
// import Modal from '@/components/Modal/Modal';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';
import { fetchNoteById } from '@/lib/api/serverApi';

interface NotePreviewProps {
  params: Promise<{ id: string }>;
  //   openModal: () => void;
  //   onClose: () => void;
}

export default async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  //   const onClose = closeModal();
  return (
    // <Modal onClose={onClose}>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
    // </Modal>
  );
}
