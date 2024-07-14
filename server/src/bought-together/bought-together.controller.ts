import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { BoughtTogetherService } from './bought-together.service';
import { jwtguard } from 'src/auth/guards/JWTguard';
import { adminGuard } from 'src/admin/guards/adminGuard';

@UseGuards(jwtguard, adminGuard)
@Controller('bought-together')
export class BoughtTogetherController {
  constructor(private readonly BTogetherService: BoughtTogetherService) {}

  @Post('get-btogether-by-id/:id')
  async getBtogetherById(@Param('id') btogetherId: number) {
    return await this.BTogetherService.getBtogetherProducts(btogetherId);
  }

  @Post('update-btogether-by-id/:id')
  async updateBtogetherById(
    @Param('id') btogetherId: number,
    @Body() prodIds: number[],
  ) {
    return await this.BTogetherService.updateBtogetherProds(
      btogetherId,
      prodIds,
    );
  }
}
