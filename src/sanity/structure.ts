import type { StructureResolver } from "sanity/structure";

const singletons = ["siteSettings", "menuModifiers"];

/** Custom desk: pin the two single-document types, list the rest normally. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Menu Add-ons & Sauces")
        .id("menuModifiers")
        .child(
          S.document().schemaType("menuModifiers").documentId("menuModifiers"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletons.includes(item.getId() ?? ""),
      ),
    ]);
