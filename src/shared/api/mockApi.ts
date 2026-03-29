import { Asset } from "@entities/asset/model/types";
import { AutomationJob } from "@entities/automation/model/types";
import { IntegrationConnection } from "@entities/integration/model/types";
import { KnowledgeArticle } from "@entities/knowledge/model/types";
import { CreatePostPayload, Post } from "@entities/post/model/types";
import { ServiceRequest } from "@entities/request/model/types";
import { UserProfile } from "@entities/user/model/types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const assets: Asset[] = [
  {
    id: "A-101",
    type: "Laptop",
    title: "MacBook Pro 16 M3",
    owner: "ИТ-департамент",
    assignedTo: "Анна Волкова",
    storageLocation: "Москва, HQ-4",
    issuedAt: "2025-08-12",
    returnDue: null,
    status: "in_use"
  },
  {
    id: "A-102",
    type: "Laptop",
    title: "Lenovo ThinkPad X1",
    owner: "ИТ-департамент",
    assignedTo: "Никита Егоров",
    storageLocation: "Москва, HQ-3",
    issuedAt: "2025-11-03",
    returnDue: null,
    status: "in_use"
  },
  {
    id: "A-103",
    type: "Laptop",
    title: "Dell Latitude 7440",
    owner: "ИТ-департамент",
    assignedTo: null,
    storageLocation: "Склад ИТ, Стеллаж B2",
    issuedAt: null,
    returnDue: null,
    status: "in_stock"
  },
  {
    id: "A-104",
    type: "Server",
    title: "Dell PowerEdge R760",
    owner: "Команда инфраструктуры",
    assignedTo: null,
    storageLocation: "DC-1, Ряд 2",
    issuedAt: null,
    returnDue: null,
    status: "maintenance"
  },
  {
    id: "A-105",
    type: "Server",
    title: "HPE ProLiant DL380",
    owner: "Команда инфраструктуры",
    assignedTo: null,
    storageLocation: "DC-2, Ряд 1",
    issuedAt: null,
    returnDue: null,
    status: "in_use"
  },
  {
    id: "A-106",
    type: "Network",
    title: "Cisco Core Switch N9K",
    owner: "Команда инфраструктуры",
    assignedTo: null,
    storageLocation: "DC-1, Сетевой сегмент",
    issuedAt: null,
    returnDue: null,
    status: "in_use"
  },
  {
    id: "A-107",
    type: "Network",
    title: "FortiGate 200F",
    owner: "Безопасность",
    assignedTo: null,
    storageLocation: "DC-2, Периметр",
    issuedAt: null,
    returnDue: null,
    status: "in_use"
  },
  {
    id: "A-108",
    type: "License",
    title: "Atlassian Enterprise",
    owner: "ИТ-департамент",
    assignedTo: "Platform Team",
    storageLocation: "License Vault",
    issuedAt: "2026-01-01",
    returnDue: "2026-12-31",
    status: "in_use"
  },
  {
    id: "A-109",
    type: "License",
    title: "JetBrains All Products",
    owner: "ИТ-департамент",
    assignedTo: "Ирина Белова",
    storageLocation: "License Vault",
    issuedAt: "2026-02-01",
    returnDue: "2027-01-31",
    status: "in_use"
  },
  {
    id: "A-110",
    type: "Inventory",
    title: "Резервные SSD 2TB (x12)",
    owner: "Офисная служба",
    assignedTo: null,
    storageLocation: "Склад ИТ, Стеллаж C1",
    issuedAt: null,
    returnDue: null,
    status: "in_stock"
  },
  {
    id: "A-111",
    type: "Inventory",
    title: "Резервные роутеры (x6)",
    owner: "Офисная служба",
    assignedTo: null,
    storageLocation: "Склад ИТ, Стеллаж D3",
    issuedAt: null,
    returnDue: null,
    status: "retired"
  },
  {
    id: "A-112",
    type: "Laptop",
    title: "MacBook Air M2",
    owner: "ИТ-департамент",
    assignedTo: "Елена Тюрина",
    storageLocation: "Москва, HQ-3",
    issuedAt: "2025-12-15",
    returnDue: null,
    status: "in_use"
  },
  {
    id: "A-113",
    type: "Laptop",
    title: "HP EliteBook 840 G10",
    owner: "ИТ-департамент",
    assignedTo: "Владимир Савин",
    storageLocation: "Нижний Новгород, Home Office",
    issuedAt: "2026-01-10",
    returnDue: null,
    status: "in_use"
  },
  {
    id: "A-114",
    type: "Laptop",
    title: "ASUS ExpertBook B5",
    owner: "ИТ-департамент",
    assignedTo: "Ольга Кузьмина",
    storageLocation: "Москва, HQ-5",
    issuedAt: "2026-02-12",
    returnDue: null,
    status: "in_use"
  },
  {
    id: "A-115",
    type: "Server",
    title: "Supermicro 2U Compute Node",
    owner: "Команда инфраструктуры",
    assignedTo: null,
    storageLocation: "DC-1, Ряд 4",
    issuedAt: null,
    returnDue: null,
    status: "maintenance"
  },
  {
    id: "A-116",
    type: "Server",
    title: "IBM FlashSystem 5300",
    owner: "Команда инфраструктуры",
    assignedTo: null,
    storageLocation: "DC-2, Storage Zone",
    issuedAt: null,
    returnDue: null,
    status: "in_use"
  },
  {
    id: "A-117",
    type: "Network",
    title: "MikroTik CCR2216",
    owner: "Команда инфраструктуры",
    assignedTo: null,
    storageLocation: "DC-1, Сетевой сегмент",
    issuedAt: null,
    returnDue: null,
    status: "in_stock"
  },
  {
    id: "A-118",
    type: "License",
    title: "Figma Organization",
    owner: "Продукт и аналитика",
    assignedTo: "UX/UI Team",
    storageLocation: "License Vault",
    issuedAt: "2026-01-15",
    returnDue: "2027-01-14",
    status: "in_use"
  },
  {
    id: "A-119",
    type: "Inventory",
    title: 'Мониторы 27" (x18)',
    owner: "Офисная служба",
    assignedTo: null,
    storageLocation: "Склад ИТ, Стеллаж E2",
    issuedAt: null,
    returnDue: null,
    status: "in_stock"
  },
  {
    id: "A-120",
    type: "Inventory",
    title: "Резервные UPS (x4)",
    owner: "Офисная служба",
    assignedTo: null,
    storageLocation: "DC-2, Utility Room",
    issuedAt: null,
    returnDue: null,
    status: "retired"
  }
];

