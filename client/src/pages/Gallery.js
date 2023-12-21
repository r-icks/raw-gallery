import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { RiImageAddLine } from 'react-icons/ri';
import Alert from '../components/Alert';
import { useAppContext } from '../context/appContext';
import Error from '../components/Error';
import Loading from '../components/Loading';

const GalleryPage = () => {
    const {
        uploadImage,
        images,
        imagesLoading,
        getImages,
        imagesError,
        isLoading,
    } = useAppContext();

    const fileInputRef = useRef(null);

    if (imagesError) {
        return <Error />;
    }

    if (!images) {
        if (!imagesLoading) {
            getImages();
        }
        return <Loading />;
    }

    const handleFileSelect = (event) => {
        if (isLoading) {
            return;
        }

        event.preventDefault();
        const files = event.target.files;

        const firstFile = files[0];
        uploadImage({ file: firstFile });
        fileInputRef.current.value = null;
    };

    const handleDragOver = (event) => {
        if (isLoading) {
            return;
        }

        event.preventDefault();
    };

    const handleDrop = (event) => {
        if (isLoading) {
            return;
        }

        event.preventDefault();

        const files = event.dataTransfer.files;
        const firstFile = files[0];
        uploadImage({ file: firstFile });
    };

    return (
        <div className="pt-[90px] pb-5 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-rows-auto">
      <Alert />

      {images.map((image) => (
        <Link key={image._id} to={`/${image._id}`}>
          <div className="aspect-h-1 aspect-w-1 bg-gray-300 relative group m-4 overflow-hidden transition-transform transform hover:scale-105 rounded-md">
            <img
              src={image.thumbnailUrl}
              alt={`${image._id} issue`}
              className="object-contain w-full h-full"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          </div>
        </Link>
      ))}

      {/* The following div contains the file input for uploading images */}
      <div
        className={`relative group aspect-w-1 aspect-h-1 m-4 ${
          isLoading ? 'pointer-events-none' : ''
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor="fileInput"
          className={`absolute inset-0 flex items-center justify-center bg-gray-400 transition-transform transform hover:scale-105 hover:bg-gray-500 ${
            isLoading ? 'pointer-events-none' : ''
          }`}
          style={{ borderRadius: '0.375rem' }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <RiImageAddLine className="text-white text-4xl" />
          )}
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".ARW, .NEF, .DNG, .CR3, .DCR, .ORF, .PEF"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
      </div>
    </div>
    );
};

export default GalleryPage;