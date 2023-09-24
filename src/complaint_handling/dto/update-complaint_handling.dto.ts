import { PartialType } from '@nestjs/mapped-types';
import { CreateComplaintHandlingDto } from './create-complaint_handling.dto';

export class UpdateComplaintHandlingDto extends PartialType(CreateComplaintHandlingDto) {}
