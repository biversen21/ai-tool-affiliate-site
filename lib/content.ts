import fs from "fs";
import path from "path";
import type { Tool, Category, Comparison } from "./types";

function contentDir(): string {
  return path.join(process.cwd(), "content");
}

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function listSlugs(dir: string): string[] {
  const fullDir = path.join(contentDir(), dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

// Tools
export function getToolSlugs(): string[] {
  return listSlugs("tools");
}

export function getTool(slug: string): Tool | null {
  const filePath = path.join(contentDir(), "tools", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return readJson<Tool>(filePath);
}

export function getAllTools(): Tool[] {
  return getToolSlugs()
    .map((slug) => getTool(slug))
    .filter(Boolean) as Tool[];
}

// Categories
export function getCategorySlugs(): string[] {
  return listSlugs("categories");
}

export function getCategory(slug: string): Category | null {
  const filePath = path.join(contentDir(), "categories", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return readJson<Category>(filePath);
}

export function getAllCategories(): Category[] {
  return getCategorySlugs()
    .map((slug) => getCategory(slug))
    .filter(Boolean) as Category[];
}

// Comparisons
export function getComparisonSlugs(): string[] {
  return listSlugs("comparisons");
}

export function getComparison(slug: string): Comparison | null {
  const filePath = path.join(contentDir(), "comparisons", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return readJson<Comparison>(filePath);
}

export function getAllComparisons(): Comparison[] {
  return getComparisonSlugs()
    .map((slug) => getComparison(slug))
    .filter(Boolean) as Comparison[];
}
