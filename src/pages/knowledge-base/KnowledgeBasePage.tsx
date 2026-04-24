import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@utilities/debounce";
import { Alert, Empty, Input, Select, Skeleton, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { KnowledgeArticle } from "@entities/knowledge/model/types";

import { mockApi } from "@shared/api/mockApi";
import { PageContainer } from "@shared/ui/page-container/PageContainer";

import styles from "./KnowledgeBasePage.module.scss";

const categoryLabel: Record<KnowledgeArticle["category"], string> = {
  runbook: "Ранбук",
  policy: "Политика",
  howto: "Инструкция",
  architecture: "Архитектура"
};

const coverAccent: Record<KnowledgeArticle["category"], string> = {
  runbook: "#0f766e",
  policy: "#334155",
  howto: "#1d4ed8",
  architecture: "#7c2d12"
};

export const KnowledgeBasePage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["knowledge"],
    queryFn: mockApi.getKnowledgeArticles
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<"all" | KnowledgeArticle["category"]>("all");
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
      const categoryOk = category === "all" || row.category === category;
      if (!categoryOk) {
        return false;
      }
      if (!query) {
        return true;
      }
      return `${row.id} ${row.title} ${row.ownerTeam} ${row.tags.join(" ")}`
        .toLowerCase()
        .includes(query);
    });
  }, [data, debouncedSearch, category]);

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }

  if (isError || !data) {
    return <Alert type="error" message="Не удалось загрузить базу знаний" />;
  }

  return (
    <PageContainer title="База знаний" subtitle="Журнал ранбуков и инженерных статей">
      <Space direction="vertical" size={14} style={{ width: "100%" }}>
        <div className={styles.toolbar}>
          <Input
            allowClear
            value={search}
            onChange={(event) => {
              const value = event.target.value;

              setSearch(value);
              debouncedSetSearch(value);
            }}
            prefix={<SearchOutlined />}
            placeholder="Поиск по статье, тегам, ID"
            className={styles.search}
          />
          <Select
            value={category}
            onChange={(value) => setCategory(value)}
            style={{ width: 220 }}
            options={[
              { value: "all", label: "Все категории" },
              { value: "runbook", label: categoryLabel.runbook },
              { value: "policy", label: categoryLabel.policy },
              { value: "howto", label: categoryLabel.howto },
              { value: "architecture", label: categoryLabel.architecture }
            ]}
          />
        </div>

        {filtered.length === 0 ? (
          <Empty description="По вашему фильтру ничего не найдено" />
        ) : (
          <div className={styles.grid}>
            {filtered.map((article) => (
              <article
                key={article.id}
                className={styles.card}
                onClick={() => navigate(`/knowledge-base/${article.id}`)}
              >
                <div className={styles.cover}>
                  <Tag color="blue">{article.id}</Tag>
                  <Typography.Text
                    style={{ color: coverAccent[article.category], fontWeight: 600 }}
                  >
                    {categoryLabel[article.category]}
                  </Typography.Text>
                </div>
                <div className={styles.cardBody}>
                  <Typography.Title level={5} className={styles.title}>
                    {article.title}
                  </Typography.Title>
                  <Typography.Text type="secondary" className={styles.summary}>
                    {article.summary}
                  </Typography.Text>
                  <div className={styles.tags}>
                    {article.tags.map((tag) => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </div>
                  <div className={styles.meta}>
                    <Typography.Text type="secondary">Команда: {article.ownerTeam}</Typography.Text>
                    <Typography.Text type="secondary">
                      {dayjs(article.updatedAt).format("DD.MM.YYYY")}
                    </Typography.Text>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Space>
    </PageContainer>
  );
};
