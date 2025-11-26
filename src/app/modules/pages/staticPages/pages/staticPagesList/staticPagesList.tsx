import React, { useState, useCallback, useMemo } from "react";
import { Button, Card } from "antd";
import CustomTable from "@shared/components/customTable/customtable";
import { useApiQuery, useApiMutation } from "@shared/services/api";
import { useQueryClient } from "@tanstack/react-query";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { getStaticPages, deleteStaticPage } from "../../staticPagesService";
import type {
  StaticPageItem,
  StaticPagesListParams,
} from "../../model/staticPagesModel";
import { getStaticPagesListColumns } from "./staticPagesListConfig";
import Confirm from "@shared/components/confirm/confirm";
import { Modal } from "antd";
import { staticPagesRoutePath } from "../../staticPagesRoutes";
import { useNavigate } from "react-router";

// Dummy data for testing
const dummyStaticPages: StaticPageItem[] = [
  {
    id: 1,
    title: "من نحن",
    slug: "about-us",
    status: "active",
    status_label: "نشط",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "سياسة الخصوصية",
    slug: "privacy-policy",
    status: "active",
    status_label: "نشط",
    created_at: "2024-01-16T11:00:00Z",
    updated_at: "2024-01-16T11:00:00Z",
  },
  {
    id: 3,
    title: "شروط الاستخدام",
    slug: "terms-of-service",
    status: "inactive",
    status_label: "غير نشط",
    created_at: "2024-01-17T09:15:00Z",
    updated_at: "2024-01-17T09:15:00Z",
  },
  {
    id: 4,
    title: "اتصل بنا",
    slug: "contact-us",
    status: "active",
    status_label: "نشط",
    created_at: "2024-01-18T14:20:00Z",
    updated_at: "2024-01-18T14:20:00Z",
  },
  {
    id: 5,
    title: "الأسئلة الشائعة",
    slug: "faq",
    status: "active",
    status_label: "نشط",
    created_at: "2024-01-19T16:45:00Z",
    updated_at: "2024-01-19T16:45:00Z",
  },
  {
    id: 6,
    title: "سياسة الإرجاع",
    slug: "return-policy",
    status: "inactive",
    status_label: "غير نشط",
    created_at: "2024-01-20T08:30:00Z",
    updated_at: "2024-01-20T08:30:00Z",
  },
  {
    id: 7,
    title: "دليل المستخدم",
    slug: "user-guide",
    status: "active",
    status_label: "نشط",
    created_at: "2024-01-21T12:00:00Z",
    updated_at: "2024-01-21T12:00:00Z",
  },
  {
    id: 8,
    title: "سياسة الدفع",
    slug: "payment-policy",
    status: "active",
    status_label: "نشط",
    created_at: "2024-01-22T10:15:00Z",
    updated_at: "2024-01-22T10:15:00Z",
  },
];

const dummyPaginationMeta = {
  current_page: 1,
  from: 1,
  last_page: 1,
  total: dummyStaticPages.length,
  per_page: 10,
};

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
    enabled: false,
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
      navigate(
        staticPagesRoutePath.EDIT_PAGE.replace(":id", String(record.id))
      );
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
    console.log("Add page");
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
          dataSource={staticPages?.data ?? dummyStaticPages}
          showSelection={true}
          className={["mt-6"]}
          loading={isLoading}
          paginationMeta={staticPages?.meta ?? dummyPaginationMeta}
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
