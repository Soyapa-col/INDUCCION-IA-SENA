/**
 * Google Sheets and Google Drive API integration for SENA apprentice induction registry.
 */

export interface ApprenticeRecord {
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  recordNumber: string;
  trainingProgram: string;
  trainingCenter: string;
  regional: string;
  inductionStatus: string;
  score: string;
  registeredBy: string;
}

export interface SpreadsheetInfo {
  id: string;
  title: string;
  url: string;
}

const DEFAULT_SHEET_TITLE = 'Registro de Inducción SENA - Aprendices';
const DEFAULT_TAB_NAME = 'Aprendices Inducción';

/**
 * Creates a formatted Google Spreadsheet in the user's Google Drive.
 */
export const createInductionSpreadsheet = async (
  accessToken: string,
  title = DEFAULT_SHEET_TITLE
): Promise<SpreadsheetInfo> => {
  const payload = {
    properties: {
      title
    },
    sheets: [
      {
        properties: {
          title: DEFAULT_TAB_NAME,
          gridProperties: {
            frozenRowCount: 1
          }
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'Fecha y Hora' } },
                  { userEnteredValue: { stringValue: 'Nombre Completo' } },
                  { userEnteredValue: { stringValue: 'Tipo Doc' } },
                  { userEnteredValue: { stringValue: 'Número Documento' } },
                  { userEnteredValue: { stringValue: 'Ficha (Grupo)' } },
                  { userEnteredValue: { stringValue: 'Programa de Formación' } },
                  { userEnteredValue: { stringValue: 'Centro de Formación' } },
                  { userEnteredValue: { stringValue: 'Regional' } },
                  { userEnteredValue: { stringValue: 'Estado Inducción' } },
                  { userEnteredValue: { stringValue: 'Evaluación' } },
                  { userEnteredValue: { stringValue: 'Registrado Por' } }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Error al crear la hoja de cálculo en Google Drive');
  }

  const data = await response.json();
  return {
    id: data.spreadsheetId,
    title: data.properties?.title || title,
    url: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`
  };
};

/**
 * Searches for existing spreadsheets in Google Drive created or shared with this app.
 */
export const listExistingDriveSheets = async (
  accessToken: string
): Promise<SpreadsheetInfo[]> => {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)&pageSize=20`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Error al buscar archivos en Google Drive');
  }

  const data = await response.json();
  const files = data.files || [];
  return files.map((file: any) => ({
    id: file.id,
    title: file.name,
    url: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`
  }));
};

/**
 * Reads apprentice records from an existing spreadsheet.
 */
export const getApprenticeRecords = async (
  accessToken: string,
  spreadsheetId: string
): Promise<ApprenticeRecord[]> => {
  // Try with specific tab first, then generic fallback
  const tabName = encodeURIComponent(DEFAULT_TAB_NAME);
  let response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${tabName}!A2:K`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {
    // Fallback to first sheet range A2:K
    response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:K`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Error al leer los datos de la hoja de cálculo');
  }

  const data = await response.json();
  const rows = data.values || [];

  return rows.map((row: string[]) => ({
    timestamp: row[0] || '',
    fullName: row[1] || '',
    documentType: row[2] || '',
    documentNumber: row[3] || '',
    recordNumber: row[4] || '',
    trainingProgram: row[5] || '',
    trainingCenter: row[6] || '',
    regional: row[7] || '',
    inductionStatus: row[8] || '',
    score: row[9] || '',
    registeredBy: row[10] || ''
  }));
};

/**
 * Appends a new apprentice record row to the Google Spreadsheet.
 */
export const appendApprenticeRecord = async (
  accessToken: string,
  spreadsheetId: string,
  record: ApprenticeRecord
): Promise<void> => {
  const tabName = encodeURIComponent(DEFAULT_TAB_NAME);
  const rowValues = [
    record.timestamp,
    record.fullName,
    record.documentType,
    record.documentNumber,
    record.recordNumber,
    record.trainingProgram,
    record.trainingCenter,
    record.regional,
    record.inductionStatus,
    record.score,
    record.registeredBy
  ];

  let response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${tabName}!A:K:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [rowValues]
      })
    }
  );

  // If the sheet doesn't have the named tab, append to default A:K
  if (!response.ok) {
    response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:K:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [rowValues]
        })
      }
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Error al agregar el registro en Google Sheets');
  }
};
