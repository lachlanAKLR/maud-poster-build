import { MdInfo } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'




export const deskStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !["info", "home", "settings", "project", "tags", "video",].includes(listItem.getId())
      ),
      orderableDocumentListDeskItem({type: 'project', S, context, title: 'Projects'}),
      S.divider(),
      S.listItem()
      .title("Home")
      .icon(MdHomeFilled)
      .child(S.editor().schemaType("home").documentId("home").title("Home")),  
      S.listItem()
      .title("Info")
      .icon(MdInfo)
      .child(S.editor().schemaType("info").documentId("info").title("Info")),
      S.divider(),
      S.listItem()
      .title("Settings")
      .icon(IoMdSettings)
      .child(S.editor().schemaType("settings").documentId("settings").title("Settings")),
  ]);
