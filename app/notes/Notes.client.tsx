"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";

export default function NotesClient() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");    
    const { data, isLoading, error } = useQuery({
        queryKey: ["notes", page, search],
        queryFn: () => fetchNotes({ page, search }),
        placeholderData: (previousData) => previousData,
    });
    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 0;
    // 
    const handleSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 500);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <SearchBox onSearch={handleSearch} />
            <button type="button" onClick={() => setIsModalOpen(true)}>
                Create note +
            </button>
            {totalPages > 1 && (
                <Pagination
                pageCount={totalPages}
                currentPage={page}
                onPageChange={setPage}
                />
            )}
            {isLoading && <p>Loading, please wait...</p>}
            {error && <p>Something went wrong.</p>}
            <h1>Notes</h1>
            <NoteList notes={data?.notes ?? []} />
            {isModalOpen && (
                <NoteModal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </NoteModal>
            )}
        </>
    );
}
