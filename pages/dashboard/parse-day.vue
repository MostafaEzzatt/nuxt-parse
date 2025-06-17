<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";
import { defaultVariant } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

type resultType = {
  number: string;
  dist: string;
  atd: string;
  ac: string;
  updated: string;
};

type renderDataType = {
  add: Array<resultType>;
  update: Array<resultType>;
  del: Array<resultType>;
  render: boolean;
};

// A reactive variable to hold the content of the file.
const fileContent = ref<string | null>(null);
const textareaContent = ref<string | null>(null);
const errorMessage = ref<string | null>(null);
const renderData = ref<renderDataType>({ add: [], update: [], del: [], render: false });

// function to get sheet date useing regex the date looks like 'DATE : DD/MM/YYYY' or 'Date: Friday 21MAR2025' and make both the same format 'DD/MM/YYYY'
function getSheetDate(data: string): string | null {
  // Match the date in the format 'DATE : DD/MM/YYYY' or 'Date: Friday 21MAR2025'
  // eslint-disable-next-line regexp/no-dupe-disjunctions
  const regex = /(?:DATE\s*:\s*|Date:\s*)(\d{1,2}\/\d{1,2}\/\d{4}|[A-Z]+\s*\d{1,2}[A-Z]{3}\d{4})/i;
  const match = data.match(regex);
  const operaDateRegex = /^\d{2}[a-z]{3}\d{4}$/i;
  if (match) {
    let dateStr = match[1];

    if (dateStr.includes(" ")) {
      dateStr = dateStr.split(" ")[1];
    }

    // check if dateStr equal 21MAR2025 convert it to '21/03/2025'

    // Convert 'Friday 21MAR2025' to '21/03/2025' or any other day of month
    if (dateStr.includes("/")) {
      // If the date is already in 'DD/MM/YYYY' format, return it as is.
      return dateStr;
    }
    else if (operaDateRegex.test(dateStr)) {
      const monthMap: { [key: string]: string } = {
        JAN: "01",
        FEB: "02",
        MAR: "03",
        APR: "04",
        MAY: "05",
        JUN: "06",
        JUL: "07",
        AUG: "08",
        SEP: "09",
        OCT: "10",
        NOV: "11",
        DEC: "12",
      };

      const currentDate = dateStr.split("");
      const day = currentDate.splice(0, 2).join("");
      const month = monthMap[currentDate.splice(0, 3).join("")];
      const year = currentDate.splice(0, 4).join("");
      return `${day}/${month}/${year}`;
    }
    else {
      return dateStr;
    } // Return as is for 'DD/MM/YYYY'
  }
  return null;
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    // Create a new FileReader instance.
    const reader = new FileReader();

    // Set up the onload event handler. This will be called when the file is read.
    reader.onload = (e) => {
      // Update our reactive variable with the file's content.
      fileContent.value = e.target?.result as string;
    };

    // Set up an error handler.
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
      fileContent.value = "Error reading file.";
    };

    // Read the file as plain text.
    reader.readAsText(file);
  }
}

function handleTextareaChange(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  textareaContent.value = target.value;
}

function retypeFlightType(flightType: string): string {
  let acType = flightType;
  switch (flightType) {
    case "321":
      acType = "A321";
      break;
    case "32N":
      acType = "A32N";
      break;
    case "73A":
      acType = "B738";
      break;
    case "73C":
      acType = "B73C";
      break;
    case "73F":
      acType = "B738";
      break;
    case "73B":
      acType = "B73B";
      break;
    case "789":
      acType = "B789";
      break;
    case "A3F":
      acType = "AB33";
      break;
    case "333":
      acType = "A333";
      break;
    case "A33":
      acType = "A330";
      break;
    case "B73":
      acType = "B773";
      break;
    case "332":
      acType = "A333";
      break;
    case "738":
      acType = "H738";
      break;
    default:
      // If the flight type is not recognized, return it as is.
      acType = flightType;
      break;
  }

  return acType;
}

function removeNonEnglishCharacters(str: string) {
  return str.replace(/[^a-z\s]/gi, ""); // Removes non-English letters and non-space characters
}

function parseFileData() {
  if (!fileContent.value) {
    errorMessage.value = "Please select a file to parse.";
    return;
  }

  const lines = fileContent.value.split("\n");
  let line = [];

  for (let i = 0; i < lines.length; i++) {
    const item = lines[i];

    if (item.includes("EGYPTAIR")) {
      i = i + 8;
      continue;
    }
    else if (item.includes("CH")) {
      continue;
    }
    else if (item.trim() === "") {
      continue;
    }

    line.push(item);
  }

  line = line.map((item: string) => {
    return {
      cus: item.substring(0, 4).trim(),
      number: item.substring(6, 10).trim(),
      dist: removeNonEnglishCharacters(item.substring(20, 28).trim()),
      ac: retypeFlightType(item.substring(51, 57).trim()),
      atd: item.substring(57, 68).replace(".", ":").trim(),
      sector: item.substring(68, 75).replace("\r", "").trim(),
    };
  });

  // If the date is valid, you can proceed with further processing.
  errorMessage.value = null; // Clear any previous error messages.
  return line;
}

function parseOperaData() {
  if (!textareaContent.value) {
    errorMessage.value = "Please paste data in the textarea.";
    return;
  }
  const lines = textareaContent.value.split("\n");
  const line = [];

  for (let i = 0; i < lines.length; i++) {
    const item = lines[i];

    if (item.includes("Egyptair")) {
      i = i + 13;
      continue;
    }

    const cleanLine = item.replace(/\s+/g, " ").split(" ");

    if (cleanLine.length < 10)
      continue;

    line.push(cleanLine);
  }

  const returnLine = line.map((item) => {
    return {
      number: item[2],
      dist: item[3].replace("-CAI", "").replace("-", "  ").trim(),
      atd: item[4].trim(),
      ac: retypeFlightType(item[6].trim()),
    };
  });

  // If the date is valid, you can proceed with further processing.
  errorMessage.value = null; // Clear any previous error messages.
  return returnLine;
}

