export default async function handler(req, res) {
  try {
    const response = await fetch(process.env.API_PRIMARY);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Primary API failed"
      });
    }

    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=30");
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Primary API error",
      message: error.message
    });
  }
}
