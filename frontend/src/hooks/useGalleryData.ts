import { useEffect, useState } from "react";
import { getPaintings } from "../api/paintingApi";
import { getCategories } from "../api/categoryApi";

type Painting = {
    _id?: string;
    title: string;
    artist: string;
    imageUrls?: string[];
};

type Category = {
    _id: string;
    name: string;
    slug: string;
};

export function useGalleryData(activeFilter: string, search: string) {
    const [paintings, setPaintings] = useState<Painting[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // categories only once
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch {
                console.error("Failed to load categories");
            }
        };

        loadCategories();
    }, []);

    // paintings
    useEffect(() => {
        let alive = true;

        const loadPaintings = async () => {
            try {
                setError("");

                const category =
                    activeFilter === "all" ? undefined : activeFilter;

                const data = await getPaintings(category, search);

                if (!alive) return;

                setPaintings(data);
            } catch {
                setError("Failed to load paintings");
            } finally {
                if (alive) setLoading(false);
            }
        };

        loadPaintings();

        return () => {
            alive = false;
        };
    }, [activeFilter, search]);

    return {
        paintings,
        categories,
        loading,
        error,
    };
}