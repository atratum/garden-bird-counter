import React from 'react';

import BirdItem from '../BirdItem/BirdItem';

function BirdList(props) {

    const {species} = props;

    return species.map((species, key) => {
        return <BirdItem species={species} key={key} />
    });
    
}

export default BirdList;
