"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps { onClose: () => void; }
interface NoteFormValues { title: string; content: string; tag: NoteTag; }

const initialValues: NoteFormValues = { title: "", content: "", tag: "Todo", };
const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title must be at most 50 characters")
        .required("Title is required"),
    content: Yup.string().max(500, "Content must be at most 500 characters"),
    tag: Yup.string()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
        .required("Tag is required"),
    });

    export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["notes"] });
                onClose();
            },
        });
        
    const handleSubmit = (values: NoteFormValues) => {
        mutation.mutate(values);
    };

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            <Form className={css.form}>
                <label className={css.label}>
                    Title
                    <Field className={css.input} type="text" name="title" />
                    <ErrorMessage name="title" component="span" className={css.error} />
                </label>

                <label className={css.label}>
                    Content
                    <Field className={css.textarea} as="textarea" name="content" />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </label>

                <label className={css.label}>
                    Tag
                    <Field className={css.select} as="select" name="tag">
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </label>

                <div className={css.actions}>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "Creating..." : "Create note"}
                    </button>
                </div>
            </Form>
        </Formik>
        );
}
