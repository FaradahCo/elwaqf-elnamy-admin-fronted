export type ConsulationFormPayload = {
  questions: Question[];
};

export type Option = {
    id:number,
    title: string;
    order?: number;
};
export type Question = {
    id:number,
    question: string;
    answerType: string;
    canBeSkipped: boolean;
    allowOther: boolean;
    options: Option[];
}