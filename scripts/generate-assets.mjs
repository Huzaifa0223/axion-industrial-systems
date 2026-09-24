import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");

const dirs = [
  "brand",
  "hero",
  "about",
  "products",
  "projects",
  "solutions",
  "partners",
  "customers",
  "og"
];

for (const d of dirs) {
  fs.mkdirSync(path.join(publicDir, d), { recursive: true });
}

// 1. Brand SVGs
const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5B4BFF" />
      <stop offset="100%" stop-color="#00C2FF" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0E1024" />
  <path d="M50 18 L82 78 L66 78 L50 48 L34 78 L18 78 Z" fill="url(#grad)" />
  <circle cx="50" cy="35" r="7" fill="#00C2FF" />
</svg>`;

const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" width="280" height="60">
  <defs>
    <linearGradient id="gradDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5B4BFF" />
      <stop offset="100%" stop-color="#22D3FF" />
    </linearGradient>
  </defs>
  <rect width="48" height="48" x="6" y="6" rx="10" fill="#151838" stroke="#23274A" stroke-width="1.5"/>
  <path d="M30 14 L46 46 L37 46 L30 32 L23 46 L14 46 Z" fill="url(#gradDark)" />
  <circle cx="30" cy="24" r="3.5" fill="#22D3FF" />
  <text x="66" y="38" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="24" fill="#EEF0FA" letter-spacing="-0.5">AXION</text>
  <text x="146" y="38" font-family="Inter, sans-serif" font-weight="500" font-size="11" fill="#9AA0BF" letter-spacing="2">INDUSTRIAL</text>
</svg>`;

const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" width="280" height="60">
  <defs>
    <linearGradient id="gradLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E0F8C" />
      <stop offset="100%" stop-color="#00C2FF" />
    </linearGradient>
  </defs>
  <rect width="48" height="48" x="6" y="6" rx="10" fill="#F5F6FA" stroke="#E3E5EE" stroke-width="1.5"/>
  <path d="M30 14 L46 46 L37 46 L30 32 L23 46 L14 46 Z" fill="url(#gradLight)" />
  <circle cx="30" cy="24" r="3.5" fill="#00C2FF" />
  <text x="66" y="38" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="24" fill="#1A1C2B" letter-spacing="-0.5">AXION</text>
  <text x="146" y="38" font-family="Inter, sans-serif" font-weight="500" font-size="11" fill="#5B6075" letter-spacing="2">INDUSTRIAL</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, "brand/mark.svg"), logoMarkSvg);
fs.writeFileSync(path.join(publicDir, "brand/favicon.svg"), logoMarkSvg);
fs.writeFileSync(path.join(publicDir, "brand/logo-dark.svg"), logoDarkSvg);
fs.writeFileSync(path.join(publicDir, "brand/logo-light.svg"), logoLightSvg);

function generatePlaceholderSvg(title, subtitle, color1 = "#0E1024", color2 = "#151838", accent = "#00C2FF") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect width="100%" height="100%" fill="url(#grid)" />
  <circle cx="600" cy="400" r="300" fill="${accent}" opacity="0.08" />
  <rect x="150" y="240" width="900" height="320" rx="24" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
  <text x="600" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="-1">${title}</text>
  <text x="600" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="${accent}" text-anchor="middle" letter-spacing="1">${subtitle}</text>
  <line x1="520" y1="490" x2="680" y2="490" stroke="${accent}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
