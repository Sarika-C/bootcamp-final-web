import React, { useState } from 'react'
import { ListContainer, List, ListItem } from './styles'
import { useQuery } from "@apollo/react-hooks"
import TRIED_BY_ID from ".../graphql.js"

// import ApolloClient from "apollo-boost" // initialize client instance
// import client from './client.js' // in App file
// import { triedRecipeById } from '../graphql.js'
// const [trieds, setTrieds] = useState(['Loading Your Tried Recipes...'])

// query getTried($id: ID!) {
//     triedRecipe(id: $id) {
//       link
//     }
// }

const Trieds = () => {
  const { data, loading, error } = useQuery(TRIED_BY_ID)
    // {
    //   variables: {id, user, link},
    //   partialRefetch: true
    // })

  if (error) {
    console.log(`Error: ${error}`)
  }
  
  return (
    <>
      {loading ? 'loading...' : data.map(TriedRecipe => (
        <>
          <p>`Recipe Link: ${TriedRecipe.link}`</p>
        </>
        ))}
      </>
  )
}

    // <select>
    //   <h2>Your Tried Recipes</h2>
    //   <ListContainer>
    //     <List>
    //       {data.TriedRecipe.map(() => (
    //         <option key {tried.id} value={tried.link}>
    //           {tried.link}
    //         </option> 
    //       ))}
    //     </List>
    //   </ListContainer>
    // </select>

export default Trieds
