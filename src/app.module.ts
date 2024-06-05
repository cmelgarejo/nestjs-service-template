import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "@src/core/health/health.module";

import { LoggerModule } from "@shared/logger/logger.module";

import { ResourceModule } from "@contexts/resource/resource.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
    ResourceModule,
  ],
})
export class AppModule {}
