import { Controller, Get } from "@nestjs/common";

@Controller("resource")
export class ResourceController {
  @Get()
  run() {
    return { resource: "ok" };
  }
}
