import { useQuery } from "@tanstack/react-query";
import { Alert, Card, Col, Row, Skeleton, Space, Statistic, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

import { IntegrationConnection } from "@entities/integration/model/types";

import { mockApi } from "@shared/api/mockApi";
import { PageContainer } from "@shared/ui/page-container/PageContainer";

import type { ColumnsType } from "antd/es/table";

//
//
const typeLabel: Record<IntegrationConnection["type"], string> = {
  ticketing: "Тикетинг",
  monitoring: "Мониторинг",
  vcs: "VCS",
  identity: "Идентификация",
  chatops: "Чат-операции"
};

const statusColor: Record<IntegrationConnection["status"], string> = {
  connected: "green",
  degraded: "gold",
  disconnected: "red"
};

const statusLabel: Record<IntegrationConnection["status"], string> = {
  connected: "Подключено",
  degraded: "Деградация",
  disconnected: "Отключено"
};

export const IntegrationsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["integrations"],
    queryFn: mockApi.getIntegrations
  });

  const stats = useMemo(() => {
    const rows = data ?? [];
    return {
      total: rows.length,
      connected: rows.filter((row) => row.status === "connected").length,
      degraded: rows.filter((row) => row.status === "degraded").length,
      disconnected: rows.filter((row) => row.status === "disconnected").length
    };
  }, [data]);

  const columns: ColumnsType<IntegrationConnection> = [
    { title: "Интеграция", dataIndex: "name" },
    {
      title: "Тип",
      dataIndex: "type",
      width: 130,
      render: (value: IntegrationConnection["type"]) => typeLabel[value]
    },
    { title: "Команда", dataIndex: "ownerTeam", width: 180 },
    {
      title: "Статус",
      dataIndex: "status",
      width: 140,
      render: (value: IntegrationConnection["status"]) => (
        <Tag color={statusColor[value]}>{statusLabel[value]}</Tag>
      )
    },
    {
      title: "Последняя синхронизация",
      dataIndex: "lastSyncAt",
      width: 190,
      render: (value: string | null) => (value ? dayjs(value).format("DD.MM.YYYY HH:mm") : "—")
    },
    {
      title: "Инциденты (30д)",
      dataIndex: "incidents30d",
      width: 150
    }
  ];

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 7 }} />;
  }

  if (isError || !data) {
    return <Alert type="error" message="Не удалось загрузить интеграции" />;
  }

  return (
    <PageContainer title="Интеграции" subtitle="Состояние внешних систем и здоровье подключений">
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Всего" value={stats.total} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Подключено" value={stats.connected} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Деградация" value={stats.degraded} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Отключено" value={stats.disconnected} />
            </Card>
          </Col>
        </Row>

        <Card>
          <Table<IntegrationConnection>
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 7 }}
          />
        </Card>
      </Space>
    </PageContainer>
  );
};
