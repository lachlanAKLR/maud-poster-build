import { MdOutlinePhone } from "react-icons/md";

export const deskStructure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Contact")
        .icon(MdOutlinePhone)
        .child(S.editor().schemaType("contact").documentId("contact")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["contact"].includes(listItem.getId())
      ),
    ]);
