import { Button, Tooltip } from "antd";
import type { FormListFieldData } from "antd/es/form";

type ConsultationPanelHeaderProps = {
    index: number;
    remove: (index: number | number[]) => void;
    field: FormListFieldData;
};

const ConsultationPanelHeader = ({ index, remove, field }: ConsultationPanelHeaderProps) => {
    return (
         <div className="flex items-center justify-between gap-2 mb-4">
                        <h3 className="flex items-center gap-3">
                          <span className="text-base font-medium">
                            السؤال
                          </span>
                        </h3>
                        <div className="flex items-center gap-2">
                          <Tooltip placement="right" title="حذف">
                            <Button
                              onClick={() => {
                                remove(field.name);
                              }}
                              // disabled={index === 0}
                              className="rounded-full! border-none! bg-transparent!"
                              icon={
                                <img
                                  src="/images/delete-icon.svg"
                                  alt="delete icon"
                                />
                              }
                            />
                          </Tooltip>
                        </div>
                      </div>
    );
};

export default ConsultationPanelHeader;