import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    useEffect(() => {
        let ignore = false;

        const loadPreview = async () => {
            if (!post?.featuredImage) {
                setPreviewUrl(null);
                return;
            }

            const url = await appwriteService.getFilePreview(post.featuredImage);
            if (!ignore) setPreviewUrl(url);
        };

        loadPreview();

        return () => {
            ignore = true;
        };
    }, [post]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="w-full py-8">
            <Container>
                {/* breadcrumb */}
                <nav className="rise-1 mb-5 flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]" aria-label="Breadcrumb">
                    <Link to="/" className="transition-colors hover:text-[var(--ember)]">Home</Link>
                    <span aria-hidden="true">/</span>
                    <Link to="/all-posts" className="transition-colors hover:text-[var(--ember)]">Stories</Link>
                    <span aria-hidden="true">/</span>
                    <span className="max-w-[220px] truncate text-[var(--ink)] sm:max-w-md">{post.tittle || post.title}</span>
                </nav>

                <article className="overflow-hidden rounded-[26px] border-2 border-[var(--ink)] bg-[var(--surface)] hard-lg rise-2 dark:border-[var(--line)]">
                    {/* headline block */}
                    <div className="border-b-2 border-[var(--ink)] bg-[var(--bg-soft)]/60 p-7 sm:p-10 dark:border-[var(--line)] dark:bg-white/[0.02]">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--ink)] bg-[var(--mustard)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#17130C] dark:border-[var(--line)]">
                                <span className="h-2 w-2 rounded-full bg-[#17130C]" aria-hidden="true" />
                                Story
                            </span>
                            <span className="inline-flex items-center rounded-full border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                                {post.status || 'published'}
                            </span>
                            {isAuthor && (
                                <span className="inline-flex items-center rounded-full border-2 border-[var(--moss)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--moss)]">
                                    ● your piece
                                </span>
                            )}
                        </div>
                        <h1 className="font-display mt-4 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-[var(--ink)] sm:text-[54px]">
                          {post.tittle || post.title}
                        </h1>
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2.5">
                                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--ink)] bg-[var(--ember)] font-display text-sm font-black text-white dark:border-[var(--line)]" aria-hidden="true">
                                    {(post.tittle || post.title || 'A').charAt(0).toUpperCase()}
                                </span>
                                <span className="leading-tight">
                                    <span className="block text-sm font-bold text-[var(--ink)]">Staff writer</span>
                                    <span className="block text-xs text-[var(--muted)]">MegaBlog editorial desk</span>
                                </span>
                            </span>
                            <span className="hidden h-6 w-px bg-[var(--line)] sm:block" aria-hidden="true" />
                            {isAuthor && (
                                <div className="ml-auto flex items-center gap-2">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-green-500" className="mr-1 !px-5 !py-2 text-[13px]">
                                            ✎ Edit
                                        </Button>
                                    </Link>
                                    <Button bgColor="bg-red-500" onClick={deletePost} className="!px-5 !py-2 text-[13px]">
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* cover */}
                    {previewUrl && (
                        <div className="border-b-2 border-[var(--ink)] bg-[var(--bg)] p-4 sm:p-6 dark:border-[var(--line)]">
                            <figure className="tape overflow-hidden rounded-2xl border-2 border-[var(--ink)] dark:border-[var(--line)]">
                                <img
                                    src={previewUrl}
                                    alt={post.tittle || post.title}
                                    className="max-h-[480px] w-full object-cover"
                                />
                            </figure>
                            <figcaption className="pt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                                — cover image for “{post.tittle || post.title}” —
                            </figcaption>
                        </div>
                    )}

                    {/* body */}
                    <div className="grid gap-0 lg:grid-cols-[64px_1fr]">
                        {/* drop-cap rail */}
                        <div className="hidden justify-center border-r-2 border-dashed border-[var(--line)] py-10 lg:flex" aria-hidden="true">
                            <span className="font-display text-5xl font-black text-[var(--ember)]">
                                {(post.tittle || post.title || 'M').charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="max-w-none px-6 py-8 sm:px-10 sm:py-10">
                            <div className="article-body">
                                {parse(post.content)}
                            </div>

                            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--bg-soft)]/50 px-5 py-4 dark:bg-white/[0.02]">
                                <p className="font-display text-[17px] italic text-[var(--ink)]">
                                    Enjoyed this? Pass it on to a friend who’d love it.
                                </p>
                                <div className="flex gap-2">
                                    <Link
                                        to="/all-posts"
                                        className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] px-4 py-2 text-sm font-bold text-[var(--ink)] hard-sm lift dark:border-[var(--line)]"
                                    >
                                        ← All stories
                                    </Link>
                                    {isAuthor && (
                                        <Link
                                            to={`/edit-post/${post.$id}`}
                                            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-4 py-2 text-sm font-bold text-[var(--bg)] hard-sm lift dark:border-[var(--line)]"
                                        >
                                            Keep editing →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </Container>
        </div>
    ) : null;
}
