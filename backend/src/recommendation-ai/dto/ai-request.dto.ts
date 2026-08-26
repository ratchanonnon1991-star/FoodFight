import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import type { AiJsonObject } from '../types/ai-json.types';

export class RecommendationRequestDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsArray()
  @IsObject({ each: true })
  members: AiJsonObject[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  history?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rerollExclusions?: string[];
}

export class RecommendationSummaryDto {
  @IsString()
  @IsNotEmpty()
  conceptId: string;

  @IsString()
  @IsNotEmpty()
  nameTh: string;
}

export class VoteItemDto {
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @IsString()
  @IsNotEmpty()
  conceptId: string;

  @IsString()
  @IsNotEmpty()
  vote: string;
}

export class InitialVoteRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecommendationSummaryDto)
  recommendations: RecommendationSummaryDto[];

  @IsArray()
  @IsString({ each: true })
  memberIds: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VoteItemDto)
  votes: VoteItemDto[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  rerollCount = 0;
}

export class FinalVoteItemDto {
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @IsString()
  @IsNotEmpty()
  conceptId: string;
}

export class FinalVoteRequestDto {
  @IsArray()
  @IsObject({ each: true })
  candidates: AiJsonObject[];

  @IsArray()
  @IsString({ each: true })
  memberIds: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FinalVoteItemDto)
  votes: FinalVoteItemDto[];
}

export class RestaurantRequestDto {
  @IsObject()
  finalConcept: AiJsonObject;

  @IsObject()
  groupLocation: Record<string, number>;

  @IsArray()
  @IsObject({ each: true })
  normalizedMembers: AiJsonObject[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  radiusKm = 5;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  topK = 5;
}
