import { useEffect, useState } from "react";

interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
}

interface TableComponentProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onCreate: () => void;
}

const TableComponent = <T,>({ columns, data, onEdit, onDelete, onCreate }: TableComponentProps<T>) => {
  const [sortField, setSortField] = useState<keyof T | null>(columns[0]?.accessor || null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedData, setSortedData] = useState<T[]>(data);

  useEffect(() => {
    const newSortedData = [...data].sort((a, b) => {
      const aValue = a[sortField as keyof T] ?? "";
      const bValue = b[sortField as keyof T] ?? "";

      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    setSortedData(newSortedData);
  }, [data, sortField, sortOrder]);

  const handleSort = (field: keyof T) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={onCreate}>
        Create New
      </button>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                onClick={() => col.sortable && handleSort(col.accessor)}
                style={{ cursor: col.sortable ? "pointer" : "default" }}>
                {col.header}
                {col.sortable && (
                  <span className="mx-2">
                    {sortField === col.accessor ? (
                      sortOrder === "asc" ? (
                        <i className="bi bi-sort-up"></i>
                      ) : (
                        <i className="bi bi-sort-down"></i>
                      )
                    ) : (
                      <i className="bi bi-sort-up"></i>
                    )}
                  </span>
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={String(col.accessor)}>{String(item[col.accessor as keyof T])}</td>
              ))}
              <td>
                <button className="btn btn-sm btn-secondary me-2" onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(item)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
