import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Command, On, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { GetBookByIdDto, GetBookByIdPayload, GetBookPayload } from '../dto';
import { firstValueFrom } from 'rxjs';
import { getAuthorsAsString, getGenresAsString } from '@core/utils';

@Update()
export class MainUpdate {
  constructor(
    @Inject('SEARCH_SERVICE') private readonly searchService: ClientProxy,
  ) {}

  @Command(/b_+/)
  async showMoreAboutBookCommand(ctx: Context) {
    const { text } = ctx.message as Message.TextMessage;

    const [, id] = text.split('b_');

    try {
      const book = await firstValueFrom(
        this.searchService.send<GetBookByIdDto, GetBookByIdPayload>(
          'search-by-id',
          {
            id: +id,
          },
        ),
      );

      ctx.reply(
        `Название: ${book.title}\nСтраниц: ${
          book.pages
        }\nАвторы: ${getAuthorsAsString(
          book.authors,
        )}\nЖанры: ${getGenresAsString(book.genres)}\nГод: ${
          book.year
        }\n\nНазвание архива: ${book.archiveName}`,
      );
    } catch (error) {
      ctx.reply('неизвестная ошибка.');
      console.log(error);
    }
  }

  @On('text')
  async processSearch(ctx: Context) {
    const { text: query } = ctx.message as Message.TextMessage;

    try {
      const books = await firstValueFrom(
        this.searchService.send<Array<GetBookByIdDto>, GetBookPayload>(
          'search-by-title',
          {
            query,
            size: 5,
            page: 1,
          },
        ),
      );

      let message = '';

      for (const { id, archiveName, authors, genres, title } of books) {
        const authorsMessage = getAuthorsAsString(authors);

        const genresMessage = genres.map(({ code }) => `${code}`).join(', ');

        message += `(${id}) ${title}\n\nАвторы: ${authorsMessage}\nЖанры: ${genresMessage}\nАрхив: ${archiveName}\nФайл: ${id}.fb2\n\nПодробнее: /b_${id}\n\n`;
      }

      await ctx.reply(message);

      ctx.reply('ok');
    } catch (error) {
      console.log(error);
      ctx.reply('неизвестная ошибка.');
    }
  }
}