</svg>`;
}

const imageMap = [
  { path: "og/default.jpg", title: "Axion Industrial Systems", sub: "Smart Industrial Automation & Integration" },
  { path: "hero/slide-1.jpg", title: "Smart Industrial Solutions", sub: "Partnering for Next-Gen Automation" },
  { path: "hero/slide-2.jpg", title: "Factory Floor Automation", sub: "Precision Process Integration" },
  { path: "hero/slide-3.jpg", title: "Industrial Robotics", sub: "Certified Integration & High Flexibility" },
  { path: "hero/slide-4.jpg", title: "IIoT Platform", sub: "Real-Time Monitoring & Plant Analytics" },
  { path: "hero/slide-5.jpg", title: "Energy Management Systems", sub: "Optimise Factory Power & Sustainability" },
  { path: "about/team.jpg", title: "Axion Engineering Team", sub: "Concept to Handover and Lifecycle Support" },
  { path: "products/automation.jpg", title: "Automation Systems", sub: "PLCs, HMIs & SCADA Platforms" },
  { path: "products/motion.jpg", title: "Motion & Drives", sub: "Servo Drives, Motors & VFDs" },
  { path: "products/robotics.jpg", title: "Robotics Systems", sub: "Articulated, SCARA & Cobots" },
  { path: "products/safety.jpg", title: "Functional Safety", sub: "Light Curtains & Safety Controllers" },
  { path: "products/sensing.jpg", title: "Industrial Sensing", sub: "Photoelectric, Proximity & Process" },
  { path: "products/vision.jpg", title: "Quality & Machine Vision", sub: "Smart AI Cameras & Code Readers" },
  { path: "products/control.jpg", title: "Control Components", sub: "Power Supplies & Regulators" },
  { path: "products/switching.jpg", title: "Switching Components", sub: "Contactors & Push Buttons" },
  { path: "projects/sector-water.jpg", title: "Water & Wastewater", sub: "SCADA & Telemetry Infrastructure" },
  { path: "projects/sector-power.jpg", title: "Power Generation", sub: "Drives Retrofit & Critical Control" },
  { path: "projects/sector-marine.jpg", title: "Marine & Utilities", sub: "Condition Monitoring & Offshore Systems" },
  { path: "projects/sector-industrial.jpg", title: "Industrial Sectors", sub: "High-Speed Vision & Packaging Lines" },
  { path: "projects/pump-station.jpg", title: "Pump Station SCADA", sub: "14 Remote Stations Upgraded" },
  { path: "projects/pump-station-1.jpg", title: "RTU Control Panel", sub: "Precision PLC Installation" },
  { path: "projects/pump-station-2.jpg", title: "SCADA Control Room", sub: "Telemetry & Alarm Dispatch" },
  { path: "projects/turbine.jpg", title: "Turbine Hall Retrofit", sub: "Cooling-Water Drive Upgrade" },
  { path: "projects/crane.jpg", title: "Port Crane Condition", sub: "Vibration & Thermal Predictive Sensing" },
  { path: "projects/bottling.jpg", title: "Bottling Line Vision", sub: "30,000 Bottles/Hour Inline Quality" },
  { path: "solutions/maintenance.jpg", title: "Maintenance Contracts", sub: "Guaranteed SLA & Planned Inspection" },
  { path: "solutions/troubleshooting.jpg", title: "Site Troubleshooting", sub: "Multi-Vendor Diagnostics & Rapid Recovery" },
  { path: "solutions/iiot.jpg", title: "Industrial IIoT", sub: "Real-Time OEE & Predictive Maintenance" },
  { path: "solutions/automation.jpg", title: "Industrial Automation", sub: "Bespoke Factory Control Architecture" },
  { path: "solutions/ems.jpg", title: "Energy Management", sub: "Machine-Level Power Quality & Analytics" },
  { path: "solutions/vision.jpg", title: "Smart Vision Systems", sub: "Automated Inspection & Defect Detection" },
  { path: "solutions/motion.jpg", title: "Motion & Precision Drives", sub: "Multi-Axis Coordinated Control" },
  { path: "solutions/pharma.jpg", title: "Pharmaceutical Auditing", sub: "21 CFR Part 11 Compliance & Audit Trails" },
  { path: "solutions/robotics.jpg", title: "Industrial Robotics", sub: "Flexible Cobots & Automated Tending" },
];

for (const img of imageMap) {
  const content = generatePlaceholderSvg(img.title, img.sub);
  fs.writeFileSync(path.join(publicDir, img.path), content);
}

// Partners SVGs
for (let i = 1; i <= 6; i++) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
    <rect width="200" height="80" rx="10" fill="none" />
    <path d="M30 40 L50 25 L70 40 L50 55 Z" fill="#5B4BFF" opacity="0.8"/>
    <text x="85" y="46" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="16" fill="currentColor">PARTNER ${i}</text>
  </svg>`;
  fs.writeFileSync(path.join(publicDir, "partners", "partner-" + i + ".svg"), svg);
}

// Customers SVGs
for (let i = 1; i <= 8; i++) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
    <rect width="200" height="80" rx="10" fill="none" />
    <circle cx="45" cy="40" r="15" fill="#00C2FF" opacity="0.7"/>
    <text x="75" y="46" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="15" fill="currentColor">CLIENT 0${i}</text>
  </svg>`;
  fs.writeFileSync(path.join(publicDir, "customers", "customer-" + i + ".svg"), svg);
}

// Dummy MP4 placeholder file for slide-2.mp4
fs.writeFileSync(path.join(publicDir, "hero/slide-2.mp4"), Buffer.from(""));

const creditsContent = `# Asset Credits & Attribution

All assets in \`public/\` are procedural SVG and mock assets designed for Axion Industrial Systems demo platform:

- Brand marks, icons, and UI visual representations: Custom vector graphics for Axion Industrial Systems
- Partner & Customer Logos: Procedural demo vectors
- Hero, Product, Project & Solution visuals: SVG gradient panels with industrial telemetry grids
`;

fs.writeFileSync(path.join(publicDir, "CREDITS.md"), creditsContent);

console.log("All public assets generated successfully!");
