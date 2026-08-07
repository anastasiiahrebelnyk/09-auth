'use client';

import css from './Notes.client.module.css';
import { fetchNotes } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Link from 'next/link';

interface NoteClientProps {
  tag: string | undefined;
}

export default function NoteClient({ tag }: NoteClientProps) {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
    setCurrentPage(1);
  }, 1000);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['notes', search, tag, currentPage],
    queryFn: () => fetchNotes(currentPage, search, tag),
    placeholderData: prev => prev,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      {isLoading && <p>Loading, please wait...</p>}
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <Link href={'/notes/action/create'}>
          <button className={css.button}>Create note +</button>
        </Link>
      </div>
      {isSuccess && data && <NoteList notes={data.notes} />}
    </div>
  );
}
