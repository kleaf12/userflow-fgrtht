import { CalendarOutlined, DownOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Popover,
  Row,
  Skeleton,
  Space,
  Statistic
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { mockApi } from "@shared/api/mockApi";
import { PageContainer } from "@shared/ui/page-container/PageContainer";

import styles from "./DashboardPage.module.scss";

const { RangePicker } = DatePicker;
type PeriodKey = "month" | "quarter" | "half";

export const DashboardPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: mockApi.getDashboardKpi
  });
  const [period, setPeriod] = useState<PeriodKey>("half");
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const filteredTrend = useMemo(() => {
    if (!data) {
      return [];
    }
    const source = [...data.trend];

    if (range?.[0] && range?.[1]) {
      const from = range[0].startOf("day");
      const to = range[1].endOf("day");
      return source.filter((item) => {
        const point = dayjs(item.date);
        return (
          point.isAfter(from.subtract(1, "millisecond")) && point.isBefore(to.add(1, "millisecond"))
        );
      });
    }

    if (period === "quarter") {
      return source.slice(-3);
    }
    if (period === "month") {
      return source.slice(-2);
    }
    return source;
  }, [data, period, range]);

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  if (isError || !data) {
    return <Alert type="error" message="Не удалось загрузить дашборд" />;
  }

  const periodLabel =
    period === "month" ? "Текущий месяц" : period === "quarter" ? "Последний квартал" : "Полгода";
  const hasRange = Boolean(range?.[0] && range?.[1]);
  const rangeLabel = hasRange
    ? `${range?.[0]?.format("DD.MM.YY")} - ${range?.[1]?.format("DD.MM.YY")}`
    : "Дата";

  return (
    <PageContainer title="Главная панель" subtitle="Ключевые метрики инфраструктуры">
      <Space direction="vertical" size={14} style={{ width: "100%" }}>
        <div className={styles.controlsRow}>
          <div className={styles.controls}>
            <Dropdown
              menu={{
                items: [
                  { key: "month", label: "Текущий месяц" },
                  { key: "quarter", label: "Последний квартал" },
                  { key: "half", label: "Полгода" }
                ],
                onClick: ({ key }) => {
                  setPeriod(key as PeriodKey);
                  setRange(null);
                }
              }}
            >
              <Button className={styles.periodBtn}>
                {periodLabel} <DownOutlined />
              </Button>
            </Dropdown>
            <Popover
              trigger="click"
              open={pickerOpen}
              onOpenChange={setPickerOpen}
              placement="bottomRight"
              content={
                <RangePicker
                  value={range}
                  onChange={(next) => {
                    const value = next as [Dayjs | null, Dayjs | null] | null;
                    setRange(value);
                    if (value?.[0] && value?.[1]) {
                      setPickerOpen(false);
                    }
                  }}
                  format="DD.MM.YYYY"
                  placeholder={["Дата с", "Дата по"]}
                />
              }
            >
              <button type="button" className={hasRange ? styles.dateExpanded : styles.dateCompact}>
                <CalendarOutlined />
                <span>{rangeLabel}</span>
              </button>
            </Popover>
          </div>
        </div>

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12} xl={6}>
            <Card>
              <Statistic title="SLA" value={data.sla} suffix="%" precision={1} />
            </Card>
          </Col>
          <Col xs={24} sm={12} xl={6}>
            <Card>
              <Statistic title="MTTR" value={data.mttr} suffix="мин" />
            </Card>
          </Col>
          <Col xs={24} sm={12} xl={6}>
            <Card>
              <Statistic title="Открытые инциденты" value={data.openIncidents} />
            </Card>
          </Col>
          <Col xs={24} sm={12} xl={6}>
            <Card>
              <Statistic title="Расходы за месяц" value={data.monthlySpend} prefix="$" />
            </Card>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col xs={24} xl={14}>
            <Card title="Инциденты: новые vs решенные">
              <div className={styles.chartTall}>
                <ResponsiveContainer>
                  <ComposedChart data={filteredTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e1e5db" />
                    <XAxis dataKey="month" tick={{ fill: "#667085" }} />
                    <YAxis tick={{ fill: "#667085" }} />
                    <Tooltip cursor={false} />
                    <Legend />
                    <Bar dataKey="incidents" name="Новые" fill="#0e7490" radius={[8, 8, 0, 0]} />
                    <Line
                      dataKey="resolved"
                      name="Решенные"
                      stroke="#16a34a"
                      strokeWidth={2.4}
                      dot={{ r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
          <Col xs={24} xl={10}>
            <Card title="Расходы по месяцам">
              <div className={styles.chartTall}>
                <ResponsiveContainer>
                  <AreaChart data={filteredTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e1e5db" />
                    <XAxis dataKey="month" tick={{ fill: "#667085" }} />
                    <YAxis tick={{ fill: "#667085" }} />
                    <Tooltip
                      cursor={false}
                      formatter={(value) => `$${Number(value).toLocaleString()}`}
                    />
                    <Area type="monotone" dataKey="spend" stroke="#ea580c" fill="#ea580c33" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col xs={24} xl={12}>
            <Card title="Доступность сервисов (%)">
              <div className={styles.chartSmall}>
                <ResponsiveContainer>
                  <LineChart data={filteredTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e1e5db" />
                    <XAxis dataKey="month" tick={{ fill: "#667085" }} />
                    <YAxis domain={[99, 100]} tick={{ fill: "#667085" }} />
                    <Tooltip cursor={false} formatter={(value) => `${value}%`} />
                    <Line
                      dataKey="availability"
                      name="Доступность"
                      stroke="#0f766e"
                      strokeWidth={2.5}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
          <Col xs={24} xl={12}>
            <Card title="Ошибки по сервисам (%)">
              <div className={styles.chartSmall}>
                <ResponsiveContainer>
                  <BarChart data={data.serviceHealth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e1e5db" />
                    <XAxis dataKey="service" tick={{ fill: "#667085", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#667085" }} />
                    <Tooltip cursor={false} formatter={(value) => `${value}%`} />
                    <Bar dataKey="errorRate" fill="#f97316" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
        </Row>
      </Space>
    </PageContainer>
  );
};
