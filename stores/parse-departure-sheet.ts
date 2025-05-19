export const useDepartureSheet = defineStore("useDepartureSheet", () => {
  let header = "";

  function removeEmptyLines(text: string) {
    return text
      .split("\n")
      .map(line =>
        line
          .replace("            CH                 ", "  ")
          .replace("  CH                 ", "  ")
          .replace("  CH", ""),
      )
      .filter(line => line.trim() !== "");
  }

  function init(text: string) {
    const removedLines = removeEmptyLines(text);
    let firstHeader = false;
    const result = [];

    for (let i = 0; i < removedLines.length; i++) {
      const line = removedLines[i];
      //       EGYPTAIR
      //   COMPUTER CENTER                                                                  TIME 12:29:27
      //  AVIATION SERVICES                                                                 DATE 22/03/25
      //                                   DAILY DEPARTURE FLIGHTS
      //                             كشف رحلات القيام اليومى بمصر للطيران
      //                             -----------------------------------
      //      DATE : 21/03/2025
      //  CUS    FLIGHT NO                   R    O    U    T    E             A/C      A.T.D      NO.OF
      //  ---  -وقت القيام   ----     ---------------------------------------      -الحرف--الرقم   SECTOR

      if (line.includes("EGYPTAIR") && !firstHeader) {
        header += `      EGYPTAIR\n`;
        header += `   ${removedLines[i + 1].trim().replace("                                                ", "                                                       ")}\n`;
        header += `  ${removedLines[i + 2].trim().replace("                                               ", "                                                      ")}\n`;
        header += `${removedLines[i + 3].replace("                            ", "                                  ")}\n`;
        // header += removedLines[i + 3] + "\n";
        header
        += "                            كشف رحلات القيام اليومى بمصر للطيران\n";
        header += "                            -----------------------------------\n";
        // header += removedLines[i + 4] + "\n";
        // header += removedLines[i + 5] + "\n";
        header += `${removedLines[i + 6]}\n`;
        header
        += " CUS    FLIGHT NO               R    O    U    T    E                A/C       A.T.D    NO.OF\n";
        // header += removedLines[i + 7] + "\n";
        header
        += " ---  -وقت القيام    ---       --------------------------------------   -الحرف---الرقم SECTOR\n";
        // header += removedLines[i + 8] + "\n";
        i = i + 8;
        firstHeader = true;
        continue;
      }
      else if (line.includes("EGYPTAIR") && firstHeader) {
        i = i + 8;
        continue;
      }

      const splitLine = [
        line.substring(0, 6).trim(),
        line.substring(6, 10).trim(),
        line.substring(10, 16).trim(),
        line.substring(16, 28).trim(),
        line.substring(28, 53).trim(),
        line.substring(53, 57).trim(),
        line.substring(57, 69).trim(),
        line.substring(16, 28).trim().includes(" ") ? "2" : "1",
      ];

      result.push(splitLine);
    }

    return { header, result };
  }

  return {
    init,
  };
});
