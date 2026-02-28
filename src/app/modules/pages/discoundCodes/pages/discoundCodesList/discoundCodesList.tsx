import type { RootState } from "@/app/store";
import {
  clearDeleteItem,
  clearEditItem,
  resetDiscountCodesState,
} from "@/app/store/slices/discountCodesSlice";
import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import CustomTable from "@shared/components/customTable/customtable";
import { useApiMutation } from "@shared/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Modal, Select } from "antd";
import { useCallback, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiscoundCodesForm, {
  type DiscoundCodesFormRef,
} from "../../components/discoundCodesForm/discoundCodesForm";
import {
  CreateDiscoundCode,
  DeleteDiscoundCode,
  DiscoundCodes,
  UpdateDiscoundCode,
} from "../../discoundCodes.service";
import type {
  DiscoundCodeItem,
  DiscoundListParams,
} from "../../model/discoundCodesModel";
import { ColumnsList } from "./discoundCodesListConfig";
import Confirm from "@shared/components/confirm/confirm";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { useListHook } from "@/app/hooks/listHook";
import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import { getStatusTag, typeOptions } from "@shared/services/sharedService";
import CustomFilter from "@shared/components/custom-filter/custom-filter";
const STATUS_OPTIONS = [
  { value: "active", label: "مفعل" },
  { value: "inactive", label: "غير مفعل" },
  { value: "scheduled", label: "مجدول" },
  { value: "expired", label: "منتهي الصلاحية" },
  { value: "exhausted", label: "مستنفذ" },
  { value: "canceled", label: "ملغي" },
  { value: "testing", label: "اختبار" },
];
const DiscoundCodesList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const formRef = useRef<DiscoundCodesFormRef>(null);

  // Redux state - memoized to prevent unnecessary re-renders
  const discountCodesState = useSelector(
    (state: RootState) => state.discountCodes,
  );
  const { editingItem, isEditMode, deleteItem } = useMemo(
    () => discountCodesState,
    [discountCodesState],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalCancel = useCallback(() => {
    setIsModalOpen(false);
    dispatch(clearEditItem());
  }, [dispatch]);

  const codeDiscoundMutation = useApiMutation<
    DiscoundCodeItem,
    DiscoundCodeItem
  >(
    editingItem
      ? (data: DiscoundCodeItem) =>
          UpdateDiscoundCode(editingItem?.id!, data).then((res) => res.data)
      : (data: DiscoundCodeItem) => CreateDiscoundCode(data),
    {
      onSuccess: () => {
        formRef.current?.resetForm();
        dispatch(resetDiscountCodesState());
        setIsModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["discound-codes"] });
      },
    },
  );

  const deleteDiscoundCodeMutation = useApiMutation<void, void>(
    () => DeleteDiscoundCode(deleteItem?.id!),
    {
      onSuccess: () => {
        dispatch(clearDeleteItem());
        queryClient.invalidateQueries({ queryKey: ["discound-codes"] });
      },
    },
  );

  const handleFormSubmit = useCallback(
    (values: DiscoundCodeItem) => {
      codeDiscoundMutation.mutate(
        editingItem ? { ...values, id: editingItem.id } : values,
      );
    },
    [codeDiscoundMutation, editingItem],
  );

  const handleAddCode = useCallback(() => {
    dispatch(resetDiscountCodesState());
    setIsModalOpen(true);
  }, []);

  const {
    data: discoundCodes,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<
    PaginatedResponse<DiscoundCodeItem>,
    Partial<DiscoundListParams>
  >({
    queryKey: "discound-codes",
    fetchFn: DiscoundCodes,
    queryOptions: { retry: false },
  });

  const filters = useMemo(
    () => [
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: (
          <>
            {STATUS_OPTIONS?.map((option) => (
              <Select.Option key={option?.value} value={option?.value}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: getStatusTag(option?.value ?? "")?.color,
                    }}
                  />
                  <span>{option?.label}</span>
                </div>
              </Select.Option>
            ))}
          </>
        ),
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر التصنيف",
        label: "التصنيف",
        name: "type",
        options: typeOptions,
      },
    ],
    [],
  );
  return (
    <div className="py-10 ">
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title="أكواد مفعلة"
          icon="/images/elements.svg"
          value={20}
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="أكواد ملفية"
          icon="/images/elements.svg"
          value={28}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>

      <Card className="mt-10!">
        <main className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-primary">اكواد الخصم</h1>
            <p className="w-16 h-1 bg-primary mt-2 rounded mb-10"></p>
          </div>
          <Button type="primary" onClick={handleAddCode}>
            إضافة كود
          </Button>
        </main>

        <CustomFilter filters={filters} onFilterChange={handleFilterChange} />

        <CustomTable<DiscoundCodeItem>
          columns={ColumnsList}
          dataSource={discoundCodes?.data ?? []}
          showSelection={true}
          // onSelectionChange={handleSelectionChange}
          className={["mt-6"]}
          loading={isLoading}
          paginationMeta={discoundCodes?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </Card>

      <Modal
        open={isModalOpen || (isEditMode && !!editingItem)}
        onCancel={handleModalCancel}
        closable={false}
        footer={null}
        width={700}
        title={editingItem ? "تعديل كود الخصم" : "إضافة كود خصم جديد"}
      >
        <DiscoundCodesForm
          ref={formRef}
          onSubmit={handleFormSubmit}
          onCancel={handleModalCancel}
          loading={codeDiscoundMutation.isPending}
        />
      </Modal>

      <Modal
        open={!!deleteItem}
        onCancel={() => dispatch(clearDeleteItem())}
        closable={false}
        footer={null}
        width={400}
        title="حذف كود الخصم"
      >
        <Confirm
          title="حذف كود الخصم"
          description="هل أنت متأكد من حذف كود الخصم؟"
          confirmText="حذف"
          cancelText="إلغاء"
          loading={deleteDiscoundCodeMutation.isPending}
          onConfirm={() => deleteDiscoundCodeMutation.mutate()}
          onCancel={() => dispatch(clearDeleteItem())}
        />
      </Modal>
    </div>
  );
};

export default DiscoundCodesList;
