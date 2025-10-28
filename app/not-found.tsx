import { Metadata } from 'next';
import css from './home.module.css';

export const metadata: Metadata = {
  title: 'Сторінку не знайдено – NoteHub',
  description: 'На жаль, такої сторінки не існує. Перевірте адресу або поверніться на головну.',
  metadataBase: new URL('https://notehub.example.com'),
  openGraph: {
    title: 'Сторінку не знайдено – NoteHub',
    description: 'На жаль, такої сторінки не існує. Перевірте адресу або поверніться на головну.',
    url: 'https://notehub.example.com/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404 Preview',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
