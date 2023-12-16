import { chop } from "./utils.ts";

function isPage(target: Lume.Data | Lume.Page): target is Lume.Page {
  return "src" in target
}
export const shortDesc = (
  pages: Lume.Data[],
  pageData: Lume.Data | Lume.Page,
  defaultValue: string,
) => {
  const [path, url] = isPage(pageData) ? [pageData.src.path, pageData.data.url] : [pageData.page.src.path, pageData.url];
  if (!path) {
    return defaultValue
  }

  const isPost = path.includes("/posts/");
  if (!isPost) {
    return defaultValue;
  }

  const post = pages.find((el) => el.url === url);
  if (!post) {
    return defaultValue;
  }
  const content = post.children?.toString()
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/[\r\n]/gi, "");
  return chop(content || "");
};
