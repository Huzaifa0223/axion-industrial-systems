import fs from "fs";
import path from "path";
import { siteSchema, SiteConfig } from "./schemas/site";
import { themeSchema, ThemeConfig } from "./schemas/theme";
import { navigationSchema, NavigationConfig } from "./schemas/navigation";
import { homeSchema, HomeConfig } from "./schemas/home";
import { aboutSchema, AboutConfig } from "./schemas/about";
import { productsSchema, ProductsConfig, ProductCategory } from "./schemas/products";
import { solutionsSchema, SolutionsConfig, SolutionItem } from "./schemas/solutions";
import { projectsSchema, ProjectsConfig, ProjectItem } from "./schemas/projects";
import { careersSchema, CareersConfig } from "./schemas/careers";
import { formsSchema, FormsConfig, FormDef } from "./schemas/forms";
import { partnersSchema, PartnersConfig, customersSchema } from "./schemas/partners";
import { animationsSchema, AnimationsConfig } from "./schemas/animations";

function readContentFile(filename: string): any {
  const primaryPath = path.join(process.cwd(), "content", filename);
  const fallbackPath = path.join(process.cwd(), "src", "content", filename);
  
  let filePath = primaryPath;
  if (!fs.existsSync(filePath)) {
    filePath = fallbackPath;
  }
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Content file not found: ${filename} at ${primaryPath} or ${fallbackPath}`);
  }
  
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err: any) {
    throw new Error(`Failed to parse JSON file: ${filePath}. Error: ${err.message}`);
  }
}

export function getSite(): SiteConfig {
  const raw = readContentFile("site.json");
  const parsed = siteSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for site.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getTheme(): ThemeConfig {
  const raw = readContentFile("theme.json");
  const parsed = themeSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for theme.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getNavigation(): NavigationConfig {
  const raw = readContentFile("navigation.json");
  const parsed = navigationSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for navigation.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getHome(): HomeConfig {
  const raw = readContentFile("home.json");
  const parsed = homeSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for home.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getAbout(): AboutConfig {
  const raw = readContentFile("about.json");
  const parsed = aboutSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for about.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getProducts(): ProductsConfig {
  const raw = readContentFile("products.json");
  const parsed = productsSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for products.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getProduct(slug: string): ProductCategory | undefined {
  const { categories } = getProducts();
  return categories.find((c) => c.slug === slug);
}

export function getSolutions(): SolutionsConfig {
  const raw = readContentFile("solutions.json");
  const parsed = solutionsSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for solutions.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getSolution(slug: string): SolutionItem | undefined {
  const { items } = getSolutions();
  return items.find((s) => s.slug === slug);
}

export function getProjects(): ProjectsConfig {
  const raw = readContentFile("projects.json");
  const parsed = projectsSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for projects.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getProject(slug: string): ProjectItem | undefined {
  const { items } = getProjects();
  return items.find((p) => p.slug === slug);
}

export function getCareers(): CareersConfig {
  const raw = readContentFile("careers.json");
  const parsed = careersSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for careers.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getPartners(): PartnersConfig {
  const raw = readContentFile("partners.json");
  const parsed = partnersSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for partners.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

export function getCustomers() {
  try {
    const raw = readContentFile("customers.json");
    const parsed = customersSchema.safeParse(raw);
    if (parsed.success) {
      return parsed.data.customers;
    }
  } catch {
    // fallback to partners.json
  }
  const partners = getPartners();
  return partners.customers || [];
}

export function getAnimations(): AnimationsConfig {
  const raw = readContentFile("animations.json");
  const parsed = animationsSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for animations.json: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
}

/**
 * Returns forms config with optionsFrom resolved at build time.
 * E.g., optionsFrom: "solutions.json#items[].title" or "careers.json#openings[].title"
 */
export function getForms(): FormsConfig {
  const raw = readContentFile("forms.json");
  const parsed = formsSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Schema validation failed for forms.json: ${JSON.stringify(parsed.error.format())}`);
  }

  const forms = { ...parsed.data };
  const solutions = getSolutions();
  const careers = getCareers();

  for (const formKey of Object.keys(forms)) {
    const form = forms[formKey];
    for (const field of form.fields) {
      if (field.optionsFrom) {
        if (field.optionsFrom === "solutions.json#items[].title") {
          field.options = solutions.items.map((item) => item.title);
        } else if (field.optionsFrom === "careers.json#openings[].title") {
          field.options = careers.openings.map((op) => op.title);
        }
      }
    }
  }

  return forms;
}

export function getForm(formId: string): FormDef | undefined {
  const forms = getForms();
  return forms[formId];
}
