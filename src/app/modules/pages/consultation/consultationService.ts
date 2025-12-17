import AoiService from "@shared/services/api";
import {
  OptionType,
  type ConsulationFormPayload,
  type ConsulationQuestionsResponse,
  type Question,
} from "./model/consultationModel";

export const createUpdateQuestions = async (
  payload: ConsulationFormPayload
) => {
  return AoiService.patch<ConsulationFormPayload, ConsulationFormPayload>(
    `/admin/questions`,
    payload
  );
};
export const deleteQuestion = async (
  payload: { status: boolean },
  id?: number
) => {
  return AoiService.patch<{ status: boolean }, unknown>(
    `admin/questions/${id}/status`,
    payload
  );
};

export const getAllQuestions = async () => {
  return await AoiService.get<ConsulationQuestionsResponse>(`/admin/questions`);
};

export const transformFormValues = (data?: Question[]) => {
  if (!data?.length)
    return [
      {
        text: "",
        type: OptionType.SINGLE,
        is_required: true,
        has_other_option: false,
        order: 1,
        options: [{ order: 1 }],
        is_active: true,
      },
    ];
  return data.filter((question) => question.is_active);
};
