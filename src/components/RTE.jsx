import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';


export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
    {label && (
      <label className='mb-1.5 inline-flex items-center gap-2 pl-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]'>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--ember)]" aria-hidden="true" />
        {label}
      </label>
    )}

    <div className="overflow-hidden rounded-2xl border-2 border-[var(--line)] bg-[var(--surface)] transition-colors focus-within:border-[var(--ember)]">
      <Controller
      name={name || "content"}
      control={control}
      render={({ field: { onChange } }) => (
          <Editor
          initialValue={defaultValue}
          apiKey='bfctlsw4hn64u00t3wiavs9ud8m9092bw5y18jvu9fywvwo3'
          init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              skin: 'oxide',
              content_css: 'default',
              plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
              ],
              toolbar:
              "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:15px; line-height:1.75; color:#2A251D; background:#FFFEFA; padding:18px 20px; } h1,h2,h3 { font-family:Georgia,serif; } img { border-radius:12px; }"
          }}
          onEditorChange={onChange}
          />
      )}
      />
    </div>
    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
      Tip — short paragraphs read best on phones
    </p>

     </div>
  )
}
