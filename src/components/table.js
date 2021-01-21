import React, { useState } from 'react'
import { ListContainer, List, ListItem } from './styles'

const AllTried = () => {
  const [trieds, setTrieds] = useState(['Loading Your Tried Recipes...'])

  return (
    <>
      <h2>Your Tried Recipes</h2>
      <ListContainer>
        <List>
          {trieds.map(tried => (
            <ListItem>{...tried}</ListItem>
          ))}
        </List>
      </ListContainer>
    </>
  )
}

export default AllTried
