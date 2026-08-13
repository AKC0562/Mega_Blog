import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, tittle, title, featuredImage}) {
    const displayTitle = tittle || title;
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        let ignore = false;

        const loadPreview = async () => {
            const url = await appwriteService.getFilePreview(featuredImage);
            if (!ignore) setPreviewUrl(url);
        };

        if (featuredImage) {
            loadPreview();
        }

        return () => {
            ignore = true;
        };
    }, [featuredImage]);
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {previewUrl && (
                    <img src={previewUrl} alt={displayTitle}
                    className='rounded-xl' />
                )}

            </div>
            <h2
            className='text-xl font-bold'
            >{displayTitle}</h2>
        </div>
    </Link>
  )
}


export default PostCard