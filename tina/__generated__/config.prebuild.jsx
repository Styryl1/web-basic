// tina/config.ts
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "tinacms";
var branch = process.env.CF_PAGES_BRANCH || process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_REF_NAME || process.env.GITHUB_HEAD_REF || "main";
var siteContentPath = path.join(process.cwd(), "content", "tina", "site-content.json");
var siteContentSource = fs.readFileSync(siteContentPath, "utf8");
var siteContent = JSON.parse(siteContentSource);
var toLabel = (name) => name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/\s+/g, " ").trim().replace(/^./, (char) => char.toUpperCase());
var createStringField = (name, value) => {
  const baseField = {
    type: "string",
    name,
    label: toLabel(name)
  };
  if (value.includes("\n") || value.length > 140) {
    baseField.ui = { component: "textarea" };
  }
  return baseField;
};
var buildObjectFields = (value) => Object.entries(value).map(([name, fieldValue]) => buildField(name, fieldValue));
var buildField = (name, value) => {
  if (typeof value === "string") {
    return createStringField(name, value);
  }
  if (typeof value === "number") {
    return {
      type: "number",
      name,
      label: toLabel(name)
    };
  }
  if (typeof value === "boolean") {
    return {
      type: "boolean",
      name,
      label: toLabel(name)
    };
  }
  if (Array.isArray(value)) {
    const first = value.find((entry) => entry !== null && entry !== void 0);
    if (typeof first === "string") {
      return {
        type: "string",
        name,
        label: toLabel(name),
        list: true
      };
    }
    if (typeof first === "number") {
      return {
        type: "number",
        name,
        label: toLabel(name),
        list: true
      };
    }
    if (typeof first === "boolean") {
      return {
        type: "boolean",
        name,
        label: toLabel(name),
        list: true
      };
    }
    if (first && typeof first === "object" && !Array.isArray(first)) {
      return {
        type: "object",
        name,
        label: toLabel(name),
        list: true,
        fields: buildObjectFields(first)
      };
    }
    return {
      type: "string",
      name,
      label: toLabel(name),
      list: true
    };
  }
  if (value && typeof value === "object") {
    return {
      type: "object",
      name,
      label: toLabel(name),
      fields: buildObjectFields(value)
    };
  }
  return {
    type: "string",
    name,
    label: toLabel(name)
  };
};
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "siteContent",
        label: "Site Content",
        path: "content/tina",
        format: "json",
        match: {
          include: "site-content"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: buildObjectFields(siteContent)
      }
    ]
  }
});
export {
  config_default as default
};
