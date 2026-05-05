import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@utilities/debounce";
import {
  Alert,
  Card,
  Col,
  Drawer,
  Input,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

import { ServiceRequest } from "@entities/request/model/types";

import { mockApi } from "@shared/api/mockApi";
import { PageContainer } from "@shared/ui/page-container/PageContainer";

import type { ColumnsType } from "antd/es/table";

const typeLabel: Record<ServiceRequest["type"], string> = {
  access: "Доступ",
  infrastructure: "Инфраструктура",
  hardware: "Оборудование",
  security_exception: "Исключение ИБ",
  procurement: "Закупка"
};

const statusLabel: Record<ServiceRequest["status"], string> = {
  submitted: "Новая",
  in_review: "На согласовании",
  approved: "Согласована",
  in_progress: "В работе",
  done: "Выполнена",
  rejected: "Отклонена"
};

const statusColor: Record<ServiceRequest["status"], string> = {
  submitted: "default",
  in_review: "gold",
  approved: "blue",
  in_progress: "processing",
  done: "green",
  rejected: "red"
};

const priorityColor: Record<ServiceRequest["priority"], string> = {
  low: "default",
  medium: "blue",
  high: "orange",
  critical: "red"
};

const priorityLabel: Record<ServiceRequest["priority"], string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
  critical: "Критичный"
};

const priorityOrder: ServiceRequest["priority"][] = ["low", "medium", "high", "critical"];

const statusOrder: ServiceRequest["status"][] = [
  "submitted",
  "in_review",
  "approved",
  "in_progress",
  "done",
  "rejected"
];

export const RequestsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["requests"],
    queryFn: mockApi.getRequests
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<"all" | ServiceRequest["status"]>("all");
  const [selected, setSelected] = useState<ServiceRequest | null>(null);
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    [setDebouncedSearch]
  );

  const filtered = useMemo(() => {
    const rows = data ?? [];
    const query = debouncedSearch.trim().toLowerCase();

    return rows.filter((row) => {
      const statusOk = status === "all" || row.status === status;
      if (!statusOk) {
        return false;
      }
      if (!query) {
        return true;
      }
      return `${row.id} ${row.title} ${row.requester} ${row.assignee}`
        .toLowerCase()
        .includes(query);
    });
  }, [data, debouncedSearch, status]);

  const stats = useMemo(() => {
    const source = data ?? [];
    return {
      total: source.length,
      active: source.filter((item) => item.status !== "done" && item.status !== "rejected").length,
      critical: source.filter((item) => item.priority === "critical").length,
      overdue: source.filter(
        (item) => dayjs(item.dueAt).isBefore(dayjs(), "day") && item.status !== "done"
      ).length
    };
  }, [data]);

  const columns: ColumnsType<ServiceRequest> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 110,
      sorter: (a, b) => a.id.localeCompare(b.id, "ru"),
      defaultSortOrder: "descend"
    },
    {
      title: "Запрос",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title, "ru")
    },
    {
      title: "Тип",
      dataIndex: "type",
      width: 150,
      filters: Object.entries(typeLabel).map(([value, label]) => ({ text: label, value })),
      onFilter: (value, row) => row.type === value,
      render: (value: ServiceRequest["type"]) => typeLabel[value]
    },
    {
      title: "Приоритет",
      dataIndex: "priority",
      width: 130,
      filters: Object.entries(priorityLabel).map(([value, label]) => ({ text: label, value })),
      onFilter: (value, row) => row.priority === value,
      sorter: (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority),
      render: (value: ServiceRequest["priority"]) => (
        <Tag color={priorityColor[value]}>{priorityLabel[value]}</Tag>
      )
    },
    {
      title: "Статус",
      dataIndex: "status",
      width: 160,
      filters: Object.entries(statusLabel).map(([value, label]) => ({ text: label, value })),
      onFilter: (value, row) => row.status === value,
      sorter: (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
      render: (value: ServiceRequest["status"]) => (
        <Tag color={statusColor[value]}>{statusLabel[value]}</Tag>
      )
    },
    {
      title: "Дедлайн",
      dataIndex: "dueAt",
      width: 160,
      sorter: (a, b) => dayjs(a.dueAt).valueOf() - dayjs(b.dueAt).valueOf(),
      render: (value: string, row) => {
        const overdue = dayjs(value).isBefore(dayjs(), "day") && row.status !== "done";
        return (
          <Space size={6}>
            <Typography.Text>{dayjs(value).format("DD.MM.YYYY")}</Typography.Text>
            {overdue ? <Tag color="red">Просрочен</Tag> : null}
          </Space>
        );
      }
    }
  ];

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }

  if (isError || !data) {
    return <Alert type="error" message="Не удалось загрузить запросы" />;
  }

  return (
    <PageContainer
      title="Запросы"
      subtitle="Очередь внутренних сервисных заявок от сотрудников и команд"
    >
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Всего" value={stats.total} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Активные" value={stats.active} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Критичные" value={stats.critical} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Просроченные" value={stats.overdue} />
            </Card>
          </Col>
        </Row>

        <Space wrap>
          <Input
            allowClear
            value={search}
            onChange={(event) => {
              const value = event.target.value;

              setSearch(value);
              debouncedSetSearch(value);
            }}
            prefix={<SearchOutlined />}
            placeholder="Поиск по ID, названию, заявителю"
            style={{ width: 320 }}
          />
          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            style={{ width: 220 }}
            options={[
              { value: "all", label: "Все статусы" },
              { value: "submitted", label: statusLabel.submitted },
              { value: "in_review", label: statusLabel.in_review },
              { value: "approved", label: statusLabel.approved },
              { value: "in_progress", label: statusLabel.in_progress },
              { value: "done", label: statusLabel.done },
              { value: "rejected", label: statusLabel.rejected }
            ]}
          />
        </Space>

        <Card>
          <Table<ServiceRequest>
            rowKey="id"
            columns={columns}
            dataSource={filtered}
            pagination={{ pageSize: 7 }}
            onRow={(row) => ({
              onClick: () => setSelected(row)
            })}
          />
        </Card>

        <Drawer
          open={Boolean(selected)}
          onClose={() => setSelected(null)}
          title={selected ? `${selected.id}: ${selected.title}` : "Детали запроса"}
          width={460}
        >
          {selected ? (
            <Space direction="vertical" size={10} style={{ width: "100%" }}>
              <Typography.Text>
                <b>Заявитель:</b> {selected.requester}
              </Typography.Text>
              <Typography.Text>
                <b>Исполнитель:</b> {selected.assignee}
              </Typography.Text>
              <Typography.Text>
                <b>Тип:</b> {typeLabel[selected.type]}
              </Typography.Text>
              <Typography.Text>
                <b>Приоритет:</b> {priorityLabel[selected.priority]}
              </Typography.Text>
              <Typography.Text>
                <b>Статус:</b> {statusLabel[selected.status]}
              </Typography.Text>
              <Typography.Text>
                <b>Связанный актив:</b> {selected.relatedAssetId ?? "Не указан"}
              </Typography.Text>
              <Typography.Text>
                <b>Создан:</b> {dayjs(selected.createdAt).format("DD.MM.YYYY")}
              </Typography.Text>
              <Typography.Text>
                <b>Дедлайн:</b> {dayjs(selected.dueAt).format("DD.MM.YYYY")}
              </Typography.Text>
            </Space>
          ) : null}
        </Drawer>
      </Space>
    </PageContainer>
  );
};
