import type { RootState } from "@/app/store";
import {
  clearDeleteItem,
  clearEditItem,
  resetDiscountCodesState,
} from "@/app/store/slices/discountCodesSlice";
import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import CustomTable from "@shared/components/customTable/customtable";
import { useApiMutation, useApiQuery } from "@shared/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Modal } from "antd";
import { useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiscoundCodesForm from "../../components/discoundCodesForm/discoundCodesForm";
import DiscoundCodesFilter from "../../components/discoundCodesFilter/DiscoundCodesFilter";
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

const DiscoundCodesList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Redux state - memoized to prevent unnecessary re-renders
  const discountCodesState = useSelector(
    (state: RootState) => state.discountCodes
  );
  const { editingItem, isEditMode, deleteItem } = useMemo(
    () => discountCodesState,
    [discountCodesState]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<Partial<DiscoundListParams>>({
    page: 1,
    type: "service",
  });

  const { data: discoundCodes, isLoading } = useApiQuery<
    PaginatedResponse<DiscoundCodeItem>
  >(["discound-codes", filter], () => DiscoundCodes(filter), {
    retry: false,
  });

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
        dispatch(resetDiscountCodesState());
        setIsModalOpen(false);

        queryClient.invalidateQueries({ queryKey: ["discound-codes"] });
        // Form will be reset when modal closes and reopens
      },
    }
  );

  const deleteDiscoundCodeMutation = useApiMutation<void, void>(
    () => DeleteDiscoundCode(deleteItem?.id!),
    {
      onSuccess: () => {
        dispatch(clearDeleteItem());
        queryClient.invalidateQueries({ queryKey: ["discound-codes"] });
      },
    }
  );

  const handleFormSubmit = useCallback(
    (values: DiscoundCodeItem) => {
      codeDiscoundMutation.mutate(
        editingItem ? { ...values, id: editingItem.id } : values
      );
    },
    [codeDiscoundMutation]
  );

  const handlePaginationChange = useCallback((page: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page,
    }));
  }, []);

  const handleAddCode = useCallback(() => {
    dispatch(resetDiscountCodesState());
    setIsModalOpen(true);
  }, []);

  const handleFilterChange = useCallback((newFilter: DiscoundListParams) => {
    setFilter(newFilter);
  }, []);

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
            <h1 className="text-xl font-bold text-second-primary">
              اكواد الخصم
            </h1>
            <p className="w-16 h-1 bg-primary mt-2 rounded mb-10"></p>
          </div>
          <Button type="primary" onClick={handleAddCode}>
            إضافة كود
          </Button>
        </main>

        <DiscoundCodesFilter
          onFilterChange={(filter) => handleFilterChange(filter)}
        />

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