const dashboardKpi = {
  sla: 96.4,
  mttr: 38,
  openIncidents: 3,
  activeRequests: 12,
  monthlySpend: 290800,
  trend: [
    {
      month: "Сен",
      date: "2025-09-01",
      incidents: 24,
      resolved: 19,
      spend: 241000,
      availability: 99.21
    },
    {
      month: "Окт",
      date: "2025-10-01",
      incidents: 19,
      resolved: 17,
      spend: 252500,
      availability: 99.37
    },
    {
      month: "Ноя",
      date: "2025-11-01",
      incidents: 22,
      resolved: 20,
      spend: 268200,
      availability: 99.28
    },
    {
      month: "Дек",
      date: "2025-12-01",
      incidents: 16,
      resolved: 14,
      spend: 274000,
      availability: 99.49
    },
    {
      month: "Янв",
      date: "2026-01-01",
      incidents: 14,
      resolved: 13,
      spend: 281100,
      availability: 99.58
    },
    {
      month: "Фев",
      date: "2026-02-01",
      incidents: 12,
      resolved: 11,
      spend: 290800,
      availability: 99.63
    }
  ],
  serviceHealth: [
    { service: "API Gateway", errorRate: 0.08 },
    { service: "Billing", errorRate: 0.16 },
    { service: "Auth", errorRate: 0.07 },
    { service: "Client Portal", errorRate: 0.23 },
    { service: "Internal CRM", errorRate: 0.05 }
  ]
};

