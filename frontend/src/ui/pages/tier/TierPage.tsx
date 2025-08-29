import React from 'react';
import { useParams } from 'react-router-dom';

const TierPage = () => {
    const { tierId } = useParams<{ tierId: string }>();

    return (
        <div>
            Tier Page {tierId}
        </div>
    );
}

export default TierPage;