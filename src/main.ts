import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import cluster from 'node:cluster';
import * as os from 'os';

async function bootstrap() {
  if (cluster.isMaster) {
    const numCPUs = os.cpus().length - 1; // Number of available parallelism - 1
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    const app = await NestFactory.create(AppModule);

    dotenv.config();

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
  }
}
bootstrap();
