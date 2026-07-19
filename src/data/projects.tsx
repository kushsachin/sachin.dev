export const projects = [
  {
    id: 1,
    title: "Service Management Platform",
    role: "Software Developer",
    timeframe: "2023 - 2025",
    description:
      "An enterprise SaaS platform for service businesses, Offering CRM, Inventory, Sales, Real-time analytics, and automated workflows.",
    image: "/assets/img/service-management.png",
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Redux",
      "Tailwind",
      "MUI",
    ],
    features: [
      "Sales & Purchase Management",
      "Inventory Tracking with Batch & Serial Management",
      "Role-Based Access Control",
      "GST Reports & Compliance",
      "Automated Workflows",
      "Real-time Analytics Dashboard",
    ],
    metrics: [
      { value: "30%", label: "Faster load times" },
      { value: "25k+", label: "Monthly users" },
      { value: "99.9%", label: "Uptime" },
    ],
    links: {
      demo: "https://srvc.dataalay.com",
      repo: null,
    },
  },
  {
    id: 2,
    title: "Asset Management System",
    role: "Software Developer",
    timeframe: "2024 - 2025",
    description:
      "A robust asset management platform designed for tracking, with integrated warranty, AMC, repair workflows, and real-time insights to optimize efficiency.",
    image: "/assets/img/asset-management.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Material UI"],
    features: [
      "Multi-Location Asset Tracking",
      "Asset Checkout & Returns Management",
      "AMC & Warranty Tracking System",
      "Repair & Insurance Workflow Automation",
      "Role-Based Access Control for Security",
      "Real-time Asset Monitoring & Insights",
    ],
    metrics: [
      { value: "25%", label: "Performance improvement" },
      { value: "10k+", label: "Assets managed" },
      { value: "40%", label: "Reduced downtime" },
    ],
    links: {
      demo: "https://myassets.dataalay.com",
      repo: null,
    },
  },
  {
    id: 3,
    title: "EOU Management System",
    role: "Software Developer",
    timeframe: "2023 - 2024",
    description:
      "A comprehensive web application for managing Export Oriented Unit (EOU) operations, enabling businesses to monitor import/export activities, process Bills of Entry (BOE), track inventory in real time, and analyze operational performance through interactive dashboards.",
    image: "/assets/img/eou-management.png",
    technologies: ["React", "TypeScript", "Redux", "Chart.js", "Tailwind CSS"],
    features: [
      "Interactive analytics dashboard with business insights",
      "BOE (Bill of Entry) processing & tracking",
      "Real-time inventory and stock monitoring",
      "Employee role-based access control",
    ],
    metrics: [
      { value: "30%", label: "Boost in user engagement" },
      { value: "50+", label: "Export units managed" },
      { value: "24/7", label: "Operational tracking" },
    ],
    links: {
      demo: "https://eou.dataalay.com",
      repo: null,
    },
  },
  {
    id: 4,
    title: "Miravia Marketplace Integration",
    role: "Associate Software Engineer",
    timeframe: "2022 - 2023",
    description:
      "Specialized integration platform for Miravia marketplace with optimized product and inventory management",
    image: "/assets/img/miravia.png",
    technologies: ["React", "Redux", "TypeScript", "Node.js", "MongoDB"],
    features: [
      "Streamlined product management",
      "Real-time inventory synchronization",
      "Bulk listing tools",
      "Performance-optimized UI",
    ],
    metrics: [
      { value: "30%", label: "Task speed improvement" },
      { value: "15%", label: "Error reduction" },
      { value: "40%", label: "Operational efficiency gain" },
    ],
    links: {
      demo: "https://cedcommerce.com/miravia-marketplace-integration",
      repo: null, // Private repository
    },
  },

  {
    id: 5,
    title: "vidaXL Marketplace Integration",
    role: "Associate Software Engineer",
    timeframe: "2022 - 2023",
    description:
      "E-commerce integration solution for vidaXL marketplace with product listing and inventory synchronization",
    image: "/assets/img/VidaXL.png",
    technologies: ["React", "Redux", "TypeScript", "REST API"],
    features: [
      "Automated product listing",
      "Bulk editing tools",
      "Inventory synchronization",
      "Order processing pipeline",
    ],
    metrics: [
      { value: "20%", label: "Improved accuracy" },
      { value: "15%", label: "Error reduction" },
      { value: "30%", label: "Faster task completion" },
    ],
    links: {
      demo: "https://cedcommerce.com/marketplace-integration/sell-on-vidaxl",
      repo: null,
    },
  },
];
