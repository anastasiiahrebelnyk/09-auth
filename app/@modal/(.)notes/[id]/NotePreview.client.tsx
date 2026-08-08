'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api/clientApi';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  //   const [isEdit, setIsEdit] = useState<boolean>(false);

  const noteQ = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  //   const toggleEdit = () => {
  //     setIsEdit(prevIsEdit => !prevIsEdit);
  //   };

  //   const [isModalOpen, setIsModalOpen] = useState(false);

  //   const handleCreate: MouseEventHandler<HTMLButtonElement> = () => {
  //     setIsModalOpen(true);
  //   };
  //   const openModal = isModalOpen(true);
  //   const closeModal = () => setIsModalOpen(false);

  return (
    <Modal onClose={() => router.back()}>
      {noteQ.isLoading && <p>Loading, please wait...</p>}
      {noteQ.isError && <p>Something went wrong.</p>}
      {noteQ.isSuccess && (
        <main className={css.main}>
          <div className={css.container}>
            <div className={css.item}>
              <button className={css.backBtn} onClick={() => router.back()}>
                Back
              </button>
              <div className={css.header}>
                <h2>{noteQ.data?.title}</h2>
              </div>
              <p className={css.tag}>{noteQ.data?.tag}</p>
              <p className={css.content}>{noteQ.data?.content}</p>
              <p className={css.date}>{noteQ.data?.createdAt}</p>
            </div>
          </div>
        </main>
      )}
    </Modal>
  );
}
