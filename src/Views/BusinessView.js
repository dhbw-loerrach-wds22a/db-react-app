import React, { useState } from 'react';
import BusinessTable from "../Components/BusinessTable";
import ReviewsTable from "./ReviewsTable"; // Make sure to import ReviewsTable

function BusinessView() {
    const [showReviews, setShowReviews] = useState(false);
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);

    const handleShowReviews = (businessId) => {
        console.log(businessId)
        setShowReviews(true);
        setSelectedBusinessId(businessId); // Save the business ID for fetching reviews
    };

    return (
        <div>
            {!showReviews && <BusinessTable onShowReviews={handleShowReviews} />}
            {showReviews && <ReviewsTable businessId={selectedBusinessId} />}
        </div>
    );
}

export default BusinessView;
