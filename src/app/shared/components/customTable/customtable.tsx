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
  className: string[];
  dataSource: T[];
  showSelection?: boolean;
  showPagination?: boolean;
  defaultPageSize?: number;
  loading?: boolean;
  paginationMeta?: PaginationMeta;
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onPaginationChange?: (page: number, pageSize: number) => void;
}

export const CustomTable = <T extends Record<string, any>>({
  columns,
  dataSource,
  className,
  showSelection = true,
  showPagination = true,
  defaultPageSize = 10,
  loading = false,
  paginationMeta,
  onSelectionChange,
  onPaginationChange,
}: CustomTableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: T[]
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
    pageSize: paginationMeta?.per_page,
    total: paginationMeta?.total || 0,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total, range) =>
      `${range?.[0] || 0}-${range?.[1] || 0} من ${total} عنصر`,
    pageSizeOptions: ["5", "10", "15", "20"],
    onChange: (page, size) => {
      if (onPaginationChange) {
        onPaginationChange(
          page,
          size || paginationMeta?.per_page || defaultPageSize
        );
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
    <div className={className.join(" ")}>
      <Flex gap="middle" vertical>
        {showSelection && (
          <Flex align="center" gap="middle">
            {showSelection && hasSelected && (
              <span>تم تحديد {selectedRowKeys.length} عنصر</span>
            )}
          </Flex>
        )}
        <Table<T>
          rowSelection={showSelection ? rowSelection : undefined}
          columns={columns}
          dataSource={dataSource}
          rowKey={(record) => record.id}
          pagination={showPagination ? paginationConfig : false}
          loading={loading}
        />
      </Flex>
    </div>
  );
};
export default CustomTable;
