import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Alert, Avatar, Button, Skeleton, Tag, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { mockApi } from "@shared/api/mockApi";
import { PageContainer } from "@shared/ui/page-container/PageContainer";

import styles from "./UserProfilePage.module.scss";

const initials = (fullName: string) =>
  fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const modeLabel: Record<string, string> = {
  office: "Офис",
  hybrid: "Гибрид",
  remote: "Удаленно"
};

const statusLabel: Record<string, string> = {
  active: "Активен",
  vacation: "В отпуске"
};

export const UserProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => mockApi.getUserById(userId ?? ""),
    enabled: Boolean(userId)
  });

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  if (isError || !data) {
    return <Alert type="error" message="Профиль сотрудника не найден" />;
  }

  return (
    <PageContainer
      title={data.fullName}
      subtitle={`${data.role} • ${data.department}`}
      action={
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Назад
        </Button>
      }
    >
      <div className={styles.page}>
        <section className={styles.hero}>
          <Avatar size={72} className={styles.avatar}>
            {initials(data.fullName)}
          </Avatar>
          <div className={styles.heroInfo}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {data.fullName}
            </Typography.Title>
            <Typography.Text type="secondary">
              {data.role} • {data.department}
            </Typography.Text>
            <Typography.Text type="secondary">{data.team}</Typography.Text>
            <div className={styles.tags}>
              <Tag color={data.status === "active" ? "green" : "gold"}>
                {statusLabel[data.status]}
              </Tag>
              <Tag>{modeLabel[data.workMode]}</Tag>
              {data.isLeader ? <Tag color="cyan">Руководитель</Tag> : null}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <Typography.Title level={5} className={styles.sectionTitle}>
            Контакты и данные
          </Typography.Title>
          <div className={styles.infoRows}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Email</span>
              <span>{data.email}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Телефон</span>
              <span>{data.phone}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Локация</span>
              <span>{data.location}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Руководитель</span>
              <span>{data.managerName ?? "—"}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Дата начала работы</span>
              <span>{data.startDate}</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <Typography.Title level={5} className={styles.sectionTitle}>
            О сотруднике
          </Typography.Title>
          <Typography.Paragraph className={styles.bio}>{data.bio}</Typography.Paragraph>
          <div className={styles.skills}>
            {data.skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
};
