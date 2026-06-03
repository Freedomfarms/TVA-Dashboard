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
const defaultAnchorRaw = `PO 2\tPO 1\tPart Number\tVendor\tProcess\tMin WIP\tLT\tBU
\t4700912755\t4119904\tATA\tCBN\t0\t12\tMilitary
\t4700912732\t4119905\tATA\tCBN\t0\t12\tMilitary
\t4700917070\t4320806\tATA\tCBN\t0\t12\tMilitary
\t4700917067\t4318207\tATA\tCBN\t0\t12\tMilitary
\t4700917074\t4317508\tATA\tCBN\t0\t12\tMilitary
\t4700917065\t4131129-01\tATA\tCBN\t0\t12\tMilitary
\t4700915307\t4085004\tATA\tCBN\t0\t12\tMilitary
\t4700915328\t4084105\tATA\tCBN\t0\t12\tMilitary
\t4700915329\t4084106\tATA\tCBN\t0\t12\tMilitary
4700911991\t4700915330\t4081507\tATA\tCBN\t0\t12\tMilitary
\t4700915629\tMD4134613-91\tBudney\tTurn\t35\t45\tMilitary
4700909661\t4700916287\t4119904\tCW\tPlasma\t0\t4\tMilitary
4700909884\t4700916352\t4119905\tCW\tPlasma\t0\t4\tMilitary
\t4700916356\t4318207\tCW\tPlasma\t0\t4\tMilitary
4700912553\t4700916355\t4131129-01\tCW\tPlasma\t0\t4\tMilitary
\t4700913839\t4138202\tCW\tPlasma\t0\t4\tMilitary
\t4700916350\t4137321\tDHI\tDeburr\t21\t28\tMilitary
\t\tMD4088768-02\tDHI\tDeburr\t0\t7\tMilitary
\t4700917773\tMD4088768-03\tDHI\tDeburr\t0\t7\tMilitary
\t4700917312\tMD4131129-21\tHanwha\tTurn\t15\t35\tMilitary
\t4700911826\t4089026-01\tLinde\tCoat / Grind\t1\t21\tMilitary
\t4700910723\t4082602\tLinde\tCoat / Grind\t2\t21\tMilitary
\t4700916250\t4326628\tMSC\tCoat\t1\t21\tMilitary
\t4700913559\t4322743-01\tMSC\tCoat\t0\t21\tMilitary
\t4700913282\t6W30P2594-01\tATL\tSonic\t1\t21\tCommercial
\t4700913815\t30G5307\tBudney\tTurn\t6\t6\tCommercial
4700907130\t4700915655\t2A4802\tBudney\tTurn\t5\t30\tCommercial
\t4700917002\t31G1508\tBudney\tTurn\t2\t60\tCommercial
\t4700917802\t31G1508\tBudney\tBalance\t0\t3\tCommercial
4700912698\t4700917731\t30G7208\tCW\tAlox\t10\t6\tCommercial
\t4700909289\t1B4237\tHanwha\tTurn\t0\t60\tCommercial
\t4700916806\t50D497\tHanwha\tTurn\t1\t21\tCommercial
\t4700915204\t30G4407\tLinde\tCBN\t10\t9\tCommercial
\t4700912902\t30G5307\tLinde\tCBN\t10\t9\tCommercial
\t4700915449\t30G8908\tLinde\tCBN / Alox\t31\t13\tCommercial
\t4700917002\t31G1508\tLinde\tAlox\t0\t9\tCommercial
\t4700917105\t31G0508\tLinde\tAlox\t0\t9\tCommercial
4700911916\t4700916368\t30G8908\tMDS\tBlack Gold\t18\t7\tCommercial
\t4700917429\t31G0508\tMDS\tBlack Gold\t0\t7\tCommercial
4700913825\t4700910542\t1B6275-01\tNE Plasma\tPlasma\t1\t14\tCommercial
\t4700916888\t2A5001\tTest Devices\tSpin\t0\t15\tCommercial
4700906262\t4700916787\t2A4802\tTest Devices\tSpin\t0\t15\tCommercial
\t4700915229\t52G158\tValence\tAnodize\t1\t30\tCommercial
\t4700916685\t53D925\tValence\tAnodize\t2\t30\tCommercial`;

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
    dashboardTitle.textContent = viewName === "data" ? "Data" : "Mission Control";
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
} else {
  const dataset = parseSpreadsheetData(defaultAnchorRaw);
  window.dashboardDataAnchor = dataset;
  if (dataAnchorInput) {
    dataAnchorInput.value = defaultAnchorRaw;
  }
  renderAnchorPreview(dataset, "Template loaded");
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
