import { Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { DiscoundCodeItem } from "../../model/discoundCodesModel";
import {
  setDeleteItem,
  setEditItem,
} from "@/app/store/slices/discountCodesSlice";
import { store } from "@/app/store";
import { getStatusTag } from "@shared/services/sharedService";

export const ColumnsList = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "الكود",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "نسبة الخصم",
    dataIndex: "percentage",
    key: "percentage",
  },
  {
    title: "النوع",
    dataIndex: "type_label",
    key: "type_label",
  },
  {
    title: "عدد مرات الاستخدام",
    dataIndex: "remaining_uses",
    key: "remaining_uses",
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const config = getStatusTag(status);
      return <Tag color={config.color}>{config.text}</Tag>;
    },
  },

  {
    title: "تاريخ الانتهاء",
    dataIndex: "expires_at",
    key: "expires_at",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: (_: any, record: DiscoundCodeItem) => {
      return (
        <>
          <Button
            type="text"
            onClick={() => store.dispatch(setEditItem(record))}
          >
            <EditOutlined />
          </Button>
          <Button
            type="text"
            onClick={() => store.dispatch(setDeleteItem(record))}
          >
            <DeleteOutlined />
          </Button>
        </>
      );
    },
  },
];
