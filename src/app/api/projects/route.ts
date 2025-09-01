import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user') || 'mrgentil';
  const limit = Number(searchParams.get('limit') || '6');
  const sort = searchParams.get('sort') || 'stars'; // 'stars' | 'updated'
  const reposCsv = searchParams.get('repos'); // comma-separated repo names

  const token = process.env.GITHUB_TOKEN;

  let items: Array<{ name: string; description: string | null; url: string; stars: number; language: string | null }> = [];

  if (reposCsv) {
    const names = reposCsv
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 12);

    const results = await Promise.all(
      names.map(async (repo) => {
        const url = `https://api.github.com/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo)}`;
        const r = await fetch(url, {
          headers: {
            Accept: 'application/vnd.github+json',
            'User-Agent': 'next-portfolio-app',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: 'no-store',
        });
        if (!r.ok) return null;
        const data = (await r.json()) as Repo;
        return {
          name: data.name,
          description: data.description,
          url: data.html_url,
          stars: data.stargazers_count,
          language: data.language,
        };
      })
    );
    items = results.filter(Boolean) as typeof items;
  } else {
    const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'next-portfolio-app',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // ensure freshness
      cache: 'no-store',
    });

    if (!res.ok) {
      return Response.json(
        { error: 'github_fetch_failed', status: res.status },
        { status: 500 }
      );
    }

    const data = (await res.json()) as Repo[];

    // filter: exclude forks
    let repos = data.filter((r) => !r.fork);

    // sort
    repos = repos.sort((a, b) => {
      if (sort === 'updated') return 0; // already roughly by updated
      return b.stargazers_count - a.stargazers_count;
    });

    // limit
    repos = repos.slice(0, Math.max(1, Math.min(limit, 12)));

    items = repos.map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language,
    }));
  }

  return Response.json({ user, items });
}
