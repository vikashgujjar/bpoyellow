// Single source of truth for the homepage copy.
// All contact details, addresses, figures and the testimonial are placeholders —
// replace them with real, verified information before going live.

export const brand = {
  name: "BPO Call Center",
  tagline: "Customer support that scales with you",
};

export const contact = {
  email: "hello@example.com",
  phone: "+1 (555) 010-2030",
  phoneHref: "tel:+15550102030",
  mobile: "+1 (555) 010-4050",
  mobileHref: "tel:+15550104050",
};

export const hero = {
  eyebrow: "Customer Support · IT · Back Office",
  title: "Customer Experience, Delivered at Scale",
  body: "We build and run dedicated support, IT and back-office teams that help growing businesses respond faster, work smarter and keep customers happy — around the clock.",
  badges: ["24/7 multilingual support", "Secure, compliance-first processes"],
};

export type Service = { id: string; title: string; body: string };

export const services: Service[] = [
  {
    id: "contact-center",
    title: "Contact Center",
    body: "Omnichannel voice, chat and email support with smart routing, real-time analytics and trained agents — available 24/7.",
  },
  {
    id: "it-support",
    title: "IT Support & Services",
    body: "Remote help desk, application maintenance and infrastructure monitoring delivered by skilled offshore engineers.",
  },
  {
    id: "back-office",
    title: "Back Office Operations",
    body: "Data processing, reporting, finance and admin work handled accurately, so your core team can focus on growth.",
  },
];

export const stats = {
  title: "Numbers that speak for our service",
  items: [
    { value: "15+", label: "Industries Served" },
    { value: "250+", label: "Projects Delivered" },
    { value: "4.8/5", label: "Average Client Rating" },
    { value: "10 yrs+", label: "Industry Experience" },
  ],
};

export const about = {
  title: "Where People, Process & Technology Meet",
  body: "Behind every great customer conversation is a team that cares. We combine trained people, proven processes and modern tools to deliver support that feels personal at any scale.",
  pillars: [
    { id: "people", title: "People", body: "Trained, motivated agents" },
    { id: "process", title: "Process", body: "Clear SLAs and quality checks" },
    { id: "technology", title: "Technology", body: "Automation and live analytics" },
  ],
};

export type Industry = { id: string; title: string; body: string };

export const industries: Industry[] = [
  {
    id: "logistics",
    title: "Logistics",
    body: "Shipment tracking, dispatch coordination and proactive customer updates that keep supply chains moving.",
  },
  {
    id: "banking",
    title: "Banking & Finance",
    body: "Secure account servicing, KYC processing and payment support for financial institutions.",
  },
  {
    id: "retail",
    title: "Retail & E-Commerce",
    body: "Order management, returns and customer care that turn first-time shoppers into loyal fans.",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    body: "Lead qualification, appointment booking and documentation support for property teams.",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    body: "Patient scheduling, billing assistance and records support handled with strict privacy.",
  },
  {
    id: "travel",
    title: "Travel & Hospitality",
    body: "Round-the-clock booking help and traveller assistance in multiple languages.",
  },
  {
    id: "energy",
    title: "Energy & Utilities",
    body: "Billing enquiries, outage communication and service requests handled at scale.",
  },
];

export const whyChooseUs = [
  {
    id: "experts",
    title: "Dedicated Experts",
    body: "A trained team that learns your business and works as a true extension of it.",
  },
  {
    id: "tailored",
    title: "Tailored Workflows",
    body: "Processes designed around your goals, tools and customers — never one-size-fits-all.",
  },
  {
    id: "value",
    title: "Lower Costs",
    body: "Cut hiring, training and infrastructure spend while raising service quality.",
  },
  {
    id: "speed",
    title: "Faster Turnaround",
    body: "Automation and clear SLAs that speed up every request, every day.",
  },
];

export const insights = {
  subtitle: "Ideas, insights and inspiration.",
  body: "Practical guides, industry trends and real-world lessons on customer service and operations — written by our team, for yours.",
};

// Sample testimonial for layout purposes only.
export const testimonial = {
  quote:
    "Within three months our average response time dropped by half and customer satisfaction climbed steadily. The team feels like a natural part of our company, not an outside vendor.",
  author: "Operations Manager, E-Commerce Brand",
};

export const offices = [
  { region: "United States", address: "100 Example Street, Suite 200, Austin, TX 73301" },
  { region: "India", address: "4th Floor, Sample Tech Park, Sector 5, Bhubaneswar, Odisha 751001" },
  { region: "United Kingdom", address: "25 Placeholder Road, London EC1A 1AA" },
];
