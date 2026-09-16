"use client";

import { useEffect } from "react";
import { useMenuConfig } from "../utils/menuProvider";

export default function MenuConfigClient({ uris }) {
    const { setMenuConfig } = useMenuConfig();

    useEffect(() => {
        setMenuConfig((prev) => ({
            ...prev,
            uris: uris || null,
        }));
    }, [uris, setMenuConfig]);

    return null;
}