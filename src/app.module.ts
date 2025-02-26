import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './repository/user.entity';
import { ensureDatabaseExists } from './repository/database-init';
import { UserContact } from './repository/user-contact.entity';
import { UserAddress } from './repository/user-address.entity';
import { AcademicBackground } from './repository/academic-background.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = {
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          user: configService.get<string>('DB_USERNAME', 'dbname'),
          password: configService.get<string>('DB_PASSWORD', 'justaplaceholder'),
          database: configService.get<string>('DB_NAME', 'justaplaceholder'),
        };
        await ensureDatabaseExists(dbConfig);
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [User,UserContact,UserAddress,AcademicBackground],
          synchronize: configService.get<string>('NODE_ENV') !== 'production',
          logging: configService.get<string>('NODE_ENV') !== 'production',
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}