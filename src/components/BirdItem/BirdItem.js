import React from 'react';

import styled from 'styled-components'

import Counter from '../Counter/Counter';

export default function BirdItem(props) {

    const {species, count, handlerClick, speciesID} = props;

    return (
        <StyledBirdItem onClick={handlerClick} value={speciesID}>
            <img 
                src={require('../../assets/images/species/' + species + '.png').default}
                alt={species}
                style={{
                    maxWidth: '10rem'
                }}
            />
            <Counter count={count} />
        </StyledBirdItem>
    );

}

const StyledBirdItem = styled.button`
    background: transparent;
    border: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
