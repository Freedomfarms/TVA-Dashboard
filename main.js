import "./styles.css";
import defaultWipRaw from "./wip-data.txt?raw";
import defaultDeliveriesRaw from "./deliveries-data.txt?raw";
import defaultOutgoingRaw from "./outgoing-data.txt?raw";

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
const deliveriesInput = document.querySelector("#deliveries-input");
const parseDeliveriesButton = document.querySelector("#parse-deliveries-button");
const addDeliveriesButton = document.querySelector("#add-deliveries-button");
const clearDeliveriesButton = document.querySelector("#clear-deliveries-button");
const deliveriesPreviewHead = document.querySelector("#deliveries-preview-head");
const deliveriesPreviewBody = document.querySelector("#deliveries-preview-body");
const deliveriesRowCount = document.querySelector("#deliveries-row-count");
const deliveriesColumnCount = document.querySelector("#deliveries-column-count");
const deliveriesStorageStatus = document.querySelector("#deliveries-storage-status");
const outgoingInput = document.querySelector("#outgoing-input");
const parseOutgoingButton = document.querySelector("#parse-outgoing-button");
const saveOutgoingButton = document.querySelector("#save-outgoing-button");
const clearOutgoingButton = document.querySelector("#clear-outgoing-button");
const outgoingPreviewHead = document.querySelector("#outgoing-preview-head");
const outgoingPreviewBody = document.querySelector("#outgoing-preview-body");
const outgoingRowCount = document.querySelector("#outgoing-row-count");
const outgoingColumnCount = document.querySelector("#outgoing-column-count");
const outgoingStorageStatus = document.querySelector("#outgoing-storage-status");
const militaryWipBody = document.querySelector("#military-wip-body");
const commercialWipBody = document.querySelector("#commercial-wip-body");
const militaryWipCount = document.querySelector("#military-wip-count");
const commercialWipCount = document.querySelector("#commercial-wip-count");
const escalationFeed = document.querySelector("#escalation-feed");
const escalationAddButton = document.querySelector("#escalation-add");
const escalationAddButtonTab = document.querySelector("#escalation-add-tab");
const escalationTabFeed = document.querySelector("#escalation-tab-feed");
const escalationSortSelect = document.querySelector("#escalation-sort");
const escDatePrev = document.querySelector("#esc-date-prev");
const escDateNext = document.querySelector("#esc-date-next");
const escDateLabel = document.querySelector("#esc-date-label");
const emptyDataset = { headers: [], rows: [] };
const datasetStorageKey = "dashboardDataset";
const anchorStorageKey = "dashboardDataAnchor";
const storedDataset = localStorage.getItem(datasetStorageKey);
const storedAnchor = localStorage.getItem(anchorStorageKey);
const deliveriesStorageKey = "dashboardDeliveries";
const storedDeliveries = localStorage.getItem(deliveriesStorageKey);
const outgoingStorageKey = "dashboardOutgoing";
const storedOutgoing = localStorage.getItem(outgoingStorageKey);
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
window.dashboardDeliveries = emptyDataset;
window.dashboardOutgoing = emptyDataset;

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
    dashboardTitle.textContent =
      viewName === "data" ? "Data" : viewName === "escalation" ? "Escalation Notes" : "Mission Control";
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
    .filter((line) => line.trim().length > 0);

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
  renderProductionReadiness();
  refreshOutgoing();
};

const renderDeliveriesPreview = (dataset, statusText) => {
  renderDatasetPreview({
    dataset,
    head: deliveriesPreviewHead,
    body: deliveriesPreviewBody,
    rowCount: deliveriesRowCount,
    columnCount: deliveriesColumnCount,
    status: deliveriesStorageStatus,
    emptyMessage: "Paste delivery rows from Excel and click Preview Data.",
    statusText,
  });
};

const renderOutgoingPreview = (dataset, statusText) => {
  renderDatasetPreview({
    dataset,
    head: outgoingPreviewHead,
    body: outgoingPreviewBody,
    rowCount: outgoingRowCount,
    columnCount: outgoingColumnCount,
    status: outgoingStorageStatus,
    emptyMessage: "Paste outgoing rows from Excel and click Preview Data.",
    statusText,
  });
};

const hasHeaders = (dataset, requiredHeaders) => {
  const headers = dataset?.headers || [];
  return requiredHeaders.every((requiredHeader) => headers.includes(requiredHeader));
};

const isWipDataset = (dataset) =>
  hasHeaders(dataset, ["Incoming PO", "Ship Date", "Qty"]);

