import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
    }),
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
