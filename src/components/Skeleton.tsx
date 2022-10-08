import React, {FC} from 'react';
import ContentLoader from "react-content-loader";

export const Skeleton: FC = () => {
    return (
        <ContentLoader
            speed={2}
            width={300}
            height={500}
            viewBox="0 0 300 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            className='skeleton'
        >
            <rect x="0" y="0" rx="0" ry="0" width="300" height="330" />
            <rect x="20" y="460" rx="0" ry="0" width="120" height="30" />
            <circle cx="249" cy="460" r="15" />
            <rect x="0" y="375" rx="0" ry="0" width="300" height="30" />
            <rect x="0" y="410" rx="0" ry="0" width="300" height="20" />
        </ContentLoader>
    );
};
