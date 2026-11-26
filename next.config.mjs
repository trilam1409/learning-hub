import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: { remarkPlugins: ["remark-frontmatter", "remark-gfm"] },
});

export default withMDX({
  pageExtensions: ["ts", "tsx", "mdx"],
});
