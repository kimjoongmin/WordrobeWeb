/**
 * Parses a CSV string into an array of objects.
 * Assumes the first row contains headers.
 * Handles quoted fields containing commas.
 */
export const parseCSV = (csvText: string) => {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values: string[] = [];
    let currentValue = "";
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = "";
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    if (values.length === headers.length) {
      const entry: Record<string, string> = {};
      headers.forEach((header, index) => {
        // Map common headers to our expected keys
        const key = header;
        // Strip out any surrounding quotes from the header/value if present
        const cleanValue = values[index].replace(/^"|"$/g, "").trim();

        entry[key] = cleanValue;
      });
      data.push(entry);
    }
  }

  return data;
};
