import React, { useState, useCallback, useMemo } from "react";
import { Button, Card, Modal, Select } from "antd";
import CustomTable from "@shared/components/customTable/customtable";
import { useApiMutation } from "@shared/services/api";
import { useQueryClient } from "@tanstack/react-query";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { deleteStaticPage, getStaticPages } from "../../staticPagesService";
import type {
  StaticPageItem,
  StaticPagesListParams,
} from "../../model/staticPagesModel";
import { getStaticPagesListColumns } from "./staticPagesListConfig";
import Confirm from "@shared/components/confirm/confirm";
import { staticPagesRoutePath } from "../../staticPagesRoutes";
import { useNavigate } from "react-router";
import { useListHook } from "@/app/hooks/listHook";
import CustomFilter, {
  type CustomFilterType,
} from "@shared/components/custom-filter/custom-filter";
import { getStatusTag } from "@shared/services/sharedService";

const STATUS_OPTIONS = [
  { value: "active", label: "مفعل" },
  { value: "inactive", label: "غير مفعل" },
];

const StaticPagesList: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleteItem, setDeleteItem] = useState<StaticPageItem | null>(null);

  const {
    data: staticPages,
    isLoading,
    filter,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<PaginatedResponse<StaticPageItem>, StaticPagesListParams>({
    queryKey: "static-pages",
    fetchFn: getStaticPages,
    queryOptions: { retry: false },
  });

  const deleteStaticPageMutation = useApiMutation<void, void>(
    () => deleteStaticPage(deleteItem?.id!),
    {
      onSuccess: () => {
        setDeleteItem(null);
        queryClient.invalidateQueries({ queryKey: ["static-pages"] });
      },
    },
  );

  const handleEdit = useCallback(
    (record: StaticPageItem) => {
      navigate(staticPagesRoutePath.EDIT_PAGE(record.id as number));
    },
    [navigate],
  );

  const handleDelete = useCallback((record: StaticPageItem) => {
    setDeleteItem(record);
  }, []);

  const columns = useMemo(
    () =>
      getStaticPagesListColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [handleEdit, handleDelete],
  );

  const filters = useMemo(
    () => [
      {
        type: "input" as CustomFilterType,
        placeholder: "ابحث عن عنوان الصفحة",
        label: "عنوان الصفحة",
        name: "title",
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: (
          <>
            {STATUS_OPTIONS.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: getStatusTag(option.value)?.color,
                    }}
                  />
                  <span>{option.label}</span>
                </div>
              </Select.Option>
            ))}
          </>
        ),
      },
    ],
    [],
  );

  const handleAddPage = useCallback(() => {
    navigate(staticPagesRoutePath.NEW_PAGE);
  }, [navigate]);

  return (
    <div className="py-10">
      <Card>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-second-primary">
              الصفحات الثابتة
            </h1>
            <p className="w-16 h-1 bg-primary mt-2 rounded mb-10"></p>
          </div>

          <Button type="primary" onClick={handleAddPage}>
            صفحة جديدة
          </Button>
        </div>

        <CustomFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          initialValues={filter}
        />

        <CustomTable<StaticPageItem>
          columns={columns}
          dataSource={staticPages?.data ?? []}
          showSelection={true}
          className={["mt-6"]}
          loading={isLoading}
          paginationMeta={staticPages?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </Card>

      <Modal
        open={!!deleteItem}
        onCancel={() => setDeleteItem(null)}
        footer={null}
        width={400}
        title="حذف الصفحة"
      >
        <Confirm
          title="حذف الصفحة"
          description="هل أنت متأكد من حذف هذه الصفحة؟"
          confirmText="حذف"
          cancelText="إلغاء"
          loading={deleteStaticPageMutation.isPending}
          onConfirm={() => deleteStaticPageMutation.mutate()}
          onCancel={() => setDeleteItem(null)}
        />
      </Modal>
    </div>
  );
};

export default StaticPagesList;
