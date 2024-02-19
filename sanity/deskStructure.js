import { MdInfo } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdBookmarks } from "react-icons/md";
import { MdArchive } from "react-icons/md";




export const deskStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !["info", "home", "settings", "project",  "video", "media.tag", "tags", "archive"].includes(listItem.getId())
      ),
      orderableDocumentListDeskItem({type: 'project', S, context, title: 'Projects', icon: MdAddPhotoAlternate}),
      orderableDocumentListDeskItem({type: 'tags', S, context, title: 'Project Tags', icon: MdBookmarks}),
      orderableDocumentListDeskItem({type: 'archive', S, context, title: 'Archive', icon: MdArchive}),

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