const users: UserProfile[] = [
  {
    id: "u-001",
    fullName: "Ирина Белова",
    role: "Руководитель направления",
    department: "Платформенная разработка",
    team: "Platform",
    isLeader: true,
    email: "i.belova@zenvy.local",
    phone: "+7 900 100-10-01",
    location: "Москва HQ-3",
    workMode: "hybrid",
    status: "active",
    startDate: "2021-03-15",
    managerName: "Александр Виноградов",
    bio: "Отвечает за развитие платформы CRM и инженерные стандарты.",
    skills: ["System Design", "People Management", "Backend"]
  },
  {
    id: "u-002",
    fullName: "Михаил Серов",
    role: "Тимлид",
    department: "Платформенная разработка",
    team: "Core CRM",
    isLeader: true,
    email: "m.serov@zenvy.local",
    phone: "+7 900 100-10-02",
    location: "Москва HQ-3",
    workMode: "hybrid",
    status: "active",
    startDate: "2022-01-20",
    managerName: "Ирина Белова",
    bio: "Ведет разработку ключевых модулей CRM.",
    skills: ["React", "Node.js", "Architecture"]
  },
  {
    id: "u-003",
    fullName: "Олег Румянцев",
    role: "Senior Frontend Engineer",
    department: "Платформенная разработка",
    team: "Core CRM",
    isLeader: false,
    email: "o.rumyantsev@zenvy.local",
    phone: "+7 900 100-10-03",
    location: "Москва HQ-4",
    workMode: "office",
    status: "active",
    startDate: "2023-05-11",
    managerName: "Михаил Серов",
    bio: "Разрабатывает клиентские интерфейсы CRM.",
    skills: ["TypeScript", "React", "UI Architecture"]
  },
  {
    id: "u-004",
    fullName: "Евгения Фролова",
    role: "Тимлид",
    department: "Платформенная разработка",
    team: "Billing API",
    isLeader: true,
    email: "e.frolova@zenvy.local",
    phone: "+7 900 100-10-04",
    location: "Москва HQ-3",
    workMode: "hybrid",
    status: "active",
    startDate: "2022-06-01",
    managerName: "Ирина Белова",
    bio: "Отвечает за биллинговую платформу и интеграции оплат.",
    skills: ["Java", "Microservices", "Leadership"]
  },
  {
    id: "u-005",
    fullName: "Дмитрий Аверин",
    role: "Backend Engineer",
    department: "Платформенная разработка",
    team: "Billing API",
    isLeader: false,
    email: "d.averin@zenvy.local",
    phone: "+7 900 100-10-05",
    location: "Санкт-Петербург",
    workMode: "remote",
    status: "active",
    startDate: "2024-02-07",
    managerName: "Евгения Фролова",
    bio: "Развивает API и расчетные сервисы.",
    skills: ["Go", "PostgreSQL", "Kafka"]
  },
  {
    id: "u-006",
    fullName: "Никита Егоров",
    role: "Руководитель направления",
    department: "Инфраструктура и SRE",
    team: "Infrastructure",
    isLeader: true,
    email: "n.egorov@zenvy.local",
    phone: "+7 900 100-10-06",
    location: "Москва HQ-2",
    workMode: "office",
    status: "active",
    startDate: "2020-11-10",
    managerName: "Александр Виноградов",
    bio: "Курирует надежность и эксплуатацию сервисов.",
    skills: ["SRE", "Kubernetes", "Incident Management"]
  },
  {
    id: "u-007",
    fullName: "Андрей Козлов",
    role: "SRE Lead",
    department: "Инфраструктура и SRE",
    team: "SRE",
    isLeader: true,
    email: "a.kozlov@zenvy.local",
    phone: "+7 900 100-10-07",
    location: "Москва HQ-2",
    workMode: "hybrid",
    status: "active",
    startDate: "2022-02-16",
    managerName: "Никита Егоров",
    bio: "Отвечает за мониторинг и доступность платформы.",
    skills: ["Prometheus", "Grafana", "Terraform"]
  },
  {
    id: "u-008",
    fullName: "Глеб Орехов",
    role: "SRE Engineer",
    department: "Инфраструктура и SRE",
    team: "SRE",
    isLeader: false,
    email: "g.orekhov@zenvy.local",
    phone: "+7 900 100-10-08",
    location: "Казань",
    workMode: "remote",
    status: "active",
    startDate: "2024-01-18",
    managerName: "Андрей Козлов",
    bio: "Автоматизирует операционные процессы.",
    skills: ["Linux", "CI/CD", "Observability"]
  },
  {
    id: "u-009",
    fullName: "Анна Волкова",
    role: "CloudOps Lead",
    department: "Инфраструктура и SRE",
    team: "Cloud Ops",
    isLeader: true,
    email: "a.volkova@zenvy.local",
    phone: "+7 900 100-10-09",
    location: "Москва HQ-2",
    workMode: "hybrid",
    status: "active",
    startDate: "2021-09-03",
    managerName: "Никита Егоров",
    bio: "Отвечает за облачную инфраструктуру.",
    skills: ["AWS", "Kubernetes", "Cost Optimization"]
  },
  {
    id: "u-010",
    fullName: "Павел Демидов",
    role: "CISO / Руководитель направления",
    department: "Безопасность",
    team: "Security",
    isLeader: true,
    email: "p.demidov@zenvy.local",
    phone: "+7 900 100-10-10",
    location: "Москва HQ-1",
    workMode: "office",
    status: "active",
    startDate: "2019-08-19",
    managerName: "Александр Виноградов",
    bio: "Формирует стратегию информационной безопасности.",
    skills: ["Security Strategy", "Risk Management", "GRC"]
  },
  {
    id: "u-011",
    fullName: "Даниил Мельник",
    role: "SOC Lead",
    department: "Безопасность",
    team: "SOC",
    isLeader: true,
    email: "d.melnik@zenvy.local",
    phone: "+7 900 100-10-11",
    location: "Москва HQ-1",
    workMode: "hybrid",
    status: "active",
    startDate: "2022-03-28",
    managerName: "Павел Демидов",
    bio: "Координирует работу центра мониторинга ИБ.",
    skills: ["SIEM", "Threat Detection", "Incident Response"]
  },
  {
    id: "u-012",
    fullName: "Кира Пантелеева",
    role: "AppSec Lead",
    department: "Безопасность",
    team: "AppSec",
    isLeader: true,
    email: "k.panteleeva@zenvy.local",
    phone: "+7 900 100-10-12",
    location: "Москва HQ-1",
    workMode: "hybrid",
    status: "active",
    startDate: "2023-01-12",
    managerName: "Павел Демидов",
    bio: "Внедряет secure-by-design в процесс разработки.",
    skills: ["Application Security", "SAST/DAST", "Threat Modeling"]
  },
  {
    id: "u-013",
    fullName: "Елена Тюрина",
    role: "Head of Product",
    department: "Продукт и аналитика",
    team: "Product",
    isLeader: true,
    email: "e.tyurina@zenvy.local",
    phone: "+7 900 100-10-13",
    location: "Москва HQ-5",
    workMode: "hybrid",
    status: "active",
    startDate: "2021-04-05",
    managerName: "Александр Виноградов",
    bio: "Отвечает за продуктовую стратегию и roadmap.",
    skills: ["Product Strategy", "Analytics", "Discovery"]
  },
  {
    id: "u-014",
    fullName: "Ксения Зуева",
    role: "Senior Product Manager",
    department: "Продукт и аналитика",
    team: "Product",
    isLeader: false,
    email: "k.zueva@zenvy.local",
    phone: "+7 900 100-10-14",
    location: "Москва HQ-5",
    workMode: "hybrid",
    status: "active",
    startDate: "2022-10-24",
    managerName: "Елена Тюрина",
    bio: "Курирует развитие CRM-модулей и пользовательский опыт.",
    skills: ["Roadmap", "A/B Testing", "Stakeholder Management"]
  },
  {
    id: "u-015",
    fullName: "Артем Клименко",
    role: "Design Lead",
    department: "Продукт и аналитика",
    team: "UX/UI",
    isLeader: true,
    email: "a.klimenko@zenvy.local",
    phone: "+7 900 100-10-15",
    location: "Екатеринбург",
    workMode: "remote",
    status: "vacation",
    startDate: "2023-03-17",
    managerName: "Елена Тюрина",
    bio: "Формирует дизайн-систему и стандарты UX.",
    skills: ["Design Systems", "UX", "Prototyping"]
  },
  {
    id: "u-016",
    fullName: "Леонид Мартынов",
    role: "Data Lead",
    department: "Продукт и аналитика",
    team: "Data",
    isLeader: true,
    email: "l.martynov@zenvy.local",
    phone: "+7 900 100-10-16",
    location: "Москва HQ-5",
    workMode: "office",
    status: "active",
    startDate: "2020-12-08",
    managerName: "Елена Тюрина",
    bio: "Управляет аналитической функцией и data quality.",
    skills: ["SQL", "BI", "Data Governance"]
  },
  {
    id: "u-017",
    fullName: "Владимир Савин",
    role: "Frontend Engineer",
    department: "Платформенная разработка",
    team: "Core CRM",
    isLeader: false,
    email: "v.savin@zenvy.local",
    phone: "+7 900 100-10-17",
    location: "Нижний Новгород",
    workMode: "remote",
    status: "active",
    startDate: "2024-06-03",
    managerName: "Михаил Серов",
    bio: "Разрабатывает интерфейсы модулей управления инфраструктурой.",
    skills: ["React", "TypeScript", "Testing"]
  },
  {
    id: "u-018",
    fullName: "Мария Руденко",
    role: "QA Lead",
    department: "Платформенная разработка",
    team: "Core CRM",
    isLeader: true,
    email: "m.rudenko@zenvy.local",
    phone: "+7 900 100-10-18",
    location: "Москва HQ-3",
    workMode: "hybrid",
    status: "active",
    startDate: "2022-08-15",
    managerName: "Ирина Белова",
    bio: "Отвечает за стратегию тестирования CRM и качество релизов.",
    skills: ["QA Strategy", "Cypress", "Test Automation"]
  },
  {
    id: "u-019",
    fullName: "Илья Гурьев",
    role: "Cloud Engineer",
    department: "Инфраструктура и SRE",
    team: "Cloud Ops",
    isLeader: false,
    email: "i.guryev@zenvy.local",
    phone: "+7 900 100-10-19",
    location: "Москва HQ-2",
    workMode: "office",
    status: "active",
    startDate: "2023-11-20",
    managerName: "Анна Волкова",
    bio: "Сопровождает облачную сеть и Terraform-ландшафт.",
    skills: ["AWS", "Terraform", "Networking"]
  },
  {
    id: "u-020",
    fullName: "Светлана Казакова",
    role: "SRE Engineer",
    department: "Инфраструктура и SRE",
    team: "SRE",
    isLeader: false,
    email: "s.kazakova@zenvy.local",
    phone: "+7 900 100-10-20",
    location: "Самара",
    workMode: "remote",
    status: "active",
    startDate: "2024-04-11",
    managerName: "Андрей Козлов",
    bio: "Улучшает наблюдаемость и reliability-процессы сервисов.",
    skills: ["Prometheus", "Incident Response", "Linux"]
  },
  {
    id: "u-021",
    fullName: "Наталья Сергеева",
    role: "Security Analyst",
    department: "Безопасность",
    team: "SOC",
    isLeader: false,
    email: "n.sergeeva@zenvy.local",
    phone: "+7 900 100-10-21",
    location: "Москва HQ-1",
    workMode: "hybrid",
    status: "active",
    startDate: "2023-09-07",
    managerName: "Даниил Мельник",
    bio: "Мониторит инциденты ИБ и координирует первичное реагирование.",
    skills: ["SIEM", "Threat Hunting", "IR"]
  },
  {
    id: "u-022",
    fullName: "Роман Федотов",
    role: "AppSec Engineer",
    department: "Безопасность",
    team: "AppSec",
    isLeader: false,
    email: "r.fedotov@zenvy.local",
    phone: "+7 900 100-10-22",
    location: "Санкт-Петербург",
    workMode: "remote",
    status: "vacation",
    startDate: "2023-02-13",
    managerName: "Кира Пантелеева",
    bio: "Ведет threat modeling и проверку критичных сервисов.",
    skills: ["Threat Modeling", "SAST", "Security Review"]
  },
  {
    id: "u-023",
    fullName: "Ольга Кузьмина",
    role: "Business Analyst",
    department: "Продукт и аналитика",
    team: "Product",
    isLeader: false,
    email: "o.kuzmina@zenvy.local",
    phone: "+7 900 100-10-23",
    location: "Москва HQ-5",
    workMode: "office",
    status: "active",
    startDate: "2024-01-22",
    managerName: "Елена Тюрина",
    bio: "Собирает требования и метрики эффективности продуктовых потоков.",
    skills: ["BPMN", "SQL", "Product Analytics"]
  },
  {
    id: "u-024",
    fullName: "Григорий Ершов",
    role: "Data Engineer",
    department: "Продукт и аналитика",
    team: "Data",
    isLeader: false,
    email: "g.ershov@zenvy.local",
    phone: "+7 900 100-10-24",
    location: "Новосибирск",
    workMode: "remote",
    status: "active",
    startDate: "2023-07-31",
    managerName: "Леонид Мартынов",
    bio: "Развивает витрины и пайплайны данных для внутренних отчётов.",
    skills: ["Airflow", "dbt", "PostgreSQL"]
  }
];

