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
  problemNo: string;
  title: string;
  userId: UUID;
  username: string;
  usedTime: number;
  usedMemory: number;
  language: Language;
  status: Status;
  createAt: Date;
  judgedAt: Date;
  updatedAt: Date;
}

export interface ISearchOption {
  username?: string;
  problemNo?: string;
  status?: Status;
}
