import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

const DOTS = ['bg-[var(--ember)]', 'bg-[var(--moss)]', 'bg-[var(--mustard)]']

function PostCard({ $id, tittle, title, featuredImage, post }) {
    // Accept both call shapes: <PostCard {...post} /> and <PostCard post={post} />
    // (AllPosts passes `post={post}`; Home spreads props. Support both without touching callers.)
    const data = post || { $id, tittle, title, featuredImage }
    const displayTitle = data.tittle || data.title || 'Untitled story';
    const id = data.$id || $id;
    const imageId = data.featuredImage || featuredImage;
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        let ignore = false;

        const loadPreview = async () => {
            const url = await appwriteService.getFilePreview(imageId);
            if (!ignore) setPreviewUrl(url);
        };

        if (imageId) {
            loadPreview();
        }

        return () => {
            ignore = true;
        };
    }, [imageId]);

    const dot = DOTS[(String(id || displayTitle).length) % DOTS.length]
    const initial = (displayTitle || 'M').trim().charAt(0).toUpperCase()

  return (
    <Link to={`/post/${id}`} className="group block h-full focus:outline-none">
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[var(--ink)] bg-[var(--surface)] transition-all duration-200 hard-sm lift dark:border-[var(--line)]">
            <div className="relative overflow-hidden border-b-2 border-[var(--ink)] dark:border-[var(--line)]">
                {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={displayTitle}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="paper-dots flex aspect-[16/10] w-full items-center justify-center bg-[var(--bg-soft)]">
                      <span className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--mustard)] font-display text-3xl font-black text-[#17130C] dark:border-[var(--line)]">
                        {initial}
                      </span>
                    </div>
                )}
                <span className="absolute left-3 top-3 inline-flex rotate-[-2deg] items-center gap-1.5 rounded-full border-2 border-[var(--ink)] bg-[var(--bg)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink)] dark:border-black dark:bg-[#F6F0E4] dark:text-[#17130C]">
                  <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
                  Story
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
                <h2 className="font-display text-[19px] font-bold leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--ember)]">
                  {displayTitle}
                </h2>
                <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-[var(--line)] pt-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                      Read story
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] transition-all duration-200 group-hover:bg-[var(--ember)] group-hover:text-white dark:border-[var(--line)]" aria-hidden="true">
                      →
                    </span>
                </div>
            </div>
        </article>
    </Link>
  )
}


export default PostCard
