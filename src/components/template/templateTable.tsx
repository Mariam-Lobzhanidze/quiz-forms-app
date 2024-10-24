/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import httpClient from "../../axios";
import TableComponent from "../shared/table";
import { Template } from "../shared/types";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../shared/pagination";

const TemplatesTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [templates, setTemplates] = useState<Template[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const templateColumns: Array<{ header: string; accessor: keyof Template; sortable: boolean }> = [
    { header: "Title", accessor: "title", sortable: true },
    { header: "Description", accessor: "description", sortable: false },
    { header: "Created At", accessor: "createdAt", sortable: true },
  ];

  const navigate = useNavigate();

  const getTemplates = async (page = 1, limit = 5) => {
    try {
      const response = await httpClient.get(`/users/${id}/templates?page=${page}&limit=${limit}`);
      setTemplates(response.data.templates);
      setTotalPages(Math.ceil(response.data.totalTemplates / limit));
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    }
  };

  useEffect(() => {
    getTemplates(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCreate = () => {
    navigate("/tabs");
  };

  const handleEdit = (template: Template) => {
    navigate(`/tabs/${template.id}`, { state: { template } });
  };

  const handleDelete = async (template: Template) => {
    try {
      await httpClient.delete(`/templates/${template.id}`);
      setTemplates(templates.filter((t) => t.id !== template.id));
    } catch (error) {
      console.error("Failed to delete template:", error);
    }
  };

  return (
    <div className="container">
      <TableComponent<Template>
        columns={templateColumns}
        data={templates}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default TemplatesTable;
