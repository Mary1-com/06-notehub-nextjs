"use client";

import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {    onClose: () => void;    }


export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onClose();
        },
    });
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        mutation.mutate({
            title: String(formData.get("title")),
            content: String(formData.get("content")),
            tag: formData.get("tag") as NoteTag,
        });
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
            Title
            <input className={css.input} type="text" name="title" required />
        </label>

        <label className={css.label}>
            Content
            <textarea className={css.textarea} name="content" required />
        </label>

        <label className={css.label}>
            Tag
            <select className={css.select} name="tag" defaultValue="Todo">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
            </select>
        </label>

        <div className={css.actions}>
            <button type="button" onClick={onClose}>
            Cancel
            </button>
            <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create note"}
            </button>
            </div>
        </form>
    );
};