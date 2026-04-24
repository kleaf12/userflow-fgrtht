import { DownOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@utilities/debounce";
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Dropdown,
  Form,
  Input,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  message
} from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";

import { Asset } from "@entities/asset/model/types";

import { mockApi } from "@shared/api/mockApi";
import { PageContainer } from "@shared/ui/page-container/PageContainer";

import styles from "./AssetsPage.module.scss";

import type { ColumnsType } from "antd/es/table";

const typeRu = {
  Laptop: "Ноутбук",
  Server: "Сервер",
  Network: "Сеть",
  License: "Лицензия",
  Inventory: "Инвентарь"
};

const statusRu = {
  in_use: "Выдано",
  in_stock: "На складе",
  maintenance: "Обслуживание",
  retired: "Списано"
};

const statusColor = {
  in_use: "green",
  in_stock: "blue",
  maintenance: "orange",
  retired: "default"
};

type AssetRow = Asset & { rowId: string };

const formatDate = (value: string | null) => (value ? dayjs(value).format("DD.MM.YYYY") : "—");

export const AssetsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["assets"],
    queryFn: mockApi.getAssets
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [rowsState, setRowsState] = useState<AssetRow[]>(() =>
    (data ?? []).map((asset, index) => ({ ...asset, rowId: `${asset.id}-${index}` }))
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    []
  );
  useEffect(() => {
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, [debouncedSearch]);
  const [form] = Form.useForm();
  const selectedType = Form.useWatch("type", form);
  const selectedStatus = Form.useWatch("status", form);

  const normalized = debouncedSearch.trim().toLowerCase();

  const rows = useMemo(() => {
    if (!normalized) {
      return rowsState;
    }

    return rowsState.filter((asset) => {
      const haystack =
        `${asset.id} ${asset.title} ${asset.type} ${asset.owner} ${asset.assignedTo ?? ""} ${asset.storageLocation} ${asset.status}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [rowsState, normalized]);

  useEffect(() => {
    setPagination((prev) => {
      const maxPage = Math.max(1, Math.ceil(rows.length / prev.pageSize));
      if (prev.current <= maxPage) {
        return prev;
      }
      return { ...prev, current: maxPage };
    });
  }, [rows.length]);

  const stats = useMemo(() => {
    return {
      total: rowsState.length,
      issued: rowsState.filter((a) => a.status === "in_use").length,
      stock: rowsState.filter((a) => a.status === "in_stock").length,
      service: rowsState.filter((a) => a.status === "maintenance").length
    };
  }, [rowsState]);

  const typeFilters = useMemo(
    () => Object.entries(typeRu).map(([key, label]) => ({ text: label, value: key })),
    []
  );

  const statusFilters = useMemo(
    () => Object.entries(statusRu).map(([key, label]) => ({ text: label, value: key })),
    []
  );

  const editingAsset = useMemo(
    () => rowsState.find((row) => row.rowId === editingRowId) ?? null,
    [rowsState, editingRowId]
  );

  const openEditor = (row: AssetRow) => {
    setEditingRowId(row.rowId);
    setDrawerOpen(true);
    form.setFieldsValue({
      id: row.id,
      title: row.title,
      type: row.type,
      owner: row.owner,
      assignedTo: row.assignedTo ?? "",
      storageLocation: row.storageLocation,
      issuedAt: row.issuedAt ? dayjs(row.issuedAt) : null,
      returnDue: row.returnDue ? dayjs(row.returnDue) : null,
      status: row.status
    });
  };

  const closeEditor = () => {
    setDrawerOpen(false);
    setEditingRowId(null);
    form.resetFields();
  };

  const saveAsset = async () => {
    if (!editingAsset) {
      return;
    }

    const values = await form.validateFields();

    const duplicate = rowsState.some(
      (item) => item.rowId !== editingAsset.rowId && item.id === values.id.trim()
    );
    if (duplicate) {
      message.error("Актив с таким ID уже существует");
      return;
    }

    setRowsState((prev) =>
      prev.map((item) => {
        if (item.rowId !== editingAsset.rowId) {
          return item;
        }

        return {
          ...item,
          id: values.id.trim(),
          title: values.title.trim(),
          type: values.type,
          owner: values.owner.trim(),
          assignedTo: values.assignedTo.trim() ? values.assignedTo.trim() : null,
          storageLocation: values.storageLocation.trim(),
          issuedAt: values.issuedAt ? values.issuedAt.format("YYYY-MM-DD") : null,
          returnDue: values.returnDue ? values.returnDue.format("YYYY-MM-DD") : null,
          status: values.status
        };
      })
    );

    message.success("Изменения сохранены");
    closeEditor();
  };

  const columns: ColumnsType<AssetRow> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 88,
      sorter: (a, b) => a.id.localeCompare(b.id, "ru")
    },
    {
      title: "Актив",
      dataIndex: "title",
      key: "title",
      width: 170,
      sorter: (a, b) => a.title.localeCompare(b.title, "ru")
    },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
      width: 104,
      filters: typeFilters,
      onFilter: (value, row) => row.type === value,
      render: (type: Asset["type"]) => typeRu[type]
    },
    {
      title: "Кому выдано",
      dataIndex: "assignedTo",
      key: "assignedTo",
      width: 136,
      responsive: ["md"],
      render: (value: string | null) =>
        value ?? <Typography.Text type="secondary">Не выдано</Typography.Text>
    },
    {
      title: "Где находится",
      dataIndex: "storageLocation",
      key: "storageLocation",
      width: 150,
      responsive: ["xxl"],
      sorter: (a, b) => a.storageLocation.localeCompare(b.storageLocation, "ru")
    },
    {
      title: "Дата выдачи",
      dataIndex: "issuedAt",
      key: "issuedAt",
      width: 110,
      responsive: ["xl"],
      sorter: (a, b) => (a.issuedAt ?? "").localeCompare(b.issuedAt ?? ""),
      render: (value: string | null) => formatDate(value)
    },
    {
      title: "Возврат до",
      dataIndex: "returnDue",
      key: "returnDue",
      width: 110,
      responsive: ["xl"],
      sorter: (a, b) => (a.returnDue ?? "").localeCompare(b.returnDue ?? ""),
      render: (value: string | null) => formatDate(value)
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      width: 104,
      filters: statusFilters,
      onFilter: (value, row) => row.status === value,
      render: (value: Asset["status"]) => <Tag color={statusColor[value]}>{statusRu[value]}</Tag>
    },
    {
      title: "Действия",
      key: "actions",
      width: 98,
      render: (_, row) => (
        <Button type="text" icon={<EditOutlined />} onClick={() => openEditor(row)}>
          Изменить
        </Button>
      )
    }
  ];

  if (isError) {
    return <Alert type="error" message="Не удалось загрузить активы" />;
  }

  return (
    <PageContainer title="Активы" subtitle="Учет техники, лицензий и инвентаря">
      <Space direction="vertical" size={14} style={{ width: "100%" }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} sm={12} lg={12} xl={6}>
            <Card className={styles.statCard}>
              <Statistic title="Всего активов" value={stats.total} />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={12} xl={6}>
            <Card className={styles.statCard}>
              <Statistic title="Выдано сотрудникам" value={stats.issued} />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={12} xl={6}>
            <Card className={styles.statCard}>
              <Statistic title="На складе" value={stats.stock} />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={12} xl={6}>
            <Card className={styles.statCard}>
              <Statistic title="На обслуживании" value={stats.service} />
            </Card>
          </Col>
        </Row>

        <Card className={styles.tableCard}>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <div className={styles.header}>
              <Typography.Title level={3}>Реестр активов</Typography.Title>
              <Typography.Text type="secondary">
                Нажмите на строку или кнопку «Изменить», чтобы отредактировать все поля.
              </Typography.Text>
            </div>

            <Input
              allowClear
              value={search}
              onChange={(event) => {
                const value = event.target.value;

                setSearch(value);
                debouncedSetSearch(value);
              }}
              prefix={<SearchOutlined />}
              placeholder="Поиск по ID, активу, сотруднику, локации"
              className={styles.search}
            />

            <Table<AssetRow>
              rowKey="rowId"
              loading={isLoading}
              dataSource={rows}
              columns={columns}
              size="small"
              tableLayout="fixed"
              scroll={{ x: 920 }}
              onRow={(row) => ({
                onClick: () => openEditor(row),
                className: styles.editableRow
              })}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                showSizeChanger: true,
                pageSizeOptions: ["8", "12", "20", "50"],
                onChange: (current, pageSize) => {
                  setPagination({ current, pageSize });
                },
                showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`
              }}
            />
          </Space>
        </Card>

        <Drawer
          title={
            editingAsset ? `Редактирование актива ${editingAsset.id}` : "Редактирование актива"
          }
          open={drawerOpen}
          onClose={closeEditor}
          width={460}
          destroyOnClose
          className={styles.editDrawer}
          footer={
            <div className={styles.drawerFooter}>
              <Button onClick={closeEditor}>Отмена</Button>
              <Button className={styles.saveBtn} onClick={saveAsset}>
                Сохранить
              </Button>
            </div>
          }
        >
          <Form form={form} layout="vertical" requiredMark={false}>
            <Form.Item label="ID" name="id" rules={[{ required: true, message: "Укажите ID" }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Название"
              name="title"
              rules={[{ required: true, message: "Укажите название" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Тип"
              name="type"
              rules={[{ required: true, message: "Выберите тип" }]}
            >
              <Dropdown
                menu={{
                  items: Object.entries(typeRu).map(([value, label]) => ({ key: value, label })),
                  onClick: ({ key }) => form.setFieldValue("type", key as Asset["type"])
                }}
                trigger={["click"]}
              >
                <Button className={styles.formDropdownBtn}>
                  <span>
                    {selectedType ? typeRu[selectedType as Asset["type"]] : "Выберите тип"}
                  </span>
                  <DownOutlined />
                </Button>
              </Dropdown>
            </Form.Item>
            <Form.Item
              label="Владелец"
              name="owner"
              rules={[{ required: true, message: "Укажите владельца" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Кому выдано" name="assignedTo">
              <Input placeholder="Пусто = не выдано" />
            </Form.Item>
            <Form.Item
              label="Где находится"
              name="storageLocation"
              rules={[{ required: true, message: "Укажите локацию" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Дата выдачи" name="issuedAt">
              <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Возврат до" name="returnDue">
              <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Статус"
              name="status"
              rules={[{ required: true, message: "Выберите статус" }]}
            >
              <Dropdown
                menu={{
                  items: Object.entries(statusRu).map(([value, label]) => ({ key: value, label })),
                  onClick: ({ key }) => form.setFieldValue("status", key as Asset["status"])
                }}
                trigger={["click"]}
              >
                <Button className={styles.formDropdownBtn}>
                  <span>
                    {selectedStatus
                      ? statusRu[selectedStatus as Asset["status"]]
                      : "Выберите статус"}
                  </span>
                  <DownOutlined />
                </Button>
              </Dropdown>
            </Form.Item>
          </Form>
        </Drawer>
      </Space>
    </PageContainer>
  );
};
