export const useSpecialMealStore = defineStore("useSpecialMealStore", () => {
  const walkedThrough = [] as number[];
  const allSPM = [] as Array<{
    "class": string;
    "meal-type": string;
    "count": number;
  }>;

  function getRecordMeal(data: string[], recordNumber: string) {
    return data.findIndex((element) => {
      if (!element.includes("SSR")) {
        const currentRecordNumber = Number.parseInt(element.trim().split(" ")[0]);
        return currentRecordNumber === Number.parseInt(recordNumber) + 1;
      }
      return false;
    });
  }

  function init(text: string) {
    const txtValue = text.trim();
    const valueSplitted = txtValue.toLowerCase().split("\n");

    const splitArgOne = valueSplitted.findIndex(el => el.trim() === ">");
    const cleanContent = valueSplitted
      .slice(splitArgOne + 5)
      .filter(i => ![")>", ">", "m", "md", "end of display"].includes(i));

    for (let i = 0; i < cleanContent.length; i++) {
      console.log({ allSPM });
      const currentLine = cleanContent[i];

      if (!currentLine.includes("ssr")) {
      // Get Flight Class
        const cureLine = currentLine.trim().replaceAll(/\s+/g, " ").split(" ");

        const nextRecordIDX = getRecordMeal(cleanContent, cureLine[0]);

        const cureNextLine = cleanContent[nextRecordIDX - 1]
          ? cleanContent[nextRecordIDX - 1].trim().split(" ")
          : cleanContent[i + 1].trim().split(" ");

        if (cureNextLine.length > 4)
          continue;

        const horusClassChar = ["d", "j", "c", "r", "a", "i", "z", "p", "o", "f"];
        const setClass = horusClassChar.includes(
          cureLine[cureLine.length - 4].trim().toLowerCase(),
        )
          ? "H"
          : "Y";

        let mealType = "";

        switch (cureNextLine[1]) {
          case "vlml":
            mealType = "vgml";
            break;
          case "avml":
            mealType = "vgml";
            break;
          case "vjml":
            mealType = "vgml";
            break;

          default:
            mealType = cureNextLine[1];
            break;
        }

        const currentRecordNumber = Number.parseInt(cureLine[0]);

        if (walkedThrough.includes(currentRecordNumber) || mealType === "moml") {
          continue;
        }

        walkedThrough.push(currentRecordNumber);

        const isObjectExist = allSPM.findIndex(
          elem => elem.class === setClass && elem["meal-type"] === mealType,
        );

        if (isObjectExist === -1) {
          allSPM.push({
            "class": setClass,
            "meal-type": mealType,
            "count": 1,
          });
        }
        else {
          allSPM[isObjectExist].count += 1;
        }
      }
    }

    return allSPM;
  }

  return {
    init,
  };
});
