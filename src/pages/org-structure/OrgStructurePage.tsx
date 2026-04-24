import { SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@utilities/debounce";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
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
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserProfile } from "@entities/user/model/types";

import { mockApi } from "@shared/api/mockApi";
import { PageContainer } from "@shared/ui/page-container/PageContainer";

import styles from "./OrgStructurePage.module.scss";

import type { ColumnsType } from "antd/es/table";

const workModeLabel: Record<UserProfile["workMode"], string> = {
  office: "Офис",
  hybrid: "Гибрид",
  remote: "Удаленно"
};

const statusLabel: Record<UserProfile["status"], string> = {
  active: "Активен",
  vacation: "Отпуск"
};

const initials = (fullName: string) =>
  fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const OrgStructurePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserProfile["status"]>("all");
  const [leadersOnly, setLeadersOnly] = useState(false);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    [setDebouncedSearch]
  );
  const {
    data: users,
    isLoading,
    isError
  } = useQuery({ queryKey: ["users"], queryFn: mockApi.getUsers });

  const departments = useMemo(() => {
    const source = users ?? [];
    const map = new Map<string, number>();
    source.forEach((user) => map.set(user.department, (map.get(user.department) ?? 0) + 1));
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [users]);

  const teams = useMemo(() => {
    const source = users ?? [];
    const filteredByDepartment =
      departmentFilter === "all"
        ? source
        : source.filter((user) => user.department === departmentFilter);
    return Array.from(new Set(filteredByDepartment.map((user) => user.team))).sort((a, b) =>
      a.localeCompare(b, "ru")
    );
  }, [users, departmentFilter]);

  const filtered = useMemo(() => {
    const source = users ?? [];
    const query = debouncedSearch.trim().toLowerCase();

    return source.filter((user) => {
      if (departmentFilter !== "all" && user.department !== departmentFilter) {
        return false;
      }
      if (teamFilter !== "all" && user.team !== teamFilter) {
        return false;
      }
      if (statusFilter !== "all" && user.status !== statusFilter) {
        return false;
      }
      if (leadersOnly && !user.isLeader) {
        return false;
      }
      if (!query) {
        return true;
      }
      return `${user.fullName} ${user.role} ${user.team} ${user.department}`
        .toLowerCase()
        .includes(query);
    });
  }, [users, debouncedSearch, departmentFilter, teamFilter, statusFilter, leadersOnly]);

  const stats = useMemo(() => {
    const source = users ?? [];
    return {
      total: source.length,
      leaders: source.filter((user) => user.isLeader).length,
      departments: new Set(source.map((user) => user.department)).size,
      teams: new Set(source.map((user) => user.team)).size
    };
  }, [users]);

  const columns: ColumnsType<UserProfile> = [
    {
      title: "Сотрудник",
      key: "fullName",
      width: 280,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName, "ru"),
      render: (_, row) => (
        <button
          type="button"
          className={styles.userBtn}
          onClick={() => navigate(`/users/${row.id}`)}
        >
          <Avatar size={30} className={styles.avatarSoft}>
            {initials(row.fullName)}
          </Avatar>
          <div className={styles.userMeta}>
            <Typography.Text className={styles.userName}>{row.fullName}</Typography.Text>
            <Typography.Text type="secondary" className={styles.userRole}>
              {row.role}
            </Typography.Text>
          </div>
        </button>
      )
    },
    {
      title: "Подразделение",
      dataIndex: "department",
      width: 230,
      sorter: (a, b) => a.department.localeCompare(b.department, "ru")
    },
    {
      title: "Команда",
      dataIndex: "team",
      width: 190,
      sorter: (a, b) => a.team.localeCompare(b.team, "ru")
    },
    {
      title: "Формат",
      dataIndex: "workMode",
      width: 130,
      responsive: ["lg"],
      render: (value: UserProfile["workMode"]) => workModeLabel[value]
    },
    {
      title: "Статус",
      dataIndex: "status",
      width: 130,
      render: (value: UserProfile["status"]) => (
        <Tag color={value === "active" ? "green" : "gold"}>{statusLabel[value]}</Tag>
      )
    },
    {
      title: "Роль в структуре",
      key: "leader",
      width: 170,
      responsive: ["xl"],
      render: (_, row) =>
        row.isLeader ? <Tag color="blue">Руководитель</Tag> : <Tag>Сотрудник</Tag>
    }
  ];

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }

  if (isError || !users) {
    return <Alert type="error" message="Не удалось загрузить оргструктуру" />;
  }

  return (
    <PageContainer>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} sm={12} lg={6}>
            <Card>
              <Statistic title="Сотрудники" value={stats.total} />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card>
              <Statistic title="Руководители" value={stats.leaders} />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card>
              <Statistic title="Подразделения" value={stats.departments} />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card>
              <Statistic title="Команды" value={stats.teams} />
            </Card>
          </Col>
        </Row>

        <Card className={styles.filtersCard}>
          <Space wrap size={10}>
            <Input
              allowClear
              value={search}
              onChange={(event) => {
                const value = event.target.value;

                setSearch(value);
                debouncedSetSearch(value);
              }}
              prefix={<SearchOutlined />}
              placeholder="Поиск по сотруднику, роли, команде"
              className={styles.search}
            />
            <Select
              value={departmentFilter}
              onChange={(value) => {
                setDepartmentFilter(value);
                setTeamFilter("all");
              }}
              style={{ width: 230 }}
              options={[
                { value: "all", label: "Все подразделения" },
                ...departments.map((item) => ({ value: item.name, label: item.name }))
              ]}
            />
            <Select
              value={teamFilter}
              onChange={(value) => setTeamFilter(value)}
              style={{ width: 180 }}
              options={[
                { value: "all", label: "Все команды" },
                ...teams.map((team) => ({ value: team, label: team }))
              ]}
            />
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              style={{ width: 150 }}
              options={[
                { value: "all", label: "Любой статус" },
                { value: "active", label: "Активен" },
                { value: "vacation", label: "Отпуск" }
              ]}
            />
            <Button
              type={leadersOnly ? "primary" : "default"}
              icon={<TeamOutlined />}
              onClick={() => setLeadersOnly((prev) => !prev)}
            >
              Руководители
            </Button>
          </Space>
        </Card>

        <Card className={styles.tableCard} title={`Сотрудники: ${filtered.length}`}>
          <Table<UserProfile>
            rowKey="id"
            columns={columns}
            dataSource={filtered}
            size="small"
            pagination={{ pageSize: 9, showSizeChanger: true, pageSizeOptions: ["9", "15", "30"] }}
          />
        </Card>
      </Space>
    </PageContainer>
  );
};
