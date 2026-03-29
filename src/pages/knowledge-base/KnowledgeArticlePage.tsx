import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button, Skeleton, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

import { KnowledgeArticle } from "@entities/knowledge/model/types";

import { mockApi } from "@shared/api/mockApi";
import { PageContainer } from "@shared/ui/page-container/PageContainer";

import styles from "./KnowledgeArticlePage.module.scss";

const categoryLabel: Record<KnowledgeArticle["category"], string> = {
  runbook: "Ранбук",
  policy: "Политика",
  howto: "Инструкция",
  architecture: "Архитектура"
};

export const KnowledgeArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["knowledge-article", articleId],
    queryFn: () => mockApi.getKnowledgeById(articleId ?? ""),
    enabled: Boolean(articleId)
  });

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  if (isError || !data) {
    return <Alert type="error" message="Статья базы знаний не найдена" />;
  }

  return (
    <PageContainer
      title={data.title}
      subtitle={`${categoryLabel[data.category]} • ${data.id}`}
      action={
        <Button
          icon={<ArrowLeftOutlined />}
          className={styles.backBtn}
          onClick={() => navigate("/knowledge-base")}
        >
          К списку
        </Button>
      }
    >
      <div className={styles.article}>
        <section className={styles.head}>
          <div className={styles.meta}>
            <Tag color="blue">{data.id}</Tag>
            <Tag>{categoryLabel[data.category]}</Tag>
            <Tag color={data.status === "approved" ? "green" : "gold"}>
              {data.status === "approved" ? "Утверждено" : "Черновик"}
            </Tag>
          </div>
          <Typography.Paragraph className={styles.summary}>{data.summary}</Typography.Paragraph>
          <Typography.Text type="secondary" className={styles.subMeta}>
            Команда: {data.ownerTeam} • Обновлено: {dayjs(data.updatedAt).format("DD.MM.YYYY")}
          </Typography.Text>
          <div className={styles.tags}>
            {data.tags.map((tag) => (
              <Tag key={tag}>#{tag}</Tag>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <Typography.Title level={5} className={styles.sectionTitle}>
            Контекст
          </Typography.Title>
          <Typography.Paragraph className={styles.paragraph}>
            Контекст: {data.summary}
          </Typography.Paragraph>
        </section>

        <section className={styles.section}>
          <Typography.Title level={5} className={styles.sectionTitle}>
            Условия запуска
          </Typography.Title>
          <Typography.Paragraph className={styles.paragraph}>
            Условия запуска: эскалация после срабатывания алерта соответствующей категории и
            подтверждение дежурным инженером.
          </Typography.Paragraph>
        </section>

        <section className={styles.section}>
          <Typography.Title level={5} className={styles.sectionTitle}>
            Шаги выполнения
          </Typography.Title>
          <Typography.Paragraph className={styles.paragraph}>
            Шаги выполнения: диагностика, стабилизация сервиса, проверка метрик, фиксация результата
            и закрытие задачи.
          </Typography.Paragraph>
        </section>
      </div>
    </PageContainer>
  );
};