const generatedFirstNames = [
  "Алексей",
  "Иван",
  "Сергей",
  "Максим",
  "Петр",
  "Денис",
  "Юрий",
  "Тимур",
  "Филипп",
  "Константин"
];

const generatedLastNames = [
  "Смирнов",
  "Иванов",
  "Кузнецов",
  "Соколов",
  "Попов",
  "Лебедев",
  "Козлов",
  "Новиков",
  "Морозов",
  "Петров"
];

const generatedRoles = [
  "Frontend Engineer",
  "Backend Engineer",
  "QA Engineer",
  "DevOps Engineer",
  "Business Analyst"
] as const;

const generatedDepartments = [
  { department: "Платформенная разработка", team: "Core CRM", managerName: "Михаил Серов" },
  { department: "Платформенная разработка", team: "Billing API", managerName: "Евгения Фролова" },
  { department: "Инфраструктура и SRE", team: "SRE", managerName: "Андрей Козлов" },
  { department: "Инфраструктура и SRE", team: "Cloud Ops", managerName: "Анна Волкова" },
  { department: "Безопасность", team: "SOC", managerName: "Даниил Мельник" },
  { department: "Безопасность", team: "AppSec", managerName: "Кира Пантелеева" },
  { department: "Продукт и аналитика", team: "Product", managerName: "Елена Тюрина" },
  { department: "Продукт и аналитика", team: "Data", managerName: "Леонид Мартынов" }
] as const;

const generatedLocations = [
  "Москва HQ-1",
  "Москва HQ-2",
  "Москва HQ-3",
  "Санкт-Петербург",
  "Казань",
  "Екатеринбург",
  "Новосибирск",
  "Нижний Новгород"
] as const;

