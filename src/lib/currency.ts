const CBR_DAILY_JSON_URL = "https://www.cbr-xml-daily.ru/daily_json.js";

export const FALLBACK_USD_RUB_RATE = 80;

interface CbrDailyResponse {
  Valute?: {
    USD?: {
      Value?: number;
    };
  };
}

export async function getUsdRubRate(): Promise<number> {
  try {
    const res = await fetch(CBR_DAILY_JSON_URL);
    if (!res.ok) throw new Error(`CBR request failed with ${res.status}`);

    const data = (await res.json()) as CbrDailyResponse;
    const rate = data.Valute?.USD?.Value;
    if (!rate || Number.isNaN(rate)) throw new Error("Malformed CBR payload");

    return rate;
  } catch (err) {
    console.error("Failed to fetch USD/RUB rate, using fallback:", err);
    return FALLBACK_USD_RUB_RATE;
  }
}