const isAnchorDataset = (dataset) =>
  hasHeaders(dataset, ["PO 1", "Part Number", "Vendor", "Process", "Min WIP", "LT", "BU"]);

const isDeliveriesDataset = (dataset) =>
  hasHeaders(dataset, ["PO", "Qty", "Received"]);

const isOutgoingDataset = (dataset) =>
  hasHeaders(dataset, ["REF_DOC / PO", "Ship Date", "LT Return"]);

const parseSlashDate = (value) => {
  const match = String(value).match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (!match) {
    return null;
  }
  let year = Number(match[3]);
  if (year < 100) {
    year += 2000;
  }
  return new Date(year, Number(match[1]) - 1, Number(match[2]));
};

const formatSlashDate = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}`;
};

const addBusinessDays = (date, days) => {
  const result = new Date(date.getTime());
  const target = Math.abs(days);
  const step = days >= 0 ? 1 : -1;
  let added = 0;
  while (added < target) {
    result.setDate(result.getDate() + step);
    const weekday = result.getDay();
    if (weekday !== 0 && weekday !== 6) {
      added += 1;
    }
  }
  return result;
};

const buildAnchorLtIndex = (anchorDataset) => {
  const index = new Map();
  (anchorDataset?.rows || []).forEach((row) => {
    const lt = toNumber(getRowValue(row, ["LT", "Lead Time"]));
    [getRowValue(row, ["PO 1", "PO1"]), getRowValue(row, ["PO 2", "PO2"])]
      .map((po) => String(po).trim())
      .filter(Boolean)
      .forEach((po) => {
        if (!index.has(po)) {
          index.set(po, lt);
        }
      });
  });
  return index;
};

const computeOutgoing = (dataset) => {
  if (!dataset || !dataset.headers || dataset.headers.length === 0) {
    return dataset || emptyDataset;
  }

  const ltIndex = buildAnchorLtIndex(window.dashboardDataAnchor);
  const rows = (dataset.rows || []).map((row) => {
    const next = { ...row };
    const ref = String(getRowValue(row, ["REF_DOC / PO", "REF_DOC", "PO"])).trim();
    const shipDate = parseSlashDate(getRowValue(row, ["Ship Date", "Date"]));

    if (ref && shipDate && ltIndex.has(ref)) {
      next["LT Return"] = formatSlashDate(addBusinessDays(shipDate, ltIndex.get(ref)));
    } else {
      next["LT Return"] = "";
    }

    return next;
  });

  return { headers: dataset.headers, rows, raw: dataset.raw };
};

const refreshOutgoing = () => {
  if (!outgoingPreviewHead) {
    return;
  }
  const computed = computeOutgoing(window.dashboardOutgoing || emptyDataset);
  window.dashboardOutgoing = computed;
  renderOutgoingPreview(computed);
};

const getRowValue = (row, labels) => {
  const labelList = Array.isArray(labels) ? labels : [labels];
  const key = labelList.find((label) => Object.prototype.hasOwnProperty.call(row, label));
  return key ? row[key] : "";
};

const toNumber = (value) => {
  const parsed = Number.parseFloat(String(value).replace(/[$,%]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const createCell = (value, className) => {
  const cell = document.createElement("td");
  cell.textContent = value;

  if (className) {
    cell.className = className;
  }

  return cell;
};

const buildWipQtyIndex = (wipDataset) => {
  const totals = new Map();

  (wipDataset?.rows || []).forEach((row) => {
    const po = String(getRowValue(row, ["Incoming PO", "PO"])).trim();

    if (!po) {
      return;
    }

    const qty = toNumber(getRowValue(row, ["Qty", "Quantity"]));
    totals.set(po, (totals.get(po) || 0) + qty);
  });

  return totals;
};

const buildReadinessRows = (anchorDataset, wipIndex) =>
  (anchorDataset?.rows || []).map((row) => {
    const poNumbers = [
      ...new Set(
        [getRowValue(row, ["PO 1", "PO1"]), getRowValue(row, ["PO 2", "PO2"])]
          .map((po) => String(po).trim())
          .filter(Boolean),
      ),
    ];

    const cleanWip = poNumbers.reduce((sum, po) => sum + (wipIndex.get(po) || 0), 0);
    const minWip = toNumber(getRowValue(row, ["Min WIP", "Minimum WIP"]));

    return {
      part: getRowValue(row, "Part Number"),
      vendor: getRowValue(row, "Vendor"),
      process: getRowValue(row, "Process"),
      cleanWip,
      minWip,
      shortage: minWip - cleanWip,
      bu: String(getRowValue(row, ["BU", "Business Unit"])),
    };
  });

const renderReadinessTable = ({ rows, body, count }) => {
  if (!body || !count) {
    return;
  }

  body.replaceChildren();
  count.textContent = `${rows.length} ${rows.length === 1 ? "row" : "rows"}`;

  if (rows.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = createCell("No anchor rows loaded.", "");
    emptyCell.colSpan = 5;
    emptyRow.append(emptyCell);
    body.append(emptyRow);
    return;
  }

  rows.forEach(({ part, vendor, process, cleanWip, minWip }) => {
    const isShort = cleanWip < minWip;
    const tableRow = document.createElement("tr");

    if (isShort) {
      tableRow.className = "wip-row-short";
    }

    tableRow.append(
      createCell(part),
      createCell(vendor),
      createCell(process),
      createCell(cleanWip, isShort ? "wip-short" : "wip-good"),
      createCell(minWip),
    );

    body.append(tableRow);
  });
};

const renderProductionReadiness = () => {
  const wipIndex = buildWipQtyIndex(window.dashboardDataset);
  const readinessRows = buildReadinessRows(window.dashboardDataAnchor, wipIndex);

  renderReadinessTable({
    rows: readinessRows.filter(({ bu }) => bu.toLowerCase() === "military"),
    body: militaryWipBody,
    count: militaryWipCount,
  });
  renderReadinessTable({
    rows: readinessRows.filter(({ bu }) => bu.toLowerCase() === "commercial"),
    body: commercialWipBody,
    count: commercialWipCount,
  });

  renderEscalation();
};

const formatCount = (value) => Number(value).toLocaleString("en-US");

const severityLabels = {
  critical: "Critical",
  warning: "Watch",
  positive: "Healthy",
  info: "Note",
};

const severityOptions = ["critical", "warning", "positive", "info"];

const severityRank = { critical: 0, warning: 1, positive: 2, info: 3 };

const categoryGlyphs = {
  WIP: "\u25B2",
  Performance: "\u25D1",
  Outgoing: "\u2197",
  Incoming: "\u2198",
  Delivery: "\u25C8",
};

const parseShipDate = (value) => {
  const match = String(value).match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  return match ? new Date(Number(match[3]), Number(match[1]) - 1, Number(match[2])) : null;
};

const toIsoDate = (date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

const todayIso = () => toIsoDate(new Date());

const formatNoteDate = (iso) => {
  const date = iso ? new Date(`${iso}T00:00:00`) : new Date();
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatNoteDateFull = (iso) => {
  const date = iso ? new Date(`${iso}T00:00:00`) : new Date();
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const escalationStateKey = "escalationNotesState";

const getEscalationState = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(escalationStateKey));
    return {
      overrides: parsed?.overrides || {},
      dismissed: parsed?.dismissed || [],
      userNotes: parsed?.userNotes || [],
    };
  } catch {
    return { overrides: {}, dismissed: [], userNotes: [] };
  }
};

const saveEscalationState = (state) => {
  localStorage.setItem(escalationStateKey, JSON.stringify(state));
};

let escalationEditingId = null;
let escalationSelectedDate = todayIso();
let escalationSort = "date-desc";

const mockHistoryNotes = [
  { id: "mock-0531-1", kind: "mock", date: "2026-05-31", severity: "critical", category: "WIP", title: "4326628 below minimum WIP", detail: "MSC \u00B7 Coat \u2014 0 clean vs 1 required.", metric: "-1" },
  { id: "mock-0531-2", kind: "mock", date: "2026-05-31", severity: "warning", category: "Performance", title: "70% WIP coverage across tracked parts", detail: "31 of 44 anchor parts meet or exceed minimum WIP.", metric: "70%" },
  { id: "mock-0531-3", kind: "mock", date: "2026-05-31", severity: "info", category: "Outgoing", title: "8 units delivered", detail: "8 delivery lines logged \u00B7 latest movement May 31.", metric: "8" },
  { id: "mock-0601-1", kind: "mock", date: "2026-06-01", severity: "critical", category: "WIP", title: "30G8908 below minimum WIP", detail: "MDS \u00B7 Black Gold \u2014 14 clean vs 18 required.", metric: "-4" },
  { id: "mock-0601-2", kind: "mock", date: "2026-06-01", severity: "positive", category: "Delivery", title: "On-time delivery rate at 94%", detail: "On-time performance held above target across active POs.", metric: "94%" },
  { id: "mock-0601-3", kind: "mock", date: "2026-06-01", severity: "info", category: "Outgoing", title: "21 units delivered", detail: "21 delivery lines logged \u00B7 latest movement Jun 1.", metric: "21" },
  { id: "mock-0602-1", kind: "mock", date: "2026-06-02", severity: "warning", category: "WIP", title: "1B6275-01 approaching minimum WIP", detail: "NE Plasma \u00B7 Plasma \u2014 0 clean vs 1 required.", metric: "-1" },
  { id: "mock-0602-2", kind: "mock", date: "2026-06-02", severity: "info", category: "Incoming", title: "Incoming PO 4700917312 received", detail: "4 units received against PO 4700917312 (MD4131129-21).", metric: "+4" },
  { id: "mock-0602-3", kind: "mock", date: "2026-06-02", severity: "info", category: "Outgoing", title: "8 units delivered", detail: "8 delivery lines logged \u00B7 latest movement Jun 2.", metric: "8" },
];

const buildEscalationNotes = () => {
  const wipDataset = window.dashboardDataset;
  const anchorDataset = window.dashboardDataAnchor;
  const wipRows = wipDataset?.rows || [];
  const wipIndex = buildWipQtyIndex(wipDataset);
  const readiness = buildReadinessRows(anchorDataset, wipIndex);
  const date = todayIso();
  const notes = [];

  const poToPart = new Map();
  (anchorDataset?.rows || []).forEach((row) => {
    const info = {
      part: getRowValue(row, "Part Number"),
      vendor: getRowValue(row, "Vendor"),
      process: getRowValue(row, "Process"),
    };
    [getRowValue(row, ["PO 1", "PO1"]), getRowValue(row, ["PO 2", "PO2"])]
      .map((po) => String(po).trim())
      .filter(Boolean)
      .forEach((po) => {
        if (!poToPart.has(po)) {
          poToPart.set(po, info);
        }
      });
  });

  const shortages = readiness
    .filter((row) => row.cleanWip < row.minWip)
    .sort((a, b) => (b.minWip - b.cleanWip) - (a.minWip - a.cleanWip));

  shortages.slice(0, 4).forEach((row) => {
    const gap = row.minWip - row.cleanWip;
    notes.push({
      id: `ai-wip-${row.part}-${row.vendor}-${row.process}`,
      kind: "ai",
      date,
      severity: "critical",
      category: "WIP",
      title: `${row.part} below minimum WIP`,
      detail: `${row.vendor} \u00B7 ${row.process} \u2014 ${row.cleanWip} clean vs ${row.minWip} required.`,
      metric: `-${gap}`,
    });
  });

  if (readiness.length) {
    const covered = readiness.filter((row) => row.cleanWip >= row.minWip).length;
    const pct = Math.round((covered / readiness.length) * 100);
    notes.push({
      id: "ai-performance",
      kind: "ai",
      date,
      severity: pct >= 80 ? "positive" : "warning",
      category: "Performance",
      title: `${pct}% WIP coverage across tracked parts`,
      detail: `${covered} of ${readiness.length} anchor parts meet or exceed minimum WIP.`,
      metric: `${pct}%`,
    });
  }

  if (wipRows.length) {
    const totalShipped = wipRows.reduce((sum, row) => sum + toNumber(getRowValue(row, ["Qty", "Quantity"])), 0);
    const dates = wipRows
      .map((row) => parseShipDate(getRowValue(row, ["Ship Date", "Date"])))
      .filter(Boolean);
    const latest = dates.length ? new Date(Math.max(...dates.map((value) => value.getTime()))) : null;
    const latestLabel = latest
      ? latest.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "\u2014";

    notes.push({
      id: "ai-outgoing-total",
      kind: "ai",
      date,
      severity: "info",
      category: "Outgoing",
      title: `${formatCount(totalShipped)} units delivered this period`,
      detail: `${formatCount(wipRows.length)} delivery lines logged \u00B7 latest movement ${latestLabel}.`,
      metric: formatCount(totalShipped),
    });

    let topPo = null;
    let topQty = -1;
    wipIndex.forEach((qty, po) => {
      if (qty > topQty) {
        topQty = qty;
        topPo = po;
      }
    });

    if (topPo) {
      const info = poToPart.get(topPo);
      const who = info ? `${info.part} (${info.vendor} \u00B7 ${info.process})` : `PO ${topPo}`;
      notes.push({
        id: "ai-outgoing-top",
        kind: "ai",
        date,
        severity: "info",
        category: "Outgoing",
        title: `Highest throughput \u2014 ${who}`,
        detail: `PO ${topPo} accounts for ${topQty} delivered units, the most active line this period.`,
        metric: formatCount(topQty),
      });
    }
  }

  notes.push({
    id: "ai-incoming",
    kind: "ai",
    date,
    severity: "info",
    category: "Incoming",
    title: "Incoming receipts pending integration",
    detail: "Feed currently reflects outgoing deliveries; incoming + performance sources are coming online.",
    metric: "\u2014",
  });

  return notes;
};

const getGeneratedNotes = () => [...buildEscalationNotes(), ...mockHistoryNotes];

const getResolvedNotes = () => {
  const state = getEscalationState();
  const generated = getGeneratedNotes()
    .filter((note) => !state.dismissed.includes(note.id))
    .map((note) => {
      const override = state.overrides[note.id];
      return override ? { ...note, ...override, edited: true } : { ...note };
    });
  const userNotes = state.userNotes.map((note) => ({ ...note, kind: "user" }));
  return [...userNotes, ...generated];
};

const sortNotes = (notes, sort) => {
  const copy = [...notes];
  switch (sort) {
    case "date-asc":
      copy.sort((a, b) => String(a.date).localeCompare(String(b.date)));
      break;
    case "severity":
      copy.sort((a, b) => (severityRank[a.severity] ?? 9) - (severityRank[b.severity] ?? 9));
      break;
    case "category":
      copy.sort((a, b) => String(a.category).localeCompare(String(b.category)));
      break;
    case "title":
      copy.sort((a, b) => String(a.title).localeCompare(String(b.title)));
      break;
    case "date-desc":
    default:
      copy.sort((a, b) => String(b.date).localeCompare(String(a.date)));
      break;
  }
  return copy;
};

const saveEscalationNote = (note, updated) => {
  const state = getEscalationState();

  if (note.kind === "user") {
    const merged = { ...note, ...updated, kind: "user" };
    delete merged.isNew;
    const index = state.userNotes.findIndex((entry) => entry.id === note.id);
    if (index >= 0) {
      state.userNotes[index] = merged;
    } else {
      state.userNotes.unshift(merged);
    }
  } else {
    state.overrides[note.id] = updated;
  }

  saveEscalationState(state);
  escalationEditingId = null;
  renderEscalation();
};

const deleteEscalationNote = (note) => {
  const state = getEscalationState();

  if (note.kind === "user") {
    state.userNotes = state.userNotes.filter((entry) => entry.id !== note.id);
  } else {
    if (!state.dismissed.includes(note.id)) {
      state.dismissed.push(note.id);
    }
    delete state.overrides[note.id];
  }

  saveEscalationState(state);
  if (escalationEditingId === note.id) {
    escalationEditingId = null;
  }
  renderEscalation();
};

const cancelEscalationEdit = (note) => {
  if (note.kind === "user" && note.isNew) {
    const state = getEscalationState();
    state.userNotes = state.userNotes.filter((entry) => entry.id !== note.id);
    saveEscalationState(state);
  }
  escalationEditingId = null;
  renderEscalation();
};

const addEscalationNote = () => {
  const note = {
    id: `user-${Date.now()}`,
    kind: "user",
    severity: "info",
    category: "Note",
    title: "",
    detail: "",
    metric: "\u2014",
    date: escalationSelectedDate,
    isNew: true,
  };
  const state = getEscalationState();
  state.userNotes.unshift(note);
  saveEscalationState(state);
  escalationEditingId = note.id;
  renderEscalation();
};

const shiftEscalationDate = (deltaDays) => {
  const base = new Date(`${escalationSelectedDate}T00:00:00`);
  base.setDate(base.getDate() + deltaDays);
  escalationSelectedDate = toIsoDate(base);
  renderEscalation();
};

const buildNoteActionButton = (className, glyph, label, handler) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `note-action ${className}`;
  button.title = label;
  button.setAttribute("aria-label", label);
  button.textContent = glyph;
  button.addEventListener("click", handler);
  return button;
};

const buildNoteView = (note) => {
  const item = document.createElement("article");
  item.className = `escalation-note sev-${note.severity}`;
  item.dataset.id = note.id;

  const rail = document.createElement("span");
  rail.className = "note-rail";

  const icon = document.createElement("div");
  icon.className = "note-icon";
  icon.textContent = categoryGlyphs[note.category] || "\u2022";

  const body = document.createElement("div");
  body.className = "note-body";

  const meta = document.createElement("div");
  meta.className = "note-meta";
  const cat = document.createElement("span");
  cat.className = "note-cat";
  cat.textContent = note.category;
  const sev = document.createElement("span");
  sev.className = "note-sev";
  sev.textContent = severityLabels[note.severity] || "Note";
  const date = document.createElement("span");
  date.className = "note-date";
  date.textContent = formatNoteDate(note.date);
  date.title = formatNoteDateFull(note.date);
  meta.append(cat, sev, date);

  const title = document.createElement("strong");
  title.className = "note-title";
  title.textContent = note.title || "Untitled note";

  const detail = document.createElement("p");
  detail.className = "note-detail";
  detail.textContent = note.detail;

  body.append(meta, title, detail);

  const aside = document.createElement("div");
  aside.className = "note-aside";
  const metric = document.createElement("div");
  metric.className = "note-metric";
  metric.textContent = note.metric;
  const actions = document.createElement("div");
  actions.className = "note-actions";
  actions.append(
    buildNoteActionButton("note-edit", "\u270E", "Edit note", () => {
      escalationEditingId = note.id;
      renderEscalation();
    }),
    buildNoteActionButton("note-delete", "\u2715", "Delete note", () => deleteEscalationNote(note)),
  );
  aside.append(metric, actions);

  item.append(rail, icon, body, aside);
  item.addEventListener("dblclick", () => {
    escalationEditingId = note.id;
    renderEscalation();
  });

  return item;
};

const buildNoteEditor = (note) => {
  const form = document.createElement("form");
  form.className = `escalation-note escalation-note-edit sev-${note.severity}`;
  form.dataset.id = note.id;

  const rail = document.createElement("span");
  rail.className = "note-rail";

  const grid = document.createElement("div");
  grid.className = "note-edit-grid";

  const sevSelect = document.createElement("select");
  sevSelect.className = "note-input note-input-sev";
  severityOptions.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = severityLabels[option];
    if (option === note.severity) {
      opt.selected = true;
    }
    sevSelect.append(opt);
  });
  sevSelect.addEventListener("change", () => {
    form.className = `escalation-note escalation-note-edit sev-${sevSelect.value}`;
  });

  const catInput = document.createElement("input");
  catInput.className = "note-input";
  catInput.value = note.category || "";
  catInput.placeholder = "Category";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "note-input note-input-date";
  dateInput.value = note.date || todayIso();

  const titleInput = document.createElement("input");
  titleInput.className = "note-input note-input-title";
  titleInput.value = note.title || "";
  titleInput.placeholder = "Title";

  const detailInput = document.createElement("textarea");
  detailInput.className = "note-input note-input-detail";
  detailInput.rows = 2;
  detailInput.value = note.detail || "";
  detailInput.placeholder = "Detail";

  const metricInput = document.createElement("input");
  metricInput.className = "note-input note-input-metric";
  metricInput.value = note.metric || "";
  metricInput.placeholder = "Metric";

  const topRow = document.createElement("div");
  topRow.className = "note-edit-row";
  topRow.append(sevSelect, catInput, dateInput);

  const bottomRow = document.createElement("div");
  bottomRow.className = "note-edit-row";
  bottomRow.append(metricInput);

  grid.append(topRow, titleInput, detailInput, bottomRow);

  const actions = document.createElement("div");
  actions.className = "note-edit-actions";
  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.className = "note-action note-save";
  saveBtn.title = "Save note";
  saveBtn.setAttribute("aria-label", "Save note");
  saveBtn.textContent = "\u2713";
  const cancelBtn = buildNoteActionButton("note-cancel", "\u2715", "Cancel", () => cancelEscalationEdit(note));
  actions.append(saveBtn, cancelBtn);

  form.append(rail, grid, actions);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveEscalationNote(note, {
      severity: sevSelect.value,
      category: catInput.value.trim() || "Note",
      date: dateInput.value || todayIso(),
      title: titleInput.value.trim() || "Untitled note",
      detail: detailInput.value.trim(),
      metric: metricInput.value.trim() || "\u2014",
    });
  });

  return form;
};

const renderNotesInto = (container, notes, emptyMessage) => {
  if (!container) {
    return;
  }

  container.replaceChildren();

  if (!notes.length) {
    const empty = document.createElement("p");
    empty.className = "escalation-empty";
    empty.textContent = emptyMessage;
    container.append(empty);
    return;
  }

  notes.forEach((note) => {
    const element = escalationEditingId === note.id ? buildNoteEditor(note) : buildNoteView(note);
    container.append(element);
  });
};

const renderEscalation = () => {
  const all = getResolvedNotes();

  if (escDateLabel) {
    escDateLabel.textContent = formatNoteDate(escalationSelectedDate);
  }

  const dayNotes = all.filter((note) => note.date === escalationSelectedDate);
  renderNotesInto(escalationFeed, dayNotes, "No escalation notes for this date \u2014 use + to add one.");

  const sorted = sortNotes(all, escalationSort);
  renderNotesInto(escalationTabFeed, sorted, "No escalation notes yet.");
};


const saveDataset = ({ storageKey, dataset, status }) => {
  localStorage.setItem(storageKey, JSON.stringify(dataset));

  if (status) {
    status.textContent = "Saved locally";
  }
};

const loadWipTemplate = () => {
  const dataset = parseSpreadsheetData(defaultWipRaw);
  window.dashboardDataset = dataset;

  if (dataInput) {
    dataInput.value = defaultWipRaw;
  }

  renderDataPreview(dataset, "Template loaded");
  renderProductionReadiness();
};

const loadAnchorTemplate = () => {
  const dataset = parseSpreadsheetData(defaultAnchorRaw);
  window.dashboardDataAnchor = dataset;

  if (dataAnchorInput) {
    dataAnchorInput.value = defaultAnchorRaw;
  }

  renderAnchorPreview(dataset, "Template loaded");
};

const todaySlash = () => new Date().toLocaleDateString("en-US");

const DELIVERIES_HEADERS = ["PO", "Qty", "Received", "Date Entered"];

const buildDeliveriesDataset = (rows) => ({ headers: DELIVERIES_HEADERS, rows });

const normalizeDeliveryRow = (row, enteredDate) => ({
  PO: getRowValue(row, ["PO", "Incoming PO", "REF_DOC / PO"]),
  Qty: getRowValue(row, ["Qty", "Quantity"]),
  Received: getRowValue(row, ["Received", "Ship Date", "Date"]),
  "Date Entered": getRowValue(row, ["Date Entered"]) || enteredDate,
});

const parseDeliveryPaste = (text, enteredDate) => {
  if (!text || !text.trim()) {
    return [];
  }

  const parsed = parseSpreadsheetData(text);
  const headerTokens = parsed.headers.map((header) => String(header).toLowerCase().trim());
  const hasHeader = headerTokens.includes("po") || headerTokens.includes("ref_doc / po");

  if (hasHeader) {
    return parsed.rows.map((row) => normalizeDeliveryRow(row, enteredDate));
  }

  const lines = text.trim().split(/\r?\n/).filter((line) => line.trim().length > 0);
  const delimiter = text.includes("\t") ? "\t" : ",";
  return lines.map((line) => {
    const cells = parseDelimitedLine(line, delimiter);
    return {
      PO: cells[0] || "",
      Qty: cells[1] || "",
      Received: cells[2] || "",
      "Date Entered": enteredDate,
    };
  });
};

const loadDeliveriesTemplate = () => {
  const parsed = parseSpreadsheetData(defaultDeliveriesRaw);
  const dataset = buildDeliveriesDataset(
    parsed.rows.map((row) => normalizeDeliveryRow(row, todaySlash())),
  );
  window.dashboardDeliveries = dataset;
  renderDeliveriesPreview(dataset, "Template loaded");
};

const loadOutgoingTemplate = () => {
  const dataset = computeOutgoing(parseSpreadsheetData(defaultOutgoingRaw));
  window.dashboardOutgoing = dataset;

  if (outgoingInput) {
    outgoingInput.value = defaultOutgoingRaw;
  }

  renderOutgoingPreview(dataset, "Template loaded");
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
    if (isWipDataset(dataset)) {
      window.dashboardDataset = dataset;
      if (dataInput && dataset.raw) {
        dataInput.value = dataset.raw;
      }
      renderDataPreview(dataset, "Saved locally");
      renderProductionReadiness();
    } else {
      localStorage.removeItem(datasetStorageKey);
      loadWipTemplate();
    }
  } catch {
    localStorage.removeItem(datasetStorageKey);
    loadWipTemplate();
  }
} else {
  loadWipTemplate();
}

if (storedAnchor) {
  try {
    const dataset = JSON.parse(storedAnchor);
    if (isAnchorDataset(dataset)) {
      window.dashboardDataAnchor = dataset;
      if (dataAnchorInput && dataset.raw) {
        dataAnchorInput.value = dataset.raw;
      }
      renderAnchorPreview(dataset, "Saved locally");
    } else {
      localStorage.removeItem(anchorStorageKey);
      loadAnchorTemplate();
    }
  } catch {
    localStorage.removeItem(anchorStorageKey);
    loadAnchorTemplate();
  }
} else {
  loadAnchorTemplate();
}

if (storedDeliveries) {
  try {
    const dataset = JSON.parse(storedDeliveries);
    if (isDeliveriesDataset(dataset)) {
      window.dashboardDeliveries = buildDeliveriesDataset(
        (dataset.rows || []).map((row) => normalizeDeliveryRow(row, todaySlash())),
      );
      renderDeliveriesPreview(window.dashboardDeliveries, "Saved locally");
    } else {
      localStorage.removeItem(deliveriesStorageKey);
      loadDeliveriesTemplate();
    }
  } catch {
    localStorage.removeItem(deliveriesStorageKey);
    loadDeliveriesTemplate();
  }
} else {
  loadDeliveriesTemplate();
}

if (storedOutgoing) {
  try {
    const dataset = JSON.parse(storedOutgoing);
    if (isOutgoingDataset(dataset)) {
      const computed = computeOutgoing(dataset);
      window.dashboardOutgoing = computed;
      if (outgoingInput && dataset.raw) {
        outgoingInput.value = dataset.raw;
      }
      renderOutgoingPreview(computed, "Saved locally");
    } else {
      localStorage.removeItem(outgoingStorageKey);
      loadOutgoingTemplate();
    }
  } catch {
    localStorage.removeItem(outgoingStorageKey);
    loadOutgoingTemplate();
  }
} else {
  loadOutgoingTemplate();
}

parseDataButton?.addEventListener("click", () => {
  const dataset = parseSpreadsheetData(dataInput?.value || "");
  window.dashboardDataset = dataset;
  renderDataPreview(dataset);
  renderProductionReadiness();
});

saveDataButton?.addEventListener("click", () => {
  const dataset = parseSpreadsheetData(dataInput?.value || "");
  window.dashboardDataset = dataset;
  renderDataPreview(dataset);
  renderProductionReadiness();
  saveDataset({ storageKey: datasetStorageKey, dataset, status: dataStorageStatus });
});

clearDataButton?.addEventListener("click", () => {
  if (dataInput) {
    dataInput.value = "";
  }

  localStorage.removeItem(datasetStorageKey);
  window.dashboardDataset = emptyDataset;
  renderDataPreview(emptyDataset);
  renderProductionReadiness();
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

parseDeliveriesButton?.addEventListener("click", () => {
  const added = parseDeliveryPaste(deliveriesInput?.value || "", todaySlash());
  const current = window.dashboardDeliveries?.rows || [];
  const preview = buildDeliveriesDataset([...current, ...added]);
  renderDeliveriesPreview(
    preview,
    added.length
      ? `Preview \u2014 ${added.length} new row${added.length === 1 ? "" : "s"} to add (not saved)`
      : undefined,
  );
});

addDeliveriesButton?.addEventListener("click", () => {
  const added = parseDeliveryPaste(deliveriesInput?.value || "", todaySlash());

  if (!added.length) {
    return;
  }

  const current = window.dashboardDeliveries?.rows || [];
  const dataset = buildDeliveriesDataset([...current, ...added]);
  window.dashboardDeliveries = dataset;
  renderDeliveriesPreview(dataset, `Added ${added.length} row${added.length === 1 ? "" : "s"}`);
  saveDataset({ storageKey: deliveriesStorageKey, dataset, status: deliveriesStorageStatus });

  if (deliveriesInput) {
    deliveriesInput.value = "";
  }
});

clearDeliveriesButton?.addEventListener("click", () => {
  if (deliveriesInput) {
    deliveriesInput.value = "";
  }
});

parseOutgoingButton?.addEventListener("click", () => {
  const dataset = computeOutgoing(parseSpreadsheetData(outgoingInput?.value || ""));
  window.dashboardOutgoing = dataset;
  renderOutgoingPreview(dataset);
});

saveOutgoingButton?.addEventListener("click", () => {
  const dataset = computeOutgoing(parseSpreadsheetData(outgoingInput?.value || ""));
  window.dashboardOutgoing = dataset;
  renderOutgoingPreview(dataset);
  saveDataset({ storageKey: outgoingStorageKey, dataset, status: outgoingStorageStatus });
});

clearOutgoingButton?.addEventListener("click", () => {
  if (outgoingInput) {
    outgoingInput.value = "";
  }

  localStorage.removeItem(outgoingStorageKey);
  window.dashboardOutgoing = emptyDataset;
  renderOutgoingPreview(emptyDataset);
});

escalationAddButton?.addEventListener("click", addEscalationNote);
escalationAddButtonTab?.addEventListener("click", addEscalationNote);
escDatePrev?.addEventListener("click", () => shiftEscalationDate(-1));
escDateNext?.addEventListener("click", () => shiftEscalationDate(1));
escalationSortSelect?.addEventListener("change", () => {
  escalationSort = escalationSortSelect.value;
  renderEscalation();
});
