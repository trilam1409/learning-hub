export function foldVietnamese(text: string) {
  return text.toLocaleLowerCase("vi-VN").normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d");
}

export function sectionId(title: string) {
  return "muc-" + foldVietnamese(title).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function catalogQuery(query: string, view: string) {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query);
  if (view === "sessions") params.set("view", "sessions");
  const value = params.toString();
  return value ? `?${value}` : "";
}
