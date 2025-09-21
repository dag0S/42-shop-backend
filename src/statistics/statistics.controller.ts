import { Controller, Get, Param } from "@nestjs/common";

import { StatisticsService } from "./statistics.service";
import { JwtAuth } from "src/auth/decorators/jwt-auth.decorator";

@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get("main/:storeId")
  @JwtAuth()
  getMainStatistics(@Param("storeId") storeId: string) {
    return this.statisticsService.getMainStatistics(storeId);
  }

  @Get("middle/:storeId")
  @JwtAuth()
  getMiddleStatistics(@Param("storeId") storeId: string) {
    return this.statisticsService.getMiddleStatistics(storeId);
  }
}
