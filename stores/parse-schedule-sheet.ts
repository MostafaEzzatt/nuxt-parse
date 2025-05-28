export const useScheduleStore = defineStore("useScheduleStore", () => {
  function init(text: string) {
    const rawValue = text;
    const value = rawValue.replaceAll("CH                 ", " ");
    const lines = value.split("\n");
    const lineCount = lines.length - 1;
    const pageCount = Math.ceil(lineCount / 72);
    const result = [];

    for (let i = 0; i < pageCount; i++) {
      const start = i * 72;
      const end = start + 72;
      const pageLines = lines.slice(start, end);
      const pageContent = pageLines.join("\n");
      result.push(pageContent);
    }

    // make page line count 50

    for (let i = 0; i < result.length; i++) {
      const pageLines = result[i].split("\n") as string[];

      result[i] = [...pageLines.splice(0, 50), ""].join("\n");
    }

    return result.join();
  }

  return {
    init,
  };
});
