import { UUID } from './common';

export enum Status {
  ACCEPTED = 'ACCEPTED',
  WRONG_ANSWER = 'WRONG_ANSWER',
  PRESENTATION_ERROR = 'PRESENTATION_ERROR',
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  COMPILE_ERROR = 'COMPILE_ERROR'
}

export enum Language {
  C = 'C',
  CPP = 'CPP'
}

export interface IStatus {
  id: UUID;
  problemId: UUID;
  contestId: UUID | null;
  status: Status;
  usedTime: number;
  usedMemory: number;
  language: Language;
  createAt: Date;
  judgedAt: Date;
  updatedAt: Date;
}

export interface ISearchOption {
  username?: string;
  problemNo?: string;
  status?: Status;
}
