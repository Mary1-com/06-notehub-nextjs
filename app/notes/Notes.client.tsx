"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";

export default function NotesClient() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");    
    
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ["notes", page, search],
    //     queryFn: () => fetchNotes({ page, search }),
    // });
    const { data, isLoading, error } = useQuery({
        queryKey: ["notes", page, search],
        queryFn: () => fetchNotes({ page, search }),
        placeholderData: (previousData) => previousData,
    });
        
    // if (isLoading) { return <p>Loading...</p>; }
    // if (error) { return <p>Something went wrong.</p>; }
    return (
        <>
            <SearchBox onSearch={setSearch} /> 
            {isLoading && <p>Loading, please wait...</p>}
            {error && <p>Something went wrong.</p>}
            <h1>Notes</h1>
            <NoteList notes={data?.notes ?? []} />

        {/* Pagination */}
        {/* NoteList */}
        </>
    );
}
