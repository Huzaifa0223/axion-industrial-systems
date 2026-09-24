import { describe, it, expect } from "vitest";
import {
  getSite,
  getTheme,
  getNavigation,
  getHome,
  getAbout,
  getProducts,
  getProduct,
  getSolutions,
  getSolution,
  getProjects,
  getProject,
  getCareers,
  getForms,
  getForm,
  getPartners,
  getCustomers,
  getAnimations,
} from "../lib/content";
import { siteSchema } from "../lib/schemas/site";

describe("Content Loaders & Zod Schemas", () => {
  it("loads and parses site.json", () => {
    const site = getSite();
    expect(site.brand.name).toBe("Axion");
    expect(site.seo.defaultTitle).toContain("Axion");
  });

  it("loads and parses theme.json", () => {
    const theme = getTheme();
    expect(theme.colors.light.primary).toBeDefined();
    expect(theme.colors.dark.primary).toBeDefined();
  });

  it("loads and parses navigation.json", () => {
    const nav = getNavigation();
    expect(nav.primary.length).toBeGreaterThan(0);
    expect(nav.cta.label).toBe("Enquire Now");
  });

  it("loads and parses home.json", () => {
    const home = getHome();
    expect(home.hero.slides.length).toBe(5);
    expect(home.stats.items.length).toBe(4);
  });

  it("loads and parses about.json", () => {
    const about = getAbout();
    expect(about.about.title).toBe("About Us");
    expect(about.about.timeline.length).toBe(4);
    expect(about.firmware.values.length).toBe(4);
    expect(about.structure.divisions.length).toBe(4);
  });

  it("loads and parses products.json and checks getProduct slug lookup", () => {
    const products = getProducts();
    expect(products.categories.length).toBe(8);

    const validCategory = getProduct("automation-systems");
    expect(validCategory).toBeDefined();
    expect(validCategory?.title).toBe("Automation Systems");

    const unknownCategory = getProduct("non-existent-product");
    expect(unknownCategory).toBeUndefined();
  });

  it("loads and parses solutions.json and checks getSolution slug lookup", () => {
    const solutions = getSolutions();
    expect(solutions.items.length).toBe(9);

    const validSolution = getSolution("industrial-iiot");
    expect(validSolution).toBeDefined();
    expect(validSolution?.title).toBe("Industrial IIoT");

    const unknownSolution = getSolution("non-existent-solution");
    expect(unknownSolution).toBeUndefined();
  });

  it("loads and parses projects.json and checks getProject slug lookup", () => {
    const projects = getProjects();
    expect(projects.items.length).toBe(4);
    expect(projects.sectors.length).toBe(4);

    const validProject = getProject("pump-station-scada-upgrade");
    expect(validProject).toBeDefined();
    expect(validProject?.title).toBe("Pump Station SCADA Upgrade");

    const unknownProject = getProject("non-existent-project");
    expect(unknownProject).toBeUndefined();
  });

  it("loads and parses careers.json", () => {
    const careers = getCareers();
    expect(careers.openings.length).toBe(2);
    expect(careers.benefits.length).toBe(3);
  });

  it("loads and parses partners.json and customers", () => {
    const partners = getPartners();
    expect(partners.partners.length).toBe(6);
    const customers = getCustomers();
    expect(customers.length).toBe(8);
  });

  it("loads and parses animations.json", () => {
    const anim = getAnimations();
    expect(anim.global.respectReducedMotion).toBe(true);
    expect(anim.global.smoothScroll.library).toBe("lenis");
  });

  it("resolves optionsFrom at build time in forms.json", () => {
    const forms = getForms();
    expect(forms.enquiry).toBeDefined();
    const interestField = forms.enquiry.fields.find((f) => f.name === "interest");
    expect(interestField).toBeDefined();
    expect(interestField?.options).toBeDefined();
    expect(interestField?.options?.length).toBe(9);
    expect(interestField?.options).toContain("Industrial IIoT");

    const careerForm = getForm("career-application");
    expect(careerForm).toBeDefined();
    const positionField = careerForm?.fields.find((f) => f.name === "position");
    expect(positionField?.options).toBeDefined();
    expect(positionField?.options).toContain("Controls Engineer (PLC/SCADA)");
  });

  it("fails schema validation on broken fixture", () => {
    const brokenData = {
      brand: {
        name: "Broken",
        // missing required fields
      },
    };
    const result = siteSchema.safeParse(brokenData);
    expect(result.success).toBe(false);
  });
});
