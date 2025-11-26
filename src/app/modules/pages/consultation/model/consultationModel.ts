export type ConsulationFormPayload = {
  questions: Question[];
};
export type ConsulationQuestionsResponse = {
  data:Question[];
  links:{
    first?:string;
    last?:string;
    prev?:string;
    next?:string;
  }
  meta:{
    current_page?:number;
    from?:number;
    last_page?:number;
    path?:string;
    per_page?:number;
    to?:number;
    total?:number;
    links?:{
      active?:boolean;
      url?:string;
      label?:string;
    }
  }
}

export type Option = {
    id?:number;
    option_text?: string;
    order?: number;
    question_id?:number;
    created_at?:string;
    updated_at?:string;

};
export type Question = {
    id?:number,
    text?: string;
    type_label?:string;
    type?: string;
    is_required?: boolean;
    is_active?:boolean,
    has_other_option?: boolean;
    order?:number;
    options?: Option[];
    created_at?:string;
    updated_at?:string;
}

export enum OptionType{
    SINGLE = "single",
    MULTIPLE = "multiple",
    TEXT = "text"
}