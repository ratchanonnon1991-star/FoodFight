import { VoteAction } from '../../database/generated/prisma/client';
export declare class VoteSubmissionDto {
    recommendationItemId: string;
    vote: VoteAction;
}
export declare class SubmitVotesDto {
    votes: VoteSubmissionDto[];
}
