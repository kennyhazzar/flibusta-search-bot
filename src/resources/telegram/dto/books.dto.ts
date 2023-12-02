import { AuthorDto } from './author.dto';
import { GenreDto } from './genre.dto';

export class GetBookByIdDto {
  id: number;
  fileSize: number;
  time: Date;
  title: string;
  pages: number;
  year: number;
  archiveName: string;
  language: string;
  authors: AuthorDto[];
  genres: GenreDto[];
}

export class GetBookPayload {
  query: string;
  size: number;
  page: number;
}

export class GetBookByIdPayload {
  id: number;
}