const generatedSkills = [
  ["React", "TypeScript", "Testing"],
  ["Node.js", "PostgreSQL", "Kafka"],
  ["Cypress", "Playwright", "QA Automation"],
  ["Kubernetes", "Terraform", "Linux"],
  ["SQL", "BPMN", "Product Analytics"]
] as const;

const extraUsers: UserProfile[] = Array.from({ length: 210 }, (_, index) => {
  const num = index + 101;
  const firstName = generatedFirstNames[index % generatedFirstNames.length];
  const lastName = generatedLastNames[Math.floor(index / 3) % generatedLastNames.length];
  const fullName = `${firstName} ${lastName}`;
  const deptInfo = generatedDepartments[index % generatedDepartments.length];
  const role = generatedRoles[index % generatedRoles.length];
  const skills = generatedSkills[index % generatedSkills.length];
  const month = String((index % 12) + 1).padStart(2, "0");
  const day = String((index % 27) + 1).padStart(2, "0");
  const phoneSuffix = String(num).padStart(3, "0");

  return {
    id: `u-${String(num).padStart(3, "0")}`,
    fullName,
    role,
    department: deptInfo.department,
    team: deptInfo.team,
    isLeader: index % 17 === 0,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${num}@zenvy.local`,
    phone: `+7 900 200-${phoneSuffix.slice(0, 2)}-${phoneSuffix.slice(1, 3)}`,
    location: generatedLocations[index % generatedLocations.length],
    workMode: index % 3 === 0 ? "office" : index % 3 === 1 ? "hybrid" : "remote",
    status: index % 12 === 0 ? "vacation" : "active",
    startDate: `2024-${month}-${day}`,
    managerName: deptInfo.managerName,
    bio: `${role} команды ${deptInfo.team}.`,
    skills: [...skills]
  };
});

const allUsers: UserProfile[] = [...users, ...extraUsers];

const requests: ServiceRequest[] = [
  {
    id: "REQ-2101",
    title: "Выдать доступ в Prod Grafana",
    type: "access",
    priority: "high",
    status: "in_review",
    requester: "Михаил Серов",
    assignee: "Даниил Мельник",
    relatedAssetId: "A-108",
    createdAt: "2026-02-28",
    dueAt: "2026-03-07"
  },
  {
    id: "REQ-2102",
    title: "Создать namespace для команды Billing API",
    type: "infrastructure",
    priority: "medium",
    status: "approved",
    requester: "Евгения Фролова",
    assignee: "Андрей Козлов",
    relatedAssetId: "A-105",
    createdAt: "2026-03-01",
    dueAt: "2026-03-10"
  },
  {
    id: "REQ-2103",
    title: "Закупка 10 SSD 2TB для DR-стенда",
    type: "procurement",
    priority: "medium",
    status: "submitted",
    requester: "Анна Волкова",
    assignee: "Никита Егоров",
    relatedAssetId: "A-110",
    createdAt: "2026-03-03",
    dueAt: "2026-03-17"
  },
  {
    id: "REQ-2104",
    title: "Временное исключение WAF для internal API",
    type: "security_exception",
    priority: "critical",
    status: "in_progress",
    requester: "Дмитрий Аверин",
    assignee: "Кира Пантелеева",
    relatedAssetId: "A-107",
    createdAt: "2026-03-02",
    dueAt: "2026-03-06"
  },
  {
    id: "REQ-2105",
    title: "Замена ноутбука сотрудника Core CRM",
    type: "hardware",
    priority: "low",
    status: "done",
    requester: "Ирина Белова",
    assignee: "Анна Волкова",
    relatedAssetId: "A-103",
    createdAt: "2026-02-20",
    dueAt: "2026-03-01"
  },
  {
    id: "REQ-2106",
    title: "Создать VPN доступ для подрядчика",
    type: "access",
    priority: "high",
    status: "submitted",
    requester: "Мария Руденко",
    assignee: "Наталья Сергеева",
    relatedAssetId: null,
    createdAt: "2026-03-04",
    dueAt: "2026-03-11"
  },
  {
    id: "REQ-2107",
    title: "Расширить лимит диска в namespace core-crm",
    type: "infrastructure",
    priority: "medium",
    status: "in_progress",
    requester: "Михаил Серов",
    assignee: "Андрей Козлов",
    relatedAssetId: "A-105",
    createdAt: "2026-03-05",
    dueAt: "2026-03-13"
  },
  {
    id: "REQ-2108",
    title: "Закупка 5 MacBook для Product Team",
    type: "procurement",
    priority: "high",
    status: "approved",
    requester: "Елена Тюрина",
    assignee: "Никита Егоров",
    relatedAssetId: "A-119",
    createdAt: "2026-03-01",
    dueAt: "2026-03-18"
  },
  {
    id: "REQ-2109",
    title: "Исключение egress правила для интеграции с банком",
    type: "security_exception",
    priority: "critical",
    status: "in_review",
    requester: "Евгения Фролова",
    assignee: "Кира Пантелеева",
    relatedAssetId: "A-107",
    createdAt: "2026-03-03",
    dueAt: "2026-03-08"
  },
  {
    id: "REQ-2110",
    title: "Заменить неисправный монитор в QA зоне",
    type: "hardware",
    priority: "low",
    status: "done",
    requester: "Мария Руденко",
    assignee: "Анна Волкова",
    relatedAssetId: "A-119",
    createdAt: "2026-02-24",
    dueAt: "2026-03-05"
  },
  {
    id: "REQ-2111",
    title: "Открыть доступ к Kibana индексам billing-*",
    type: "access",
    priority: "medium",
    status: "approved",
    requester: "Дмитрий Аверин",
    assignee: "Даниил Мельник",
    relatedAssetId: null,
    createdAt: "2026-03-02",
    dueAt: "2026-03-09"
  },
  {
    id: "REQ-2112",
    title: "Перенести batch-джобы на новый пул воркеров",
    type: "infrastructure",
    priority: "high",
    status: "in_progress",
    requester: "Леонид Мартынов",
    assignee: "Глеб Орехов",
    relatedAssetId: "A-116",
    createdAt: "2026-03-04",
    dueAt: "2026-03-16"
  },
  {
    id: "REQ-2113",
    title: "Закупить дополнительные лицензии JetBrains",
    type: "procurement",
    priority: "medium",
    status: "submitted",
    requester: "Ирина Белова",
    assignee: "Никита Егоров",
    relatedAssetId: "A-109",
    createdAt: "2026-03-06",
    dueAt: "2026-03-20"
  },
  {
    id: "REQ-2114",
    title: "Временное ослабление CSP для legacy виджета",
    type: "security_exception",
    priority: "high",
    status: "rejected",
    requester: "Владимир Савин",
    assignee: "Кира Пантелеева",
    relatedAssetId: null,
    createdAt: "2026-02-26",
    dueAt: "2026-03-04"
  },
  {
    id: "REQ-2115",
    title: "Выдать запасной ноутбук новому разработчику",
    type: "hardware",
    priority: "medium",
    status: "approved",
    requester: "Михаил Серов",
    assignee: "Анна Волкова",
    relatedAssetId: "A-113",
    createdAt: "2026-03-07",
    dueAt: "2026-03-14"
  },
  {
    id: "REQ-2116",
    title: "Доступ в read-only БД для аналитиков",
    type: "access",
    priority: "low",
    status: "done",
    requester: "Ольга Кузьмина",
    assignee: "Даниил Мельник",
    relatedAssetId: null,
    createdAt: "2026-02-22",
    dueAt: "2026-02-28"
  },
  {
    id: "REQ-2117",
    title: "Поднять тестовый Redis-кластер для эксперимента",
    type: "infrastructure",
    priority: "medium",
    status: "in_review",
    requester: "Григорий Ершов",
    assignee: "Андрей Козлов",
    relatedAssetId: null,
    createdAt: "2026-03-08",
    dueAt: "2026-03-19"
  }
];

const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "KB-3001",
    title: "Runbook: деградация API Gateway",
    category: "runbook",
    tags: ["incident", "api", "sre"],
    ownerTeam: "SRE",
    updatedAt: "2026-03-04",
    summary: "Пошаговый процесс диагностики 5xx, проверка лимитов и rollback балансировки.",
    status: "approved"
  },
  {
    id: "KB-3002",
    title: "Политика выдачи привилегированных доступов",
    category: "policy",
    tags: ["security", "access", "compliance"],
    ownerTeam: "Security",
    updatedAt: "2026-02-18",
    summary: "Требования к согласованию, сроку действия и аудиту повышенных доступов.",
    status: "approved"
  },
  {
    id: "KB-3003",
    title: "How-to: подключение сервиса к централизованному логированию",
    category: "howto",
    tags: ["logging", "platform", "onboarding"],
    ownerTeam: "Platform",
    updatedAt: "2026-03-01",
    summary: "Инструкция по формату логов, ретеншну и шаблонам дашбордов.",
    status: "approved"
  },
  {
    id: "KB-3004",
    title: "Архитектура: модель ролей CRM",
    category: "architecture",
    tags: ["rbac", "crm", "auth"],
    ownerTeam: "Core CRM",
    updatedAt: "2026-01-29",
    summary: "Описание доменных ролей, permission matrix и ограничений по окружениям.",
    status: "draft"
  },
  {
    id: "KB-3005",
    title: "Runbook: восстановление после падения Redis",
    category: "runbook",
    tags: ["redis", "incident", "recovery"],
    ownerTeam: "SRE",
    updatedAt: "2026-03-07",
    summary: "Диагностика, failover и проверка консистентности кэша после аварии.",
    status: "approved"
  },
  {
    id: "KB-3006",
    title: "How-to: настройка алертов в Grafana",
    category: "howto",
    tags: ["monitoring", "grafana", "alerts"],
    ownerTeam: "SRE",
    updatedAt: "2026-03-05",
    summary: "Пошаговая настройка contact points, правил и шумоподавления.",
    status: "approved"
  },
  {
    id: "KB-3007",
    title: "Политика хранения персональных данных",
    category: "policy",
    tags: ["compliance", "privacy", "security"],
    ownerTeam: "Security",
    updatedAt: "2026-02-25",
    summary: "Сроки хранения, доступы, порядок удаления и аудита данных пользователей.",
    status: "approved"
  },
  {
    id: "KB-3008",
    title: "Архитектура: event-driven интеграции CRM",
    category: "architecture",
    tags: ["events", "kafka", "integration"],
    ownerTeam: "Platform",
    updatedAt: "2026-02-14",
    summary: "Принципы контрактов событий, ретраи и дедупликация сообщений.",
    status: "draft"
  },
  {
    id: "KB-3009",
    title: "How-to: запуск smoke-тестов перед релизом",
    category: "howto",
    tags: ["qa", "release", "testing"],
    ownerTeam: "Core CRM",
    updatedAt: "2026-03-02",
    summary: "Чеклист smoke-сценариев и критерии блокировки релиза.",
    status: "approved"
  },
  {
    id: "KB-3010",
    title: "Runbook: деградация очередей Kafka",
    category: "runbook",
    tags: ["kafka", "lag", "incident"],
    ownerTeam: "Infrastructure",
    updatedAt: "2026-03-06",
    summary: "Как локализовать рост lag, перераспределить consumers и стабилизировать SLA.",
    status: "approved"
  }
];

const automationJobs: AutomationJob[] = [
  {
    id: "JOB-5101",
    name: "Auto-Restart unhealthy pods",
    owner: "SRE",
    trigger: "Каждые 15 минут",
    criticality: "high",
    lastRunAt: "2026-03-06T11:45:00",
    successRate: 99.4,
    status: "healthy",
    linkedRunbookId: "KB-3001"
  },
  {
    id: "JOB-5102",
    name: "Nightly backup verification",
    owner: "Infrastructure",
    trigger: "Ежедневно 02:30",
    criticality: "high",
    lastRunAt: "2026-03-06T02:30:00",
    successRate: 96.2,
    status: "warning",
    linkedRunbookId: "KB-3003"
  },
  {
    id: "JOB-5103",
    name: "Rotate stale IAM keys",
    owner: "Security",
    trigger: "Каждый понедельник 05:00",
    criticality: "medium",
    lastRunAt: "2026-03-02T05:00:00",
    successRate: 91.7,
    status: "warning",
    linkedRunbookId: "KB-3002"
  },
  {
    id: "JOB-5104",
    name: "Sync CMDB with cloud assets",
    owner: "Cloud Ops",
    trigger: "Каждые 4 часа",
    criticality: "medium",
    lastRunAt: "2026-03-06T12:00:00",
    successRate: 88.5,
    status: "failing",
    linkedRunbookId: "KB-3003"
  },
  {
    id: "JOB-5105",
    name: "Daily SLO report export",
    owner: "SRE",
    trigger: "Ежедневно 09:00",
    criticality: "medium",
    lastRunAt: "2026-03-06T09:00:00",
    successRate: 97.8,
    status: "healthy",
    linkedRunbookId: "KB-3001"
  },
  {
    id: "JOB-5106",
    name: "Cleanup stale feature flags",
    owner: "Platform",
    trigger: "Каждую пятницу 20:00",
    criticality: "low",
    lastRunAt: "2026-03-05T20:00:00",
    successRate: 92.4,
    status: "warning",
    linkedRunbookId: "KB-3003"
  },
  {
    id: "JOB-5107",
    name: "Validate backup integrity",
    owner: "Infrastructure",
    trigger: "Ежедневно 03:00",
    criticality: "high",
    lastRunAt: "2026-03-06T03:00:00",
    successRate: 98.6,
    status: "healthy",
    linkedRunbookId: "KB-3001"
  },
  {
    id: "JOB-5108",
    name: "Rotate CI service tokens",
    owner: "Security",
    trigger: "Каждые 12 часов",
    criticality: "medium",
    lastRunAt: "2026-03-06T12:00:00",
    successRate: 90.9,
    status: "warning",
    linkedRunbookId: "KB-3002"
  },
  {
    id: "JOB-5109",
    name: "Reconcile IAM drift",
    owner: "Security",
    trigger: "Ежедневно 06:00",
    criticality: "high",
    lastRunAt: "2026-03-06T06:00:00",
    successRate: 86.4,
    status: "failing",
    linkedRunbookId: "KB-3002"
  },
  {
    id: "JOB-5110",
    name: "Rebuild analytics marts",
    owner: "Data",
    trigger: "Ежедневно 01:30",
    criticality: "medium",
    lastRunAt: "2026-03-06T01:30:00",
    successRate: 95.2,
    status: "healthy",
    linkedRunbookId: "KB-3003"
  },
  {
    id: "JOB-5111",
    name: "Cleanup orphaned cloud snapshots",
    owner: "Cloud Ops",
    trigger: "Каждый вторник 04:00",
    criticality: "low",
    lastRunAt: "2026-03-03T04:00:00",
    successRate: 93.1,
    status: "warning",
    linkedRunbookId: "KB-3003"
  },
  {
    id: "JOB-5112",
    name: "Sync HR users to IAM",
    owner: "Security",
    trigger: "Каждые 2 часа",
    criticality: "high",
    lastRunAt: "2026-03-06T12:00:00",
    successRate: 99.1,
    status: "healthy",
    linkedRunbookId: "KB-3002"
  },
  {
    id: "JOB-5113",
    name: "Auto-close stale low-priority requests",
    owner: "Core CRM",
    trigger: "Ежедневно 23:00",
    criticality: "low",
    lastRunAt: "2026-03-05T23:00:00",
    successRate: 96.8,
    status: "healthy",
    linkedRunbookId: "KB-3003"
  },
  {
    id: "JOB-5114",
    name: "Refresh CDN edge rules",
    owner: "Infrastructure",
    trigger: "Каждые 6 часов",
    criticality: "medium",
    lastRunAt: "2026-03-06T12:00:00",
    successRate: 89.2,
    status: "failing",
    linkedRunbookId: "KB-3001"
  }
];

const integrations: IntegrationConnection[] = [
  {
    id: "INT-9001",
    name: "Jira Service Management",
    type: "ticketing",
    ownerTeam: "Core CRM",
    status: "connected",
    lastSyncAt: "2026-03-06T11:50:00",
    incidents30d: 1
  },
  {
    id: "INT-9002",
    name: "Grafana Cloud",
    type: "monitoring",
    ownerTeam: "SRE",
    status: "connected",
    lastSyncAt: "2026-03-06T11:59:00",
    incidents30d: 0
  },
  {
    id: "INT-9003",
    name: "GitLab",
    type: "vcs",
    ownerTeam: "Platform",
    status: "degraded",
    lastSyncAt: "2026-03-06T10:12:00",
    incidents30d: 3
  },
  {
    id: "INT-9004",
    name: "Keycloak SSO",
    type: "identity",
    ownerTeam: "Security",
    status: "connected",
    lastSyncAt: "2026-03-06T11:40:00",
    incidents30d: 1
  },
  {
    id: "INT-9005",
    name: "Slack ChatOps",
    type: "chatops",
    ownerTeam: "SRE",
    status: "disconnected",
    lastSyncAt: null,
    incidents30d: 4
  },
  {
    id: "INT-9006",
    name: "PagerDuty",
    type: "monitoring",
    ownerTeam: "SRE",
    status: "connected",
    lastSyncAt: "2026-03-06T11:42:00",
    incidents30d: 1
  },
  {
    id: "INT-9007",
    name: "Confluence",
    type: "vcs",
    ownerTeam: "Platform",
    status: "degraded",
    lastSyncAt: "2026-03-06T09:50:00",
    incidents30d: 2
  },
  {
    id: "INT-9008",
    name: "Okta Workforce",
    type: "identity",
    ownerTeam: "Security",
    status: "connected",
    lastSyncAt: "2026-03-06T11:33:00",
    incidents30d: 0
  },
  {
    id: "INT-9009",
    name: "Microsoft Teams",
    type: "chatops",
    ownerTeam: "SRE",
    status: "degraded",
    lastSyncAt: "2026-03-06T10:01:00",
    incidents30d: 3
  },
  {
    id: "INT-9010",
    name: "ServiceNow",
    type: "ticketing",
    ownerTeam: "Core CRM",
    status: "connected",
    lastSyncAt: "2026-03-06T11:58:00",
    incidents30d: 1
  },
  {
    id: "INT-9011",
    name: "Datadog",
    type: "monitoring",
    ownerTeam: "SRE",
    status: "connected",
    lastSyncAt: "2026-03-06T11:54:00",
    incidents30d: 0
  },
  {
    id: "INT-9012",
    name: "Bitbucket",
    type: "vcs",
    ownerTeam: "Platform",
    status: "disconnected",
    lastSyncAt: null,
    incidents30d: 5
  },
  {
    id: "INT-9013",
    name: "Azure AD",
    type: "identity",
    ownerTeam: "Security",
    status: "connected",
    lastSyncAt: "2026-03-06T11:22:00",
    incidents30d: 0
  },
  {
    id: "INT-9014",
    name: "Mattermost",
    type: "chatops",
    ownerTeam: "SRE",
    status: "connected",
    lastSyncAt: "2026-03-06T11:10:00",
    incidents30d: 1
  },
  {
    id: "INT-9015",
    name: "Freshservice",
    type: "ticketing",
    ownerTeam: "Core CRM",
    status: "degraded",
    lastSyncAt: "2026-03-06T08:43:00",
    incidents30d: 4
  }
];

type WebhookStatus = "pending" | "delivered" | "failed";

export interface WebhookEvent {
  id: string;
  source: string;
  eventType: string;
  status: WebhookStatus;
  attempts: number;
  lastError: string | null;
  createdAt: string;
}

const webhookEvents: WebhookEvent[] = [
  {
    id: "WH-1001",
    source: "Stripe",
    eventType: "invoice.payment_succeeded",
    status: "failed",
    attempts: 3,
    lastError: "Timeout from partner endpoint",
    createdAt: "2026-03-21T10:30:00"
  },
  {
    id: "WH-1002",
    source: "GitHub",
    eventType: "push",
    status: "pending",
    attempts: 1,
    lastError: null,
    createdAt: "2026-03-23T08:12:00"
  },
  {
    id: "WH-1003",
    source: "Slack",
    eventType: "team_join",
    status: "delivered",
    attempts: 1,
    lastError: null,
    createdAt: "2026-03-22T18:45:00"
  },
  {
    id: "WH-1004",
    source: "Jira",
    eventType: "issue_updated",
    status: "failed",
    attempts: 2,
    lastError: "401 Unauthorized from callback URL",
    createdAt: "2026-03-23T07:50:00"
  }
];

const posts: Post[] = [
  {
    id: "POST-1001",
    title: "Релиз CRM 2.4",
    body: "Добавлены быстрые фильтры, оптимизированы таблицы и исправлены ошибки в уведомлениях.",
    category: "release",
    author: "Ирина Белова",
    createdAt: "2026-03-10T09:20:00"
  },
  {
    id: "POST-1002",
    title: "Инцидент: деградация API Gateway",
    body: "Зафиксирован рост 5xx. Проведены rollback и ребалансировка трафика.",
    category: "incident",
    author: "Андрей Козлов",
    createdAt: "2026-03-12T14:40:00"
  },
  {
    id: "POST-1003",
    title: "Как оформить запрос на доступ",
    body: "Новый чеклист по согласованию доступов и срокам предоставления прав.",
    category: "howto",
    author: "Кира Пантелеева",
    createdAt: "2026-03-14T11:10:00"
  }
];

let nextPostId = 1004;

export const mockApi = {
  async getAssets() {
    await sleep(180);
    return assets;
  },
  async getDashboardKpi() {
    await sleep(140);
    return dashboardKpi;
  },
  async getUsers() {
    await sleep(170);
    return allUsers;
  },
  async getUserById(userId: string) {
    await sleep(120);
    return allUsers.find((user) => user.id === userId) ?? null;
  },
  async getRequests() {
    await sleep(160);
    return requests;
  },
  async getKnowledgeArticles() {
    await sleep(140);
    return knowledgeArticles;
  },
  async getKnowledgeById(articleId: string) {
    await sleep(120);
    return knowledgeArticles.find((article) => article.id === articleId) ?? null;
  },
  async getAutomationJobs() {
    await sleep(150);
    return automationJobs;
  },
  async getIntegrations() {
    await sleep(140);
    return integrations;
  },
  async getWebhookEvents() {
    await sleep(180);
    return webhookEvents;
  },
  async retryWebhookEvent(id: string) {
    await sleep(220);

    const event = webhookEvents.find((item) => item.id === id);
    if (!event) {
      throw new Error("Webhook event not found");
    }

    event.attempts += 1;
    event.status = "delivered";
    event.lastError = null;

    return event;
  },
  async getPosts() {
    await sleep(180);
    return posts;
  },
  async getPostById(postId: string) {
    await sleep(140);
    return posts.find((post) => post.id === postId) ?? null;
  },
  async createPost(payload: CreatePostPayload) {
    await sleep(220);
    const createdPost: Post = {
      id: `POST-${nextPostId++}`,
      title: payload.title.trim(),
      body: payload.body.trim(),
      category: payload.category,
      author: payload.author.trim(),
      createdAt: new Date().toISOString()
    };
    posts.unshift(createdPost);
    return createdPost;
  }
};
