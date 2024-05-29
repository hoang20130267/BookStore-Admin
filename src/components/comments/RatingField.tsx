import * as React from 'react';
import { FunctionField } from 'react-admin';
// @ts-ignore
import StarRatings from 'react-star-ratings';

const RatingField = (props:any) => {
    return (
        <FunctionField
            {...props}
            render={(record: { rating: number | undefined; }) => (
                <StarRatings
                    rating={record ? record.rating : 0}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name='rating'
                    starDimension="20px"
                />
            )}
        />
    );
};

export default RatingField;