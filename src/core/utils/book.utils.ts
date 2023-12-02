import { AuthorDto, GenreDto } from '../../resources/telegram/dto';

export const getAuthorsAsString = (authors: Array<AuthorDto>) =>
  authors
    .map(
      ({ firstName, lastName, middleName }) =>
        `${firstName ? `${firstName} ` : ''}${lastName ? `${lastName} ` : ''}${
          middleName ? `${middleName} ` : ''
        }`,
    )
    .join(', ');

export const getGenresAsString = (genres: Array<GenreDto>) =>
  genres.map(({ description }) => `${description}`).join(', ');
