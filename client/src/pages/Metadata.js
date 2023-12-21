import React, { useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { useParams } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';

const MetaData = () => {
    const { getImageData, imagesError, image } = useAppContext();
    const { id } = useParams();

    useEffect(() => {
        getImageData(id);
    }, []);

    const handleDownload = () => {
        const { downloadUrl, filename } = image;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename || 'downloaded_image';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (imagesError) return <Error />;
    if (!image) {
        return <Loading />;
    }

    return (
        <div className="flex h-[100vh] p-[100px]">
            <div className="flex items-center w-4/5 bg-gray-300 rounded-l-lg text-center">
                <img
                    className="w-70 h-auto mx-auto"
                    src={image.thumbnailUrl}
                    alt="this is it"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
            </div>
            <div className="w-2/5 p-8 bg-black flex flex-col rounded-r-lg">
                <h2 className="text-2xl font-bold mb-4 text-white">{image.filename}</h2>
                <div className="flex-1 overflow-y-auto mb-4">
                    {image.metadata.map(({ key, value, _id }) => (
                        <div key={_id} className="mb-2 text-white">
                            <span className="text-gray-300">{key}</span> :
                            <span className="text-gray-400">{value}</span>
                        </div>
                    ))}
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center" onClick={handleDownload}>
                    <FaDownload className="mr-2" />
                    Download
                </button>
            </div>
        </div>
    );
};

export default MetaData;