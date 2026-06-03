import "./styles.css";

const scenicPanel = document.querySelector(".scape-stars");
const dashboardTitle = document.querySelector("#dashboard-title");
const navItems = document.querySelectorAll("[data-view]");
const dashboardViews = document.querySelectorAll("[data-dashboard-view]");
const dataTabButtons = document.querySelectorAll("[data-data-tab]");
const dataSubViews = document.querySelectorAll("[data-data-subview]");
const dataInput = document.querySelector("#excel-data-input");
const parseDataButton = document.querySelector("#parse-data-button");
const saveDataButton = document.querySelector("#save-data-button");
const clearDataButton = document.querySelector("#clear-data-button");
const dataAnchorInput = document.querySelector("#data-anchor-input");
const parseAnchorButton = document.querySelector("#parse-anchor-button");
const saveAnchorButton = document.querySelector("#save-anchor-button");
const clearAnchorButton = document.querySelector("#clear-anchor-button");
const anchorPreviewHead = document.querySelector("#anchor-preview-head");
const anchorPreviewBody = document.querySelector("#anchor-preview-body");
const anchorRowCount = document.querySelector("#anchor-row-count");
const anchorColumnCount = document.querySelector("#anchor-column-count");
const anchorStorageStatus = document.querySelector("#anchor-storage-status");
const dataPreviewHead = document.querySelector("#data-preview-head");
const dataPreviewBody = document.querySelector("#data-preview-body");
const dataRowCount = document.querySelector("#data-row-count");
const dataColumnCount = document.querySelector("#data-column-count");
const dataStorageStatus = document.querySelector("#data-storage-status");
const emptyDataset = { headers: [], rows: [] };
const datasetStorageKey = "dashboardDataset";
const anchorStorageKey = "dashboardDataAnchor";
const storedDataset = localStorage.getItem(datasetStorageKey);
const storedAnchor = localStorage.getItem(anchorStorageKey);

window.dashboardDataset = emptyDataset;
window.dashboardDataAnchor = emptyDataset;

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

const setActiveDataTab = (tabName) => {
  dataTabButtons.forEach((button) => {
    const isActive = button.dataset.dataTab === tabName;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  dataSubViews.forEach((view) => {
    const isActive = view.dataset.dataSubview === tabName;
    view.hidden = !isActive;
    view.classList.toggle("active", isActive);
  });
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
    return { headers: [], rows: [], raw: rawValue };
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

  return { headers, rows, raw: rawValue };
};

const renderDatasetPreview = ({ dataset, head, body, rowCount, columnCount, status, emptyMessage, statusText }) => {
  if (!head || !body || !rowCount || !columnCount || !status) {
    return;
  }

  const { headers, rows } = dataset;

  head.replaceChildren();
  body.replaceChildren();

  rowCount.textContent = `${rows.length} ${rows.length === 1 ? "row" : "rows"}`;
  columnCount.textContent = `${headers.length} ${headers.length === 1 ? "column" : "columns"} detected`;

  if (headers.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.className = "empty-row";
    const emptyCell = document.createElement("td");
    emptyCell.textContent = emptyMessage;
    emptyRow.append(emptyCell);
    body.append(emptyRow);
    status.textContent = "Waiting for data";
    return;
  }

  const headRow = document.createElement("tr");
  headers.forEach((header) => {
    const cell = document.createElement("th");
    cell.textContent = header;
    headRow.append(cell);
  });
  head.append(headRow);

  rows.forEach((row) => {
    const bodyRow = document.createElement("tr");
    headers.forEach((header) => {
      const cell = document.createElement("td");
      cell.textContent = row[header] || "";
      bodyRow.append(cell);
    });
    body.append(bodyRow);
  });

  status.textContent = statusText || (rows.length > 0 ? "Preview ready" : "Headers detected");
};

const renderDataPreview = (dataset, statusText) => {
  renderDatasetPreview({
    dataset,
    head: dataPreviewHead,
    body: dataPreviewBody,
    rowCount: dataRowCount,
    columnCount: dataColumnCount,
    status: dataStorageStatus,
    emptyMessage: "Paste rows from Excel and click Preview Data.",
    statusText,
  });
};

const renderAnchorPreview = (dataset, statusText) => {
  renderDatasetPreview({
    dataset,
    head: anchorPreviewHead,
    body: anchorPreviewBody,
    rowCount: anchorRowCount,
    columnCount: anchorColumnCount,
    status: anchorStorageStatus,
    emptyMessage: "Paste anchor rows from Excel and click Preview Data.",
    statusText,
  });
};

const saveDataset = ({ storageKey, dataset, status }) => {
  localStorage.setItem(storageKey, JSON.stringify(dataset));

  if (status) {
    status.textContent = "Saved locally";
  }
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

dataTabButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));

  button.addEventListener("click", () => {
    const tabName = button.dataset.dataTab;
    const shouldDeselect = button.classList.contains("active");
    setActiveDataTab(shouldDeselect ? "" : tabName);
  });
});

if (storedDataset) {
  try {
    const dataset = JSON.parse(storedDataset);
    window.dashboardDataset = dataset;
    if (dataInput && dataset.raw) {
      dataInput.value = dataset.raw;
    }
    renderDataPreview(dataset, "Saved locally");
  } catch {
    localStorage.removeItem(datasetStorageKey);
  }
}

if (storedAnchor) {
  try {
    const dataset = JSON.parse(storedAnchor);
    window.dashboardDataAnchor = dataset;
    if (dataAnchorInput && dataset.raw) {
      dataAnchorInput.value = dataset.raw;
    }
    renderAnchorPreview(dataset, "Saved locally");
  } catch {
    localStorage.removeItem(anchorStorageKey);
  }
}

parseDataButton?.addEventListener("click", () => {
  const dataset = parseSpreadsheetData(dataInput?.value || "");
  window.dashboardDataset = dataset;
  renderDataPreview(dataset);
});

saveDataButton?.addEventListener("click", () => {
  const dataset = parseSpreadsheetData(dataInput?.value || "");
  window.dashboardDataset = dataset;
  renderDataPreview(dataset);
  saveDataset({ storageKey: datasetStorageKey, dataset, status: dataStorageStatus });
});

clearDataButton?.addEventListener("click", () => {
  if (dataInput) {
    dataInput.value = "";
  }

  localStorage.removeItem(datasetStorageKey);
  window.dashboardDataset = emptyDataset;
  renderDataPreview(emptyDataset);
});

parseAnchorButton?.addEventListener("click", () => {
  const dataset = parseSpreadsheetData(dataAnchorInput?.value || "");
  window.dashboardDataAnchor = dataset;
  renderAnchorPreview(dataset);
});

saveAnchorButton?.addEventListener("click", () => {
  const dataset = parseSpreadsheetData(dataAnchorInput?.value || "");
  window.dashboardDataAnchor = dataset;
  renderAnchorPreview(dataset);
  saveDataset({ storageKey: anchorStorageKey, dataset, status: anchorStorageStatus });
});

clearAnchorButton?.addEventListener("click", () => {
  if (dataAnchorInput) {
    dataAnchorInput.value = "";
  }

  localStorage.removeItem(anchorStorageKey);
  window.dashboardDataAnchor = emptyDataset;
  renderAnchorPreview(emptyDataset);
});
