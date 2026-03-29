import { useQuery } from "@tanstack/react-query";
import { Alert, Card, Col, Row, Skeleton, Space, Statistic, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

import { AutomationJob } from "@entities/automation/model/types";

import { mockApi } from "@shared/api/mockApi";
import { PageContainer } from "@shared/ui/page-container/PageContainer";

import type { ColumnsType } from "antd/es/table";

const criticalityLabel: Record<AutomationJob["criticality"], string> = {
  low: "Низкая",
  medium: "Средняя",
  high: "Высокая"
};

const criticalityColor: Record<AutomationJob["criticality"], string> = {
  low: "default",
  medium: "blue",
  high: "red"
};

const statusColor: Record<AutomationJob["status"], string> = {
  healthy: "green",
  warning: "gold",
  failing: "red"
};

const statusLabel: Record<AutomationJob["status"], string> = {
  healthy: "Стабильно",
  warning: "Внимание",
  failing: "Сбой"
};

export const AutomationPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["automation-jobs"],
    queryFn: mockApi.getAutomationJobs
  });

  const stats = useMemo(() => {
    const rows = data ?? [];
    if (rows.length === 0) {
      return { healthy: 0, warning: 0, failing: 0, avgSuccess: 0 };
    }

    return {
      healthy: rows.filter((job) => job.status === "healthy").length,
      warning: rows.filter((job) => job.status === "warning").length,
      failing: rows.filter((job) => job.status === "failing").length,
      avgSuccess: Number(
        (rows.reduce((acc, row) => acc + row.successRate, 0) / rows.length).toFixed(1)
      )
    };
  }, [data]);

  const columns: ColumnsType<AutomationJob> = [
    { title: "Сценарий", dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name, "ru") },
    {
      title: "Команда",
      dataIndex: "owner",
      width: 150,
      sorter: (a, b) => a.owner.localeCompare(b.owner, "ru")
    },
    { title: "Триггер", dataIndex: "trigger", width: 180 },
    {
      title: "Критичность",
      dataIndex: "criticality",
      width: 140,
      filters: Object.entries(criticalityLabel).map(([value, label]) => ({ text: label, value })),
      onFilter: (value, row) => row.criticality === value,
      sorter: (a, b) =>
        ["low", "medium", "high"].indexOf(a.criticality) -
        ["low", "medium", "high"].indexOf(b.criticality),
      render: (value: AutomationJob["criticality"]) => (
        <Tag color={criticalityColor[value]}>{criticalityLabel[value]}</Tag>
      )
    },
    {
      title: "Успех",
      dataIndex: "successRate",
      width: 120,
      sorter: (a, b) => a.successRate - b.successRate,
      render: (value: number) => `${value.toFixed(1)}%`
    },
    {
      title: "Статус",
      dataIndex: "status",
      width: 120,
      filters: Object.entries(statusLabel).map(([value, label]) => ({ text: label, value })),
      onFilter: (value, row) => row.status === value,
      sorter: (a, b) =>
        ["healthy", "warning", "failing"].indexOf(a.status) -
        ["healthy", "warning", "failing"].indexOf(b.status),
      render: (value: AutomationJob["status"]) => (
        <Tag color={statusColor[value]}>{statusLabel[value]}</Tag>
      )
    },
    {
      title: "Последний запуск",
      dataIndex: "lastRunAt",
      width: 180,
      sorter: (a, b) => dayjs(a.lastRunAt).valueOf() - dayjs(b.lastRunAt).valueOf(),
      render: (value: string) => dayjs(value).format("DD.MM.YYYY HH:mm")
    }
  ];

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 7 }} />;
  }

  if (isError || !data) {
    return <Alert type="error" message="Не удалось загрузить раздел автоматизации" />;
  }

  return (
    <PageContainer title="Автоматизация" subtitle="Операционные сценарии и связь с runbook-ами">
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Стабильно" value={stats.healthy} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Внимание" value={stats.warning} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Сбой" value={stats.failing} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic title="Средний успех" value={stats.avgSuccess} suffix="%" />
            </Card>
          </Col>
        </Row>

        <Card>
          <Table<AutomationJob>
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 6 }}
          />
        </Card>
      </Space>
    </PageContainer>
  );
};
