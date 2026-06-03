import "./styles.css";

const scenicPanel = document.querySelector(".scape-stars");
const dashboardTitle = document.querySelector("#dashboard-title");
const navItems = document.querySelectorAll("[data-view]");
const dashboardViews = document.querySelectorAll("[data-dashboard-view]");
const dataInput = document.querySelector("#excel-data-input");
const parseDataButton = document.querySelector("#parse-data-button");
const clearDataButton = document.querySelector("#clear-data-button");
const dataPreviewHead = document.querySelector("#data-preview-head");
const dataPreviewBody = document.querySelector("#data-preview-body");
const dataRowCount = document.querySelector("#data-row-count");
const dataColumnCount = document.querySelector("#data-column-count");
const dataStorageStatus = document.querySelector("#data-storage-status");
const emptyDataset = { headers: [], rows: [] };
const datasetStorageKey = "dashboardDataset";
const storedDataset = localStorage.getItem(datasetStorageKey);

window.dashboardDataset = emptyDataset;

if (scenicPanel) {
  const starMarkup = Array.from({ length: 18 }, (_, index) => {
    const left = ((index * 17) % 92) + 4;
    const top = ((index * 23) % 46) + 6;
    const size = (index % 3) + 1;

    return `<span style="left:${left}%;top:${top}%;width:${size}px;height:${size}px"></span>`;
  }).join("");

  scenicPanel.insertAdjacentHTML("beforeend", starMarkup);
}

const setActiveView = (viewName) => {
  navItems.forEach((item) => {
    const isActive = item.dataset.view === viewName;
    item.classList.toggle("active", isActive);

    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  dashboardViews.forEach((view) => {
    const isActive = view.dataset.dashboardView === viewName;
    view.hidden = !isActive;
    view.classList.toggle("active", isActive);
  });

  if (dashboardTitle) {
    dashboardTitle.textContent = viewName === "data" ? "Data" : "Overview";
  }
};

const parseDelimitedLine = (line, delimiter) => {
  const cells = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && nextCharacter === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === delimiter && !inQuotes) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }

  cells.push(cell.trim());
  return cells;
};

const parseSpreadsheetData = (rawValue) => {
  const lines = rawValue
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const delimiter = rawValue.includes("\t") ? "\t" : ",";
  const table = lines.map((line) => parseDelimitedLine(line, delimiter));
  const columnCount = Math.max(...table.map((row) => row.length));
  const headers = table[0].map((header, index) => header || `Column ${index + 1}`);

  while (headers.length < columnCount) {
    headers.push(`Column ${headers.length + 1}`);
  }

  const rows = table.slice(1).map((row) =>
    headers.reduce((record, header, index) => {
      record[header] = row[index] || "";
      return record;
    }, {}),
  );

  return { headers, rows };
};

const renderDataPreview = ({ headers, rows }) => {
  if (!dataPreviewHead || !dataPreviewBody || !dataRowCount || !dataColumnCount || !dataStorageStatus) {
    return;
  }

  dataPreviewHead.replaceChildren();
  dataPreviewBody.replaceChildren();

  dataRowCount.textContent = `${rows.length} ${rows.length === 1 ? "row" : "rows"}`;
  dataColumnCount.textContent = `${headers.length} ${headers.length === 1 ? "column" : "columns"} detected`;

  if (headers.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.className = "empty-row";
    const emptyCell = document.createElement("td");
    emptyCell.textContent = "Paste rows from Excel and click Preview Data.";
    emptyRow.append(emptyCell);
    dataPreviewBody.append(emptyRow);
    dataStorageStatus.textContent = "Waiting for data";
    return;
  }

  const headRow = document.createElement("tr");
  headers.forEach((header) => {
    const cell = document.createElement("th");
    cell.textContent = header;
    headRow.append(cell);
  });
  dataPreviewHead.append(headRow);

  rows.forEach((row) => {
    const bodyRow = document.createElement("tr");
    headers.forEach((header) => {
      const cell = document.createElement("td");
      cell.textContent = row[header] || "";
      bodyRow.append(cell);
    });
    dataPreviewBody.append(bodyRow);
  });

  dataStorageStatus.textContent = rows.length > 0 ? "Saved locally" : "Headers detected";
};

navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const viewName = item.dataset.view;

    if (!viewName) {
      return;
    }

    event.preventDefault();
    setActiveView(viewName);
  });
});

if (storedDataset) {
  try {
    const dataset = JSON.parse(storedDataset);
    window.dashboardDataset = dataset;
    renderDataPreview(dataset);
  } catch {
    localStorage.removeItem(datasetStorageKey);
  }
}

parseDataButton?.addEventListener("click", () => {
  const dataset = parseSpreadsheetData(dataInput?.value || "");
  localStorage.setItem(datasetStorageKey, JSON.stringify(dataset));
  window.dashboardDataset = dataset;
  renderDataPreview(dataset);
});

clearDataButton?.addEventListener("click", () => {
  if (dataInput) {
    dataInput.value = "";
  }

  localStorage.removeItem(datasetStorageKey);
  window.dashboardDataset = emptyDataset;
  renderDataPreview(emptyDataset);
});
