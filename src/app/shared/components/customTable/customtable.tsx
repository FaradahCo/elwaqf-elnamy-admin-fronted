import { Flex, Table } from "antd";
import type {
  ColumnsType,
  TableRowSelection,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { useState } from "react";

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  total: number;
  per_page: number;
}

interface CustomTableProps<T> {
  columns: ColumnsType<T>;
  className?: string[];
  dataSource: T[];
  showSelection?: boolean;
  showPagination?: boolean;
  defaultPageSize?: number;
  loading?: boolean;
  rowKey?: string;
  paginationMeta?: PaginationMeta;
  onRow?: (record: T) => {
    onClick?: () => void;
    className?: string;
  };
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onPaginationChange?: (page: number, pageSize: number) => void;
  footer?: React.ReactNode;
}

export const CustomTable = <T extends Record<string, any>>({
  columns,
  dataSource,
  className,
  showSelection = true,
  showPagination = true,
  defaultPageSize = 10,
  rowKey = "id",
  loading = false,
  paginationMeta,
  onSelectionChange,
  onPaginationChange,
  onRow,
  footer,
}: CustomTableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: T[],
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);

    if (onSelectionChange) {
      onSelectionChange(newSelectedRowKeys, selectedRows);
    }
  };

  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const paginationConfig: TablePaginationConfig = {
    current: paginationMeta?.current_page || 1,
    pageSize: paginationMeta?.per_page || defaultPageSize,
    total: paginationMeta?.total || 0,
    showSizeChanger: true,
    showQuickJumper: false,
    showTotal: (total, range) =>
      `${range?.[0] || 0}-${range?.[1] || 0} من ${total} عنصر`,
    pageSizeOptions: ["10", "50", "100", "200"],
    onChange: (page, size) => {
      if (onPaginationChange) {
        onPaginationChange(page, size);
      }
    },
    onShowSizeChange: (_current, size) => {
      if (onPaginationChange) {
        onPaginationChange(1, size);
      }
    },
    position: ["bottomRight"],
  };

  return (
    <div className={className?.join(" ")}>
      <Flex gap="middle" vertical>
        {showSelection && (
          <Flex align="center" gap="middle">
            {showSelection && hasSelected && (
              <span>تم تحديد {selectedRowKeys.length} عنصر</span>
            )}
          </Flex>
        )}
        <Table<T>
          className="custom-table"
          rowSelection={showSelection ? rowSelection : undefined}
          columns={columns}
          dataSource={dataSource}
          rowKey={(record) => record[rowKey]}
          pagination={showPagination ? paginationConfig : false}
          loading={loading}
          onRow={onRow}
          scroll={{ x: "max-content" }}
          footer={() => footer}
        />
      </Flex>
    </div>
  );
};
export default CustomTable;
