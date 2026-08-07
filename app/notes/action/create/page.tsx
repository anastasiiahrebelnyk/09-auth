import { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
// import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: 'NoteHub | Create your note',
  description: 'Create your note',
  openGraph: {
    title: `NoteHub | Create your note`,
    description: `Create your note`,
    url: `https://notehub.com/notes/actions/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `A simple and efficient app for creating and organizing your notes.`,
      },
    ],
  },
};

export default function CreateNote() {
  //   const router = useRouter();
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
