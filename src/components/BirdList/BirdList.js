import React from 'react';

import styled from 'styled-components'

import BirdItem from '../BirdItem/BirdItem';

export default function BirdList(props) {

    const {species, count, handlerClick} = props;

    return (
        <StyledBirdList>
            {species.map((species, index) => {
                return (
                    <BirdItem 
                        species={species}
                        key={index}
                        count={count[index]}
                        handlerClick={handlerClick}
                        speciesID={index}
                    />
                );
            })}
        </StyledBirdList>
    );
    
}

const StyledBirdList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    & div {
        flex-basis: 33.3333%;
    }
`;
