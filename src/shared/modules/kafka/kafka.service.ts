import { Injectable } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      brokers: ['content-viper-13254-us1-kafka.upstash.io:9092'],
      sasl: {
        mechanism: 'scram-sha-256',
        username:
          'Y29udGVudC12aXBlci0xMzI1NCQRxhwKMpZw1gXsMrcPNQp-z-asglPYhLImcmk',
        password: 'MjI3YjM2MWYtM2Y3MS00YmE1LTk3ZjctYjAzZWQ1YWNhYjJj',
      },
      ssl: true,
      logLevel: logLevel.ERROR,
    });
  }

  async sendMessage(topic: string, message: any) {
    const producer = this.kafka.producer();
    await producer.connect();

    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    await producer.disconnect();
  }
}
