'use client';

import { useId } from 'react';
import css from './NoteForm.module.css';
import type { Tag } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api/clientApi';

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const queryClient = useQueryClient();
  const fieldId = useId();
  const router = useRouter();

  const createNoteM = useMutation({
    mutationFn: createNote,
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
      clearDraft();
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = (formData: FormData) => {
    const title = (formData.get('title') as string).trim();
    const content = (formData.get('content') as string).trim();
    const tag = formData.get('tag') as Tag;

    createNoteM.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={draft.title}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          value={draft.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          onChange={handleChange}
          value={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteM.isPending}
        >
          Create Note
        </button>
      </div>
    </form>
  );
}
