
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError, ZodSchema  } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {

        if(error instanceof ZodError) {
            throw new BadRequestException({
                error: fromZodError(error)
            })
        }

        if(error instanceof PrismaClientKnownRequestError) {
            throw new BadRequestException({
                error: error
        })
    }
      throw new BadRequestException('Validation failed');
    }
  }
}
