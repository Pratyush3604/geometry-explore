import { useState, useEffect, useCallback } from "react";

interface ProgressData {
  learned: Set<string>;
  favorites: Set<string>;
}

const STORAGE_KEY = "geomaster-progress";

function loadProgress(): ProgressData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        learned: new Set(parsed.learned || []),
        favorites: new Set(parsed.favorites || []),
      };
    }
  } catch (e) {
    console.error("Failed to load progress:", e);
  }
  return { learned: new Set(), favorites: new Set() };
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        learned: Array.from(data.learned),
        favorites: Array.from(data.favorites),
      })
    );
  } catch (e) {
    console.error("Failed to save progress:", e);
  }
}

export function useGeometryProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const toggleLearned = useCallback((id: string) => {
    setProgress((prev) => {
      const newLearned = new Set(prev.learned);
      if (newLearned.has(id)) {
        newLearned.delete(id);
      } else {
        newLearned.add(id);
      }
      return { ...prev, learned: newLearned };
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setProgress((prev) => {
      const newFavorites = new Set(prev.favorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return { ...prev, favorites: newFavorites };
    });
  }, []);

  const isLearned = useCallback(
    (id: string) => progress.learned.has(id),
    [progress.learned]
  );

  const isFavorite = useCallback(
    (id: string) => progress.favorites.has(id),
    [progress.favorites]
  );

  const learnedCount = progress.learned.size;
  const favoritesCount = progress.favorites.size;

  return {
    toggleLearned,
    toggleFavorite,
    isLearned,
    isFavorite,
    learnedCount,
    favoritesCount,
    learnedItems: Array.from(progress.learned),
    favoriteItems: Array.from(progress.favorites),
  };
}
