export const useCateringSheet = defineStore("useCateringSheet", () => {
  function splitToFlights(rawValue: string) {
    const lines = rawValue.split("\n");
    const allLines = [];

    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i];

      if (currentLine.length === 0)
        continue;

      let cleanLine = currentLine;
      if (currentLine.includes("EGYPTAIR")) {
        cleanLine = currentLine.replace("CH                 ", "  ");
      }
      else {
        cleanLine = cleanLine
          .replace(
            "  CH                                           ",
            "                             ",
          )
          .replace(
            "  CH                                        ",
            "                          ",
          );
      }

      allLines.push(cleanLine);
    }

    return createSpace(allLines);
  }

  function addHeaderSpaces(header: string, spac: string) {
    return (
      header.substring(0, 24)
      + spac
      + header.substring(24, 55)
      + spac
      + header.substring(53, 100)
    );
  }

  function createSpace(allLines: string[]) {
    const result = [];

    for (let i = 0; i < allLines.length; i++) {
      const currentLine = allLines[i];

      // add next 9 lines if found "EGYPTAIR"
      if (currentLine.includes("EGYPTAIR")) {
        result.push(addHeaderSpaces(currentLine, "      "));
        result.push(addHeaderSpaces(allLines[i + 1], "      "));
        result.push(addHeaderSpaces(allLines[i + 2], "      "));
        result.push(addHeaderSpaces(allLines[i + 3], "      "));
        result.push(addHeaderSpaces(allLines[i + 4], "      "));
        result.push(allLines[i + 5]);

        const correctSpace
          = `${allLines[i + 6].substr(0, 43)
          }----${
            allLines[i + 6].substr(43, 17)
          }----${
            allLines[i + 6].substr(61, 15)
          }----${
            allLines[i + 6].substr(76, 16)}`;
        result.push(correctSpace);

        i = i + 6;
      }
      else if (currentLine.includes("-")) {
        result.push(`${currentLine}-----------`);
        continue;
      }
      else {
        const correctSpace
          = `${allLines[i].substr(0, 43)
          }    ${
            allLines[i].substr(43, 17)
          }   ${
            allLines[i].substr(61, 15)
          }     ${
            allLines[i].substr(76, 16)}`;

        result.push(correctSpace);
      }
    }

    return result.join("\n");
  }

  return {
    splitToFlights,
  };
});
