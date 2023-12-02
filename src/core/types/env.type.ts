export class CommonConfigs {
  port: number;
}

export class DatabaseConfigs {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export class TelegrafConfigs {
  token: string;
}

export class RedisConfigs {
  host: string;
  port: number;
}
