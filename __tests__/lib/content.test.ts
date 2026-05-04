import fs from "fs";
import path from "path";

// jest.mock is hoisted by SWC before all imports, so content.ts receives
// the mocked fs when it is first loaded.
jest.mock("fs");

import {
  getTool,
  getAllTools,
  getToolSlugs,
  getCategory,
  getAllCategories,
  getCategorySlugs,
  getComparison,
  getAllComparisons,
  getComparisonSlugs,
} from "../../lib/content";

const mockedFs = jest.mocked(fs);
const CWD = "/project";

const toolFixture = {
  slug: "chatgpt",
  title: "ChatGPT",
  tagline: "The world's most popular AI chatbot.",
  description: "A great chatbot.",
  metaDescription: "ChatGPT review.",
  canonicalUrl: "https://example.com/tools/chatgpt",
  affiliateUrl: "https://chat.openai.com",
  category: "chatbots",
  pricing: "Free / $20/mo",
  pros: ["Fast"],
  cons: ["Hallucinations"],
  rating: 4.5,
  publishedAt: "2025-01-15",
};

const categoryFixture = {
  slug: "chatbots",
  title: "AI Chatbots",
  description: "Conversational AI tools.",
  metaDescription: "Best AI chatbots.",
  canonicalUrl: "https://example.com/categories/chatbots",
  tools: ["chatgpt"],
};

const comparisonFixture = {
  slug: "chatgpt-vs-claude",
  title: "ChatGPT vs Claude",
  description: "Head-to-head.",
  metaDescription: "ChatGPT vs Claude comparison.",
  canonicalUrl: "https://example.com/compare/chatgpt-vs-claude",
  tools: ["chatgpt", "claude"],
  verdict: "Depends on your use case.",
  publishedAt: "2025-02-10",
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(process, "cwd").mockReturnValue(CWD);
});

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

describe("getToolSlugs", () => {
  it("returns empty array when directory does not exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getToolSlugs()).toEqual([]);
  });

  it("returns slugs derived from json filenames, ignoring non-json files", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(
      ["chatgpt.json", "claude.json", "notes.txt"] as unknown as fs.Dirent[]
    );
    expect(getToolSlugs()).toEqual(["chatgpt", "claude"]);
  });
});

describe("getTool", () => {
  it("returns null when file does not exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getTool("missing")).toBeNull();
  });

  it("parses and returns the tool JSON", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(toolFixture));
    expect(getTool("chatgpt")).toEqual(toolFixture);
  });

  it("reads from the correct file path", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(toolFixture));
    getTool("chatgpt");
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(
      path.join(CWD, "content", "tools", "chatgpt.json"),
      "utf-8"
    );
  });
});

describe("getAllTools", () => {
  it("returns empty array when no tools exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getAllTools()).toEqual([]);
  });

  it("returns all parseable tools", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(
      ["chatgpt.json"] as unknown as fs.Dirent[]
    );
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(toolFixture));
    expect(getAllTools()).toEqual([toolFixture]);
  });
});

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

describe("getCategorySlugs", () => {
  it("returns empty array when directory does not exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getCategorySlugs()).toEqual([]);
  });

  it("returns slugs from json files, ignoring non-json files", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(
      ["chatbots.json", ".DS_Store"] as unknown as fs.Dirent[]
    );
    expect(getCategorySlugs()).toEqual(["chatbots"]);
  });
});

describe("getCategory", () => {
  it("returns null when file does not exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getCategory("missing")).toBeNull();
  });

  it("parses and returns the category JSON", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(categoryFixture));
    expect(getCategory("chatbots")).toEqual(categoryFixture);
  });

  it("reads from the correct file path", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(categoryFixture));
    getCategory("chatbots");
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(
      path.join(CWD, "content", "categories", "chatbots.json"),
      "utf-8"
    );
  });
});

describe("getAllCategories", () => {
  it("returns empty array when no categories exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getAllCategories()).toEqual([]);
  });

  it("returns all parseable categories", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(
      ["chatbots.json"] as unknown as fs.Dirent[]
    );
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(categoryFixture));
    expect(getAllCategories()).toEqual([categoryFixture]);
  });
});

// ---------------------------------------------------------------------------
// Comparisons
// ---------------------------------------------------------------------------

describe("getComparisonSlugs", () => {
  it("returns empty array when directory does not exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getComparisonSlugs()).toEqual([]);
  });

  it("returns slugs from json files", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(
      ["chatgpt-vs-claude.json"] as unknown as fs.Dirent[]
    );
    expect(getComparisonSlugs()).toEqual(["chatgpt-vs-claude"]);
  });
});

describe("getComparison", () => {
  it("returns null when file does not exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getComparison("missing")).toBeNull();
  });

  it("parses and returns the comparison JSON", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(comparisonFixture));
    expect(getComparison("chatgpt-vs-claude")).toEqual(comparisonFixture);
  });

  it("reads from the correct file path", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(comparisonFixture));
    getComparison("chatgpt-vs-claude");
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(
      path.join(CWD, "content", "comparisons", "chatgpt-vs-claude.json"),
      "utf-8"
    );
  });
});

describe("getAllComparisons", () => {
  it("returns empty array when no comparisons exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getAllComparisons()).toEqual([]);
  });

  it("returns all parseable comparisons", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(
      ["chatgpt-vs-claude.json"] as unknown as fs.Dirent[]
    );
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(comparisonFixture));
    expect(getAllComparisons()).toEqual([comparisonFixture]);
  });
});
