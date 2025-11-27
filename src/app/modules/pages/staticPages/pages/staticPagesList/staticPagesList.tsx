import React, { useState, useCallback, useMemo } from "react";
import { Button, Card } from "antd";
import CustomTable from "@shared/components/customTable/customtable";
import { useApiQuery, useApiMutation } from "@shared/services/api";
import { useQueryClient } from "@tanstack/react-query";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { deleteStaticPage, getStaticPages } from "../../staticPagesService";
import type {
  StaticPageItem,
  StaticPagesListParams,
} from "../../model/staticPagesModel";
import { getStaticPagesListColumns } from "./staticPagesListConfig";
import Confirm from "@shared/components/confirm/confirm";
import { Modal } from "antd";
import { staticPagesRoutePath } from "../../staticPagesRoutes";
import { useNavigate } from "react-router";

const StaticPagesList: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<StaticPagesListParams>({
    page: 1,
    per_page: 10,
  });

  const [deleteItem, setDeleteItem] = useState<StaticPageItem | null>(null);

  const { data: staticPages, isLoading } = useApiQuery<
    PaginatedResponse<StaticPageItem>
  >(["static-pages", filter], () => getStaticPages(filter), {
    retry: false,
    enabled: !!filter,
  });

  const deleteStaticPageMutation = useApiMutation<void, void>(
    () => deleteStaticPage(deleteItem?.id!),
    {
      onSuccess: () => {
        setDeleteItem(null);
        queryClient.invalidateQueries({ queryKey: ["static-pages"] });
      },
    }
  );

  const handleEdit = useCallback(
    (record: StaticPageItem) => {
      navigate(staticPagesRoutePath.EDIT_PAGE(record.id as number));
    },
    [navigate]
  );

  const handleDelete = useCallback((record: StaticPageItem) => {
    setDeleteItem(record);
  }, []);

  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        page,
        per_page: pageSize,
      }));
    },
    []
  );

  const columns = useMemo(
    () =>
      getStaticPagesListColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [handleEdit, handleDelete]
  );

  const handleAddPage = useCallback(() => {
    navigate(staticPagesRoutePath.NEW_PAGE);
  }, []);

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
