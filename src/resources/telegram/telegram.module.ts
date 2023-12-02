import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ClientsModule } from '@nestjs/microservices';
import { IoConfig } from '@core/configs';
import { MainUpdate } from './updates';

@Module({
  imports: [ClientsModule.registerAsync(IoConfig)],
  providers: [TelegramService, MainUpdate],
})
export class TelegramModule {}
