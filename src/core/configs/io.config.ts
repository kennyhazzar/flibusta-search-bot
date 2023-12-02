import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { RedisConfigs } from '../types';

export const IoConfig: ClientsModuleAsyncOptions = [
  {
    name: 'SEARCH_SERVICE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const { host, port } = configService.get<RedisConfigs>('redis');

      return {
        transport: Transport.REDIS,
        options: {
          host,
          port,
        },
      };
    },
  },
];