function parseData() {
  if (!fileContent.value || !textareaContent.value) {
    errorMessage.value = "Please provide either a file or paste data in the textarea.";
    return;
  }

  const fileDate = getSheetDate(fileContent.value);
  const textareaDate = getSheetDate(textareaContent.value);

  if (fileDate !== textareaDate) {
    errorMessage.value = "The dates in the file and textarea do not match.";
    return;
  }

  const textareaData = parseOperaData();
  const parsedFileData = parseFileData();

  if (!textareaData || !parsedFileData) {
    errorMessage.value = "Error parsing data. Please check the format.";
    return;
  }

  // atd dist ac

  const add = [] as Array<resultType>;
  const update = [] as Array<resultType>;
  const del = [] as Array<resultType>;

  // opera { "number": "0060", "dist": "LXR", "atd": "23:55", "ac": "B738" }
  // imsl { "cus": "077", "number": "0958", "dist": "CAN                     ������", "ac": "B773", "atd": "00.10", "sector": "1" }

  for (let index = 0; index < parsedFileData.length; index++) {
    const element = parsedFileData[index];
    const find = textareaData.find(f => f.number === element.number);

    if (!find) {
      del.push({ ...element, updated: "del" });
    }
  }

  for (let o = 0; o < textareaData.length; o++) {
    const item = textareaData[o];

    const found = parsedFileData.find(f => f.number === item.number);
    if (!found) {
      add.push({ ...item, updated: "add" });
      continue;
    }
    else if (found.dist !== item.dist) {
      update.push({ ...item, updated: "dist" });
      continue;
    }
    else if (found.atd !== item.atd) {
      update.push({ ...item, updated: "ATD" });
      continue;
    }
    else if (found.ac !== item.ac) {
      update.push({ ...item, updated: "A/C Type" });
      continue;
    }
  }

  renderData.value = { add, update, del, render: true } as renderDataType;
}

const uploadBTN = cn(buttonVariants({ variant: "outline" }), "cursor-pointer capitalize w-full h-full");
const submitBTN = cn(buttonVariants({ variant: "default" }), "cursor-pointer capitalize w-full mt-4 font-bold");
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="print:hidden">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-60 max-h-60">
        <div class="col-span-1">
          <label class="w-full h-full block">
            <span :class="uploadBTN">Click to select a file</span>
            <div class="hidden">
              <input type="file" @change="handleFileChange">
            </div>
          </label>
        </div>
        <div class="col-span-1 max-h-60">
          <textarea placeholder="Past Your Opera Data" :class="`${defaultVariant} w-full h-full`" @change="handleTextareaChange" />
        </div>
      </div>

      <div v-if="errorMessage" class="bg-red-400 text-white text-center rounded py-2 mt-6">
        {{ errorMessage }}
      </div>

      <button :class="submitBTN" @click="parseData">
        Start Parsing
      </button>
    </div>

    <div v-if="renderData.render" class="mt-6 print:border-2 print:border-black print:p-3">
      <div>
        <h2 class="text-lg font-bold text-center mt-5 mb-3 print:mt-0 print:bg-black print:text-white print:py-3 print:text-2xl">
          Delete
        </h2>

        <div class="grid grid-cols-4 gap-2 text-center font-bold">
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            Flight No.
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            DIST
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            ATD
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            A/C Type
          </div>
        </div>

        <div v-for="row in renderData.del" :key="`del-${row.number}`" class="grid grid-cols-4 gap-2 text-center font-bold print:border-b-2 print:border-black print:last-of-type:border-b-0">
          <div class="col-span-1  py-2">
            {{ row.number }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.dist }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.atd }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.ac }}
          </div>
        </div>
      </div>
    </div>

    <!-- // Update -->
    <div v-if="renderData.render" class="mt-6 print:border-2 print:border-black  print:p-3">
      <div>
        <h2 class="text-lg font-bold text-center mb-3 mt-5 print:mt-0 print:bg-black print:text-white print:py-3 print:text-2xl">
          Update
        </h2>

        <div class="grid grid-cols-5 gap-2 text-center font-bold">
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            Updated ?
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            Flight No.
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            DIST
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            ATD
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            A/C Type
          </div>
        </div>

        <div v-for="row in renderData.update" :key="`update-${row.number}`" class="grid grid-cols-5 gap-2 text-center font-bold print:border-b-2 print:border-black print:last-of-type:border-b-0">
          <div class="col-span-1  py-2">
            {{ row.updated.toUpperCase() }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.number }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.dist }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.atd }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.ac }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="renderData.render" class="mt-6 print:border-2 print:border-black  print:p-3">
      <div>
        <h2 class="text-lg font-bold text-center mt-5 mb-3 print:mt-0 print:bg-black print:text-white print:py-3 print:text-2xl">
          Add
        </h2>

        <div class="grid grid-cols-4 gap-2 text-center font-bold">
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            Flight No.
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            DIST
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            ATD
          </div>
          <div class="col-span-1 bg-gray-800 py-2 print:bg-black print:text-white">
            A/C Type
          </div>
        </div>

        <div v-for="row in renderData.add" :key="`del-${row.number}`" class="grid grid-cols-4 gap-2 text-center font-bold print:border-b-2 print:border-black print:last-of-type:border-b-0">
          <div class="col-span-1  py-2">
            {{ row.number }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.dist }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.atd }}
          </div>
          <div class="col-span-1  py-2">
            {{ row.ac }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
