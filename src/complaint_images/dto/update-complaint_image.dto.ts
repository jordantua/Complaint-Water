import { PartialType } from '@nestjs/mapped-types';
import { CreateComplaintImageDto } from './create-complaint_image.dto';

export class UpdateComplaintImageDto extends PartialType(CreateComplaintImageDto) {}
