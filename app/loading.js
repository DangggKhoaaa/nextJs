import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
    return (
        <div className="grid">
            <div className='grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                    <Skeleton count={1} duration={3} height={95} width={320} />
                </SkeletonTheme>
                <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                    <Skeleton count={1} duration={3} height={25} width={200} className='my-5' />
                </SkeletonTheme>
                <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                    <Skeleton count={5} duration={3} height={15} width={320} className='' />
                </SkeletonTheme>
                <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
                    <Skeleton count={1} duration={3} height={15} width={200} className='mt-10 ml-28' />
                </SkeletonTheme>
            </div>
        </div>
    );
};

export default Loading;