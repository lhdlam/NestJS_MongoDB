import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { MediaModule } from './media/media.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { join } from 'path';

console.log("path", __dirname)
@Module({
  imports: [
    PostModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join('D:\\LeHaiLam_project\\nestjs\\nest_mongo\\NestJS_MongoDB\\src\\templates\\email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    TaskModule,
    UserModule,
    MediaModule,
    // SubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
