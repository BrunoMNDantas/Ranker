import React from 'react';
import { useParams } from 'react-router-dom';

const VotePage = () => {
    const { voteId } = useParams<{ voteId: string }>();

    return (
        <div>
            Vote Page {voteId}
        </div>
    );
}

export default VotePage;