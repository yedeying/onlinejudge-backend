import { UUID } from './common';

export type IProblemId = UUID;
export type IVolume = number;
export type IProblemOrder = number;
export type IProblemNo = string;

export interface IProblemListItem {
  id: IProblemId;
  no: IProblemNo;
  title: string;
  volume: IVolume;
  number: IProblemOrder;
  tags: string[];
  createAt: Date;
  updatedAt: Date;
}

export interface IProblemPage {
  id: string;
  text: string;
}

export interface IProblem extends IProblemListItem {
  description: string;
  timeLimit: number;
  memoryLimit: number;
  judger: UUID;
  dataSet: UUID;
}
