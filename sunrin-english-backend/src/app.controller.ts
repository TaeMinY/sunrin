import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';

import { ThrottlerBehindProxyGuard } from './throttler-behind-proxy.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(ThrottlerBehindProxyGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
