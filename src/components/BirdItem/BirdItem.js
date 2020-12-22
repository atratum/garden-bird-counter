import React from 'react';

function BirdItem(props) {

    const {species} = props;

    return (
        <div>
            <img src={require('../../assets/images/species/' + species + '.png').default} alt={species} />
        </div>
    );

}

export default BirdItem;
