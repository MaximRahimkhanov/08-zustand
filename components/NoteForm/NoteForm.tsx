import { addNote } from '@/lib/api';
import type { NewNoteData } from '../../types/note';
// import { Loader } from '../Loader/Loader';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Loader } from '../Loader/Loader';

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const formValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Min 3 simbols').required('Title is required'),
  content: Yup.string().max(500, 'Max 500 simbols'), // .min(10, "Мінімум 10 символів")

  // .required("Content is required"),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
});

export function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newNoteData: NewNoteData) => {
      return await addNote(newNoteData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      onClose();
    },
    onError: (error) => {
      console.error('Помилка при створенні нотатки:', error);
    },
  });

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     mutate({
  //       title: formData.get("title") as string,
  //       content: formData.get("content") as string,
  //       tag: formData.get("tag") as string,
  //     });

  const handleSubmit = (values: NewNoteData, { resetForm }: { resetForm: () => void }) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        onClose();
      },
    });
  };
  return (
    <Formik initialValues={formValues} validationSchema={NoteFormSchema} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            {isPending ? <Loader /> : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
