import { IsUUID } from 'class-validator';

export class SubmitFinalVoteDto {
  @IsUUID()
  recommendationItemId: string;
}
