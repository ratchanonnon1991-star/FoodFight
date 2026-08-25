import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VoteAction } from '../../database/generated/prisma/client';

export class VoteSubmissionDto {
  @IsUUID()
  recommendationItemId: string;

  @IsEnum(VoteAction)
  vote: VoteAction;
}

export class SubmitVotesDto {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => VoteSubmissionDto)
  votes: VoteSubmissionDto[];
}
