import { Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router";
import type { ApprovalRequestItem } from "../home.model";
import { ExportOutlined } from "@ant-design/icons";

const ApprovalRequestsTable = ({ data }: { data: ApprovalRequestItem[] }) => {
  
  const columns: ColumnsType<ApprovalRequestItem> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "الاسم",
      dataIndex: "applicantName",
      key: "applicantName",
        render: (text) => <span className="font-medium text-blue-900">{text}</span>
    },
    {
        title: "الصفة",
        dataIndex: "applicantIdx",
        key: 'applicantIdx', // Using duplicate key for visual match to image
        render: () => "مزود خدمة", // Hardcoded based on image appearance of second column
    },
    {
      title: "نوع الطلب",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "المبلغ",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span>{amount} ر.س</span>,
    },
    {
      title: "وثيقة الدفع",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "تاريخ المعاملة",
      dataIndex: "date",
      key: "date",
    },
    {
        title: "الإجراء",
        key: "action",
        render: () => <Link to="#" className="text-green-500 text-xs border border-green-500 px-2 py-1 rounded hover:bg-green-50">طلب تسوية</Link>
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 text-lg">طلبات الاعتماد</h3>
         <Button type="text" className="text-gray-400 flex items-center gap-1 text-xs">
            تصدير <ExportOutlined />
         </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false} 
        rowKey={(record, index) => index?.toString() || '0'}
        size="middle"
        className="custom-table"
      />
      <div className="mt-4 text-center">
         <Link to="/admin/wallet" className="text-green-600 flex items-center justify-center gap-2 hover:underline">
             <ExportOutlined rotate={90} className="text-lg" />
             إدارة الموارد
         </Link>
      </div>
    </div>
  );
};

export default ApprovalRequestsTable;
