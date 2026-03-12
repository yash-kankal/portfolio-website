import {
  SiTypescript, SiJavascript, SiPython, SiKotlin, SiSwift,
  SiHtml5, SiCss, SiNodedotjs, SiExpress, SiFastapi,
  SiGraphql, SiReact, SiNextdotjs, SiTailwindcss,
  SiJetpackcompose, SiPostgresql, SiRedis, SiMongodb,
  SiMysql, SiElasticsearch, SiDocker, SiKubernetes,
  SiNginx, SiGithubactions, SiPrisma, SiCplusplus,
  SiOpenai, SiGit,
} from "react-icons/si";
import { FaJava, FaDatabase, FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  // Languages
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  Java: FaJava,
  Kotlin: SiKotlin,
  Swift: SiSwift,
  "C++": SiCplusplus,
  HTML: SiHtml5,
  CSS: SiCss,

  // Backend & APIs
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  FastAPI: SiFastapi,
  GraphQL: SiGraphql,

  // Frontend
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,

  // Mobile
  "Jetpack Compose": SiJetpackcompose,
  SwiftUI: SiSwift,

  // Databases
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Elasticsearch: SiElasticsearch,
  "AWS RDS": FaAws,
  Redshift: FaAws,
  Oracle: FaDatabase,

  // Cloud & DevOps
  AWS: FaAws,
  "AWS Lambda": FaAws,
  S3: FaAws,
  Kinesis: FaAws,
  CloudFormation: FaAws,
  RDS: FaAws,
  ECS: FaAws,
  EC2: FaAws,
  "App Runner": FaAws,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Nginx: SiNginx,
  "GitHub Actions": SiGithubactions,
  CodePipeline: FaAws,

  // Architecture / Tooling
  Prisma: SiPrisma,

  // Project extras
  JWT: SiGit,
  "OpenAI API": SiOpenai,
};

const colorMap: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Java: "#007396",
  Kotlin: "#7F52FF",
  Swift: "#F05138",
  "C++": "#00599C",
  HTML: "#E34F26",
  CSS: "#1572B6",
  "Node.js": "#339933",
  "Express.js": "#000000",
  FastAPI: "#009688",
  GraphQL: "#E10098",
  "React.js": "#61DAFB",
  "Next.js": "#000000",
  "Tailwind CSS": "#06B6D4",
  "Jetpack Compose": "#4285F4",
  SwiftUI: "#F05138",
  PostgreSQL: "#4169E1",
  Redis: "#DC382D",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  Elasticsearch: "#FEC514",
  "AWS RDS": "#FF9900",
  Redshift: "#FF9900",
  Oracle: "#F80000",
  AWS: "#FF9900",
  "AWS Lambda": "#FF9900",
  S3: "#FF9900",
  Kinesis: "#FF9900",
  CloudFormation: "#FF9900",
  RDS: "#FF9900",
  ECS: "#FF9900",
  EC2: "#FF9900",
  "App Runner": "#FF9900",
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  Nginx: "#009639",
  "GitHub Actions": "#2088FF",
  CodePipeline: "#FF9900",
  Prisma: "#2D3748",
  JWT: "#000000",
  "OpenAI API": "#412991",
};

interface Props {
  name: string;
  size?: number;
  className?: string;
  colored?: boolean;
}

export default function TechIcon({ name, size = 13, className = "", colored = false }: Props) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  const color = colored ? (colorMap[name] ?? "currentColor") : "currentColor";
  return <Icon size={size} className={className} style={{ color }} />;
}

export { iconMap };
