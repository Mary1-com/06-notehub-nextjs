"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotesPage.module.css";

export default function NotesClient() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");    
    
    const { data, isLoading, error } = useQuery({
        queryKey: ["notes"],
        queryFn: () =>
            fetchNotes({
            page: 1,
            search: "",
            }),
    });



    
    if (isLoading) { return <p>Loading...</p>; }
    if (error) { return <p>Something went wrong.</p>; }
    return (
        <>
        <h1>Notes</h1>
        <p>Found notes: {data?.notes.length}</p>
        {/* SearchBox */}
        {/* Pagination */}
        {/* NoteList */}
        </>
    );
}
