import { Flex, Table } from "antd";
import type {
  ColumnsType,
  TableRowSelection,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { useState } from "react";

interface CustomTableProps<T> {
  columns: ColumnsType<T>;
  className: string[];
  dataSource: T[];
  showSelection?: boolean;
  showPagination?: boolean;
  defaultPageSize?: number;
  loading?: boolean;
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
}

export const CustomTable = <T extends Record<string, any>>({
  columns,
  dataSource,
  className,
  showSelection = true,
  showPagination = true,
  defaultPageSize = 10,
  loading = false,
  onSelectionChange,
}: CustomTableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

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
    current: currentPage,
    pageSize: pageSize,
    total: dataSource.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} من ${total} عنصر`,
    pageSizeOptions: ["5", "10", "15", "20"],
    onChange: (page, size) => {
      setCurrentPage(page);
      setPageSize(size || defaultPageSize);
    },
    onShowSizeChange: (_current, size) => {
      setPageSize(size);
      setCurrentPage(1);
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
