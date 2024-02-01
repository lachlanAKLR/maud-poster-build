import { MdInfo } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";



export const deskStructure = (S) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !["contact","home", "settings"].includes(listItem.getId())
      ),
      S.divider(),
      S.listItem()
      .title("Home")
      .icon(MdHomeFilled)
      .child(S.editor().schemaType("home").documentId("home")),  
      S.listItem()
      .title("Info")
      .icon(MdInfo)
      .child(S.editor().schemaType("contact").documentId("contact")),
      S.divider(),
      S.listItem()
      .title("Settings")
      .icon(IoMdSettings)
      .child(S.editor().schemaType("settings").documentId("settings")),
  ]);
