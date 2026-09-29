export default async function handler(req, res) {
  const primary = process.env.API_PRIMARY;
  const fallback = process.env.API_FALLBACK;

  try {
    const response = await fetch(primary);

    if (!response.ok) {
      throw new Error("Primary API failed");
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    try {
      const response = await fetch(fallback);

      if (!response.ok) {
        throw new Error("Fallback API failed");
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch {
      return res.status(502).json({
        error: "Both API sources failed"
      });
    }
  }
}
