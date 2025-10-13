import { useEffect, useState } from "react";
import type { SearchItem } from "@/lib/omdb";

export type WatchItem = Pick<SearchItem, "imdbID" | "Title" | "Year" | "Type"> & {
  Poster?: string;
};

const STORAGE_KEY = "watchlist:v1";

function read(): WatchItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WatchItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: WatchItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const WatchlistStore = {
  all(): WatchItem[] {
    return read();
  },
  has(id: string): boolean {
    return read().some(w => w.imdbID === id);
  },
  add(item: WatchItem) {
    const items = read();
    if (!items.some(w => w.imdbID === item.imdbID)) {
      items.push(item);
      write(items);
      window.dispatchEvent(new Event("watchlist:changed"));
    }
  },
  remove(id: string) {
    write(read().filter(w => w.imdbID !== id));
    window.dispatchEvent(new Event("watchlist:changed"));
  }
};

export function useWatchlist() {
  const [items, setItems] = useState<WatchItem[]>(() => WatchlistStore.all());

  useEffect(() => {
    const sync = () => setItems(WatchlistStore.all());
    window.addEventListener("storage", sync);
    window.addEventListener("watchlist:changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("watchlist:changed", sync);
    };
  }, []);

  return {
    items,
    has: (id: string) => WatchlistStore.has(id),
    add: (item: WatchItem) => WatchlistStore.add(item),
    remove: (id: string) => WatchlistStore.remove(id),
  };
}