import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.tittle || post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

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

    const submit = async (data) => {
        try {
            if (!userData) {
                console.error("User not logged in");
                return;
            }

            if (post) {
                const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file && post.featuredImage) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    tittle: data.title,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                const fileId = file ? file.$id : null;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, tittle: data.title, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6 lg:flex-nowrap">
            <div className="w-full rounded-[22px] border-2 border-[var(--ink)] bg-[var(--surface)] p-5 hard-md sm:p-7 lg:w-2/3 dark:border-[var(--line)]">
                <div className="mb-5 flex items-center gap-3 border-b-2 border-dashed border-[var(--line)] pb-4">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border-2 border-[var(--ink)] bg-[var(--mustard)] font-display text-lg font-black text-[#17130C] dark:border-[var(--line)]" aria-hidden="true">
                        ✎
                    </span>
                    <div>
                        <h2 className="font-display text-xl font-black text-[var(--ink)]">
                            {post ? 'Polish your story' : 'Tell a new story'}
                        </h2>
                        <p className="text-[13px] text-[var(--muted)]">Give it a title that makes people curious.</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <Input
                        label="Title :"
                        placeholder="e.g. What I learned fixing bikes in Lisbon"
                        className="mb-1"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="what-i-learned-fixing-bikes"
                        className="mb-1 font-mono !text-[13px]"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>
            <div className="w-full lg:w-1/3">
                <div className="lg:sticky lg:top-32 space-y-4">
                    <div className="rounded-[22px] border-2 border-[var(--ink)] bg-[var(--bg-soft)]/60 p-5 hard-md dark:border-[var(--line)] dark:bg-white/[0.02]">
                        <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                            Cover &amp; shelf
                        </h3>
                        <div className="mt-4 space-y-4">
                            <Input
                                label="Featured Image :"
                                type="file"
                                className="mb-1"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: !post })}
                            />
                            {post && post.featuredImage && previewUrl && (
                                <div className="w-full overflow-hidden rounded-2xl border-2 border-[var(--ink)] dark:border-[var(--line)]">
                                    <img
                                        src={previewUrl}
                                        alt={post.tittle || post.title}
                                        className="aspect-[16/10] w-full object-cover"
                                    />
                                </div>
                            )}
                            {!previewUrl && (
                                <div className="rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--surface)] p-4 text-center">
                                    <p className="text-[13px] font-semibold text-[var(--ink)]">A good cover doubles your readers</p>
                                    <p className="mt-1 text-xs text-[var(--muted)]">PNG or JPG, landscape works best.</p>
                                </div>
                            )}
                            <Select
                                options={["active", "inactive"]}
                                label="Status"
                                className="mb-1"
                                {...register("status", { required: true })}
                            />
                            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full !py-3 text-[15px]">
                                {post ? "↻ Update story" : "Publish story →"}
                            </Button>
                            <p className="text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--muted)]">
                                {post ? 'Edits go live instantly' : 'You can edit anytime later'}
                            </p>
                        </div>
                    </div>
                    <div className="rotate-[1deg] rounded-2xl border-2 border-[var(--ink)] bg-[var(--mustard)] p-4 hard-sm dark:border-[var(--line)]">
                        <p className="font-display text-[15px] font-bold leading-snug text-[#17130C]">
                            Writer's checklist
                        </p>
                        <ul className="mt-2 space-y-1 text-[13px] font-semibold text-[#17130C]/80">
                            <li>☐ Title under 12 words</li>
                            <li>☐ One clear idea per post</li>
                            <li>☐ End with something useful</li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    );
}
