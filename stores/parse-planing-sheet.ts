export const usePlaningSheetStore = defineStore("usePlaningSheetStore", () => {
  function init(text: string) {
    const rawValue = text;
    let first = false;
    let value = rawValue.replaceAll("  CH               ", "");
    value = value.replaceAll("CH                 ", "  ");
    value = value.replaceAll("  CH              ", " ");

    const lines = value.split("\n");
    const header = [];
    let result = [] as string[];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // remove empty lines
      if (line.trim() === "") {
        continue;
      }

      const inc = 7;

      // get header
      if (line.includes("COMPUTER CENTER") && !first) {
        header.push(lines[i - 1]);
        header.push(line);
        header.push(lines[i + 1]);
        header.push(lines[i + 2]);
        // header.push(lines[i + 3]);
        header.push("                          كشف الرحلات اليومية المخطط");
        header.push(lines[i + 4]);
        header.push(lines[i + 5]);
        header.push(lines[i + 6]);
        header.push(lines[i + 7]);

        result = result.slice(0, -1);
        i += inc;
        first = true;
        continue;
      }
      else if (line.includes("COMPUTER CENTER") && first) {
        result = result.slice(0, -1);
        i += inc;
        continue;
      }

      if (result.length > 0 && result[result.length - 1][0] !== "") {
        const headLine = result[0].slice(0, 39).trim();
        const calcIsThereNextLine = i + 1 > result.length - 1 ? i : i + 1;

        if (!lines[calcIsThereNextLine].includes(headLine)) {
          result.push("");
        }
      }

      result.push(line);
    }

    // const headLine = result[0].slice(0, 39).trim();

    // result = result.map((line, idx) => {
    //   if (line.includes(headLine) && idx > 0) {
    //     return line.replace(headLine, "                           ");
    //   }
    //   return line;
    // });

    // how many 50 lines in the result variable

    function splitIntoGroups(arr: Array<string>, numberOfGroups = 50) {
      const result = [];
      const groupSize = Math.ceil(arr.length / numberOfGroups);

      for (let i = 0; i < groupSize; i++) {
        const start = i * numberOfGroups;
        const end = start + numberOfGroups;
        result.push(arr.slice(start, end - 1));
      }

      return result;
    }

    return {
      header: header.join("\n"),
      result: splitIntoGroups(result),
    };
  }

  return {
    init,
  };
});
