import 'dotenv/config';
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, MongooseModule.forRoot(process.env.MONGODB_URI)],
})
export class AppModule {}
