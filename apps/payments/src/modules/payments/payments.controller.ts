import { Controller, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateChargeDto } from '@app/payments/modules/payments/dto/create-charge.dto'
import { RefundChargeDto } from '@app/payments/modules/payments/dto/refund-charge.dto'
import { PaymentsService } from '@app/payments/modules/payments/payments.service'

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  createCharge(@Payload() data: CreateChargeDto) {
    return this.paymentsService.createCharge(data)
  }

  @MessagePattern('refund_charge')
  @UsePipes(new ValidationPipe())
  refundCharge(@Payload() data: RefundChargeDto) {
    return this.paymentsService.refundCharge(data)
  }
}
