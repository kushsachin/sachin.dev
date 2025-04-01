export const projects = [
  {
    id: 1,
    title: "Service Management Platform",
    role: "Software Developer",
    timeframe: "2023 - Present",
    description:
      "Enterprise SaaS solution for service businesses with CRM, inventory management, and analytics",
    image: "/images/projects/service-management.png",
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Redux",
      "Tailwind",
      "MUI",
    ],
    features: [
      "Real-time analytics dashboard",
      "Role-based access control",
      "Inventory tracking across multiple locations",
      "Sales pipeline visualization",
    ],
    metrics: [
      { value: "30%", label: "Faster load times" },
      { value: "25k+", label: "Monthly users" },
      { value: "99.9%", label: "Uptime" },
    ],
    links: {
      demo: "https://srvc.dataalay.com",
      repo: "https://github.com/yourusername/service-platform",
    },
  },
  {
    id: 2,
    title: "Asset Management System",
    role: "Software Developer",
    timeframe: "2023 - Present",
    description:
      "Comprehensive solution for tracking assets across multiple locations with warranty and maintenance management",
    image: "/images/projects/asset-management.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Material UI"],
    features: [
      "Multi-location asset tracking",
      "AMC (Annual Maintenance Contract) management",
      "Warranty tracking system",
      "Repair management workflow",
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
    timeframe: "2023 - Present",
    description:
      "Analytics dashboard for Export Oriented Unit (EOU) management with BOE processing and stock reporting",
    image: "/images/projects/eou-management.png",
    technologies: ["React", "TypeScript", "Redux", "Chart.js", "Tailwind CSS"],
    features: [
      "Custom analytics dashboard",
      "BOE (Bill of Entry) processing",
      "Real-time stock reports",
      "Employee role management",
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
