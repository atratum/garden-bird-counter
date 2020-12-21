import React from 'react';

function BirdItem(props) {

    const {species} = props;

    return (
        <div>{species}</div>
    );

}

export default BirdItem;
