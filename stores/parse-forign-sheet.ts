export const useForignSheetStore = defineStore("useForignSheetStore", () => {
  function removeEmptyLines(text: string) {
    return text.split("\n").filter(line => line.trim() !== "");
  }

  function init(text: string) {
    const removedLines = removeEmptyLines(text).join("\n");

    let value = removedLines.replace("CH                 ", "   ");
    value = value.replaceAll("  CH              ", "");
    value = value.replaceAll("-------------------------------------------------------------------------------", "-----------------------------------------------------------------------------");

    return value;
  }

  return {
    init,
  };
});
