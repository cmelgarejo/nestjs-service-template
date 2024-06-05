import { Module } from "@nestjs/common";

import { ResourceController } from "./api/resource.controller";

@Module({
  controllers: [ResourceController],
})
export class ResourceModule {}
