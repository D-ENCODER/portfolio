#!/usr/bin/env python3
"""
Syncs Het's live Tonkatsu Box collection (Docker container `tonkatsu_box-tonkatsu-1` on 127.0.0.1:8080)
into `src/data/tonkatsuData.json` for the portfolio website.
"""
import json
import os
import sqlite3
import subprocess
import tempfile
from collections import Counter
from datetime import datetime, timezone

CONTAINER_NAME = "tonkatsu_box-tonkatsu-1"
CONTAINER_DB_PATH = "/data/tonkatsu_box.db"
OUTPUT_JSON = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "src",
    "data",
    "tonkatsuData.json",
)


def parse_genres(raw_genres, genre_map):
    if not raw_genres:
        return []
    try:
        parsed = json.loads(raw_genres)
        if isinstance(parsed, list):
            return [genre_map.get(str(g), str(g)).title() for g in parsed]
    except Exception:
        pass
    if "|" in str(raw_genres):
        return [g.strip() for g in str(raw_genres).split("|") if g.strip()]
    return [str(raw_genres)]


def main():
    with tempfile.TemporaryDirectory() as tmpdir:
        db_file = os.path.join(tmpdir, "tonkatsu_box.db")
        subprocess.run(
            ["docker", "cp", f"{CONTAINER_NAME}:{CONTAINER_DB_PATH}", db_file],
            check=True,
        )

        conn = sqlite3.connect(db_file)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        # Genre map
        genre_map = {
            str(r["id"]): r["name"]
            for r in cur.execute("SELECT * FROM tmdb_genres").fetchall()
        }

        # Tier definitions & entry mapping
        tier_defs = cur.execute(
            "SELECT * FROM tier_definitions ORDER BY sort_order"
        ).fetchall()
        tier_key_to_label = {r["tier_key"]: r["label"] for r in tier_defs}
        tier_order_map = {r["label"]: r["sort_order"] for r in tier_defs}

        item_tier_map = {}
        for r in cur.execute(
            "SELECT * FROM tier_list_entries ORDER BY sort_order"
        ).fetchall():
            label = tier_key_to_label.get(r["tier_key"], r["tier_key"])
            item_tier_map[r["collection_item_id"]] = {
                "tier": label,
                "tierSortOrder": tier_order_map.get(label, 99),
                "entryOrder": r["sort_order"],
            }

        # Watched episodes count per show
        watched_by_show = {}
        for r in cur.execute(
            "SELECT show_id, COUNT(*) as cnt FROM watched_episodes GROUP BY show_id"
        ).fetchall():
            watched_by_show[r["show_id"]] = r["cnt"]

        total_watched_episodes = cur.execute(
            "SELECT COUNT(*) FROM watched_episodes"
        ).fetchone()[0]

        # Runtime calculation
        ep_mins = (
            cur.execute(
                """
            SELECT SUM(COALESCE(e.runtime, 42))
            FROM watched_episodes w
            LEFT JOIN tv_episodes_cache e
              ON w.show_id = e.tmdb_show_id
             AND w.season_number = e.season_number
             AND w.episode_number = e.episode_number
        """
            ).fetchone()[0]
            or 0
        )

        movie_mins = 0
        genre_counter = Counter()
        all_items = []

        rows = cur.execute(
            "SELECT * FROM collection_items ORDER BY is_favorite DESC, COALESCE(user_rating, 0) DESC, added_at DESC"
        ).fetchall()

        for r in rows:
            cid = r["id"]
            mt = r["media_type"]
            eid = r["external_id"]
            status = r["status"]
            user_rating = r["user_rating"]
            is_fav = bool(r["is_favorite"])
            tier_info = item_tier_map.get(cid)

            item_data = None

            if mt == "movie":
                m = cur.execute(
                    "SELECT * FROM movies_cache WHERE tmdb_id=?", (eid,)
                ).fetchone()
                if m:
                    if status == "completed" and m["runtime"]:
                        movie_mins += m["runtime"]
                    genres = parse_genres(m["genres"], genre_map)
                    if status == "completed":
                        for g in genres:
                            genre_counter[g] += 1
                    item_data = {
                        "id": cid,
                        "externalId": eid,
                        "title": m["title"],
                        "category": "Movie",
                        "subType": "Feature Film",
                        "year": m["release_year"],
                        "genres": genres[:3],
                        "runtime": f"{m['runtime']}m" if m["runtime"] else None,
                        "posterUrl": m["poster_url"],
                        "externalUrl": m["external_url"],
                        "tmdbRating": round(m["rating"], 1) if m["rating"] else None,
                    }

            elif mt == "tv_show":
                tv = cur.execute(
                    "SELECT * FROM tv_shows_cache WHERE tmdb_id=?", (eid,)
                ).fetchone()
                if tv:
                    genres = parse_genres(tv["genres"], genre_map)
                    if status == "completed":
                        for g in genres:
                            genre_counter[g] += 1
                    watched_eps = watched_by_show.get(eid, 0)
                    total_eps = tv["total_episodes"] or 0
                    item_data = {
                        "id": cid,
                        "externalId": eid,
                        "title": tv["title"],
                        "category": "TV Series",
                        "subType": f"{tv['total_seasons'] or 1} Seasons",
                        "year": tv["first_air_year"],
                        "genres": genres[:3],
                        "episodesWatched": watched_eps,
                        "totalEpisodes": total_eps,
                        "posterUrl": tv["poster_url"],
                        "externalUrl": tv["external_url"],
                        "tmdbRating": round(tv["rating"], 1) if tv["rating"] else None,
                    }

            elif mt == "animation":
                tv = cur.execute(
                    "SELECT * FROM tv_shows_cache WHERE tmdb_id=?", (eid,)
                ).fetchone()
                if tv:
                    genres = parse_genres(tv["genres"], genre_map)
                    if status == "completed":
                        for g in genres:
                            genre_counter[g] += 1
                    watched_eps = watched_by_show.get(eid, 0)
                    total_eps = tv["total_episodes"] or 0
                    item_data = {
                        "id": cid,
                        "externalId": eid,
                        "title": tv["title"],
                        "category": "Anime & Animation",
                        "subType": f"Animated Series • {tv['total_seasons'] or 1}S",
                        "year": tv["first_air_year"],
                        "genres": genres[:3],
                        "episodesWatched": watched_eps,
                        "totalEpisodes": total_eps,
                        "posterUrl": tv["poster_url"],
                        "externalUrl": tv["external_url"],
                        "tmdbRating": round(tv["rating"], 1) if tv["rating"] else None,
                    }
                else:
                    m = cur.execute(
                        "SELECT * FROM movies_cache WHERE tmdb_id=?", (eid,)
                    ).fetchone()
                    if m:
                        if status == "completed" and m["runtime"]:
                            movie_mins += m["runtime"]
                        genres = parse_genres(m["genres"], genre_map)
                        if status == "completed":
                            for g in genres:
                                genre_counter[g] += 1
                        item_data = {
                            "id": cid,
                            "externalId": eid,
                            "title": m["title"],
                            "category": "Anime & Animation",
                            "subType": "Animated Film",
                            "year": m["release_year"],
                            "genres": genres[:3],
                            "runtime": f"{m['runtime']}m" if m["runtime"] else None,
                            "posterUrl": m["poster_url"],
                            "externalUrl": m["external_url"],
                            "tmdbRating": round(m["rating"], 1) if m["rating"] else None,
                        }

            elif mt == "game":
                g = cur.execute(
                    "SELECT * FROM games WHERE id=?", (eid,)
                ).fetchone()
                if g:
                    genres = parse_genres(g["genres"], genre_map)
                    rel_year = (
                        datetime.fromtimestamp(g["release_date"], timezone.utc).year
                        if g["release_date"]
                        else None
                    )
                    item_data = {
                        "id": cid,
                        "externalId": eid,
                        "title": g["name"],
                        "category": "Games",
                        "subType": "PC / Console",
                        "year": rel_year,
                        "genres": genres[:3],
                        "posterUrl": g["cover_url"],
                        "externalUrl": g["external_url"],
                        "tmdbRating": round(g["rating"] / 10, 1)
                        if g["rating"]
                        else None,
                    }

            elif mt == "manga":
                mg = cur.execute(
                    "SELECT * FROM manga_cache WHERE id=?", (eid,)
                ).fetchone()
                if mg:
                    genres = parse_genres(mg["genres"], genre_map)
                    item_data = {
                        "id": cid,
                        "externalId": eid,
                        "title": mg["title"],
                        "category": "Manga",
                        "subType": f"{mg['volumes'] or 37} Volumes • {mg['chapters'] or 327} Chapters",
                        "year": mg["start_year"],
                        "genres": genres[:3],
                        "posterUrl": mg["cover_url"],
                        "externalUrl": mg["external_url"],
                        "tmdbRating": round(mg["average_score"] / 10, 1)
                        if mg["average_score"]
                        else None,
                    }

            if item_data:
                item_data["status"] = status
                item_data["userRating"] = user_rating
                item_data["isFavorite"] = is_fav
                all_items.append(item_data)

        movie_hours = round(movie_mins / 60)
        episode_hours = round(ep_mins / 60)
        total_hours = movie_hours + episode_hours

        completed_movies = sum(
            1
            for x in all_items
            if x["category"] == "Movie" and x["status"] == "completed"
        )
        planned_movies = sum(
            1
            for x in all_items
            if x["category"] == "Movie" and x["status"] == "planned"
        )
        completed_anime = sum(
            1
            for x in all_items
            if x["category"] == "Anime & Animation" and x["status"] == "completed"
        )
        completed_tv = sum(
            1
            for x in all_items
            if x["category"] == "TV Series" and x["status"] == "completed"
        )
        total_games = sum(1 for x in all_items if x["category"] == "Games")

        top_genres = []
        max_genre_val = genre_counter.most_common(1)[0][1] if genre_counter else 1
        for name, cnt in genre_counter.most_common(8):
            top_genres.append(
                {
                    "genre": name,
                    "count": f"{cnt} titles",
                    "share": min(100, round((cnt / max_genre_val) * 96)),
                }
            )

        # Currently watching (in_progress TV/Anime with episodesWatched > 0 first)
        in_progress_media = [
            x
            for x in all_items
            if x["status"] == "in_progress"
            and x["category"] in ("TV Series", "Anime & Animation")
        ]
        in_progress_media.sort(
            key=lambda x: (x.get("episodesWatched") or 0), reverse=True
        )

        top_rated = [
            x
            for x in all_items
            if x.get("isFavorite")
            or (x.get("userRating") is not None and x.get("userRating") >= 8.5)
        ]

        output = {
            "syncedFrom": "Tonkatsu Box (127.0.0.1:8080 • trakt-export-dencoder)",
            "totalItems": len(all_items),
            "stats": {
                "completedMovies": completed_movies,
                "plannedMovies": planned_movies,
                "completedAnime": completed_anime,
                "completedTvSeries": completed_tv,
                "totalCompletedShowsAndAnime": completed_anime + completed_tv,
                "watchedEpisodes": total_watched_episodes,
                "movieHours": movie_hours,
                "episodeHours": episode_hours,
                "totalScreenHours": total_hours,
                "gamesTracked": total_games,
            },
            "topGenres": top_genres,
            "currentlyWatching": in_progress_media,
            "topRated": top_rated,
        }

        with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
            json.dump(output, f, indent=2, ensure_ascii=False)

        print(
            f"Synced {len(all_items)} items ({completed_movies} movies, {completed_anime} anime/animation, {completed_tv} TV series, {total_watched_episodes} episodes, {total_hours}h total) -> {OUTPUT_JSON}"
        )


if __name__ == "__main__":
    main()

