export default async function handler(req, res) {
  // 1. Get the query params from the React URL
  const { country, category, page, pageSize } = req.query;
  
  // 2. Get the Private Key from Vercel Env (NOT REACT_APP_)
  const apiKey = process.env.NEWS_API_KEY; 

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
