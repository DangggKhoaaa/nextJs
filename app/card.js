import Image from "next/image";
import Link from "next/link";


export default function Card({ id, title, author, description, imageUrl }) {
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    return (
        <Link href={`/${id}`}>
            <div className="max-w-xs rounded overflow-hidden shadow-lg h-full">
                <Image
                    src={imageUrl}
                    alt="Image"
                    width={320}
                    height={95}
                    priority
                    onError={(e) => {
                        e.target.srcset = `https://via.placeholder.com/320x93?text=Error`;
                    }}
                    onEmptied={(e) => {
                        e.target.srcset = `https://via.placeholder.com/320x93?text=Empty`;
                    }}
                    className="object-cover rounded-md"
                />
                <div className="px-6 py-4 h-40">
                    <div className="font-bold text-xl mb-2" title={title}>
                        {truncateText(title, 20)}
                    </div>
                    <p className="text-gray-700 text-base h-16" title={description}>
                        {truncateText(description, 150)}
                    </p>
                </div>
                <div className="px-6 py-4">
                    <p className="text-gray-600 text-sm text-right">Author: {author}</p>
                </div>
            </div>
        </Link>
    );
};