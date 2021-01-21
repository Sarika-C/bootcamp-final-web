import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  PageContainer,
  Container,
  SubContainer,
  AddContainer,
  ResultContainer,
  DescContainer
} from './styles'
import SearchResults from './components/SearchResults'
import {
  SearchBar,
  IngredientAdder,
  IngredientList,
} from './components/Search'

const APP_ID = 'f1500858'
const APP_KEY = '090812a8cbcf00e2831e04f48c0fa243'

const Home = () => {
  const history = useHistory()

  const [query, setQuery] = useState('')
  const [ingredients, setIngredients] = useState([])

  const [url, setUrl] = useState('')
  const [results, setResults] = useState([])

  if (!localStorage.getItem('token')) {
    history.push('/login')
  }

  const filter = ({ hits }) => {
    const filtered = []
    hits.forEach(({ recipe }) => {
      let ingJoined = ''
      recipe.ingredients.forEach(({ text }) => { ingJoined += text })
      if (ingredients.every(ingredient => ingJoined.includes(ingredient))) {
        filtered.push(recipe)
      }
    })
    setResults(filtered)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${url}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await res.json()
      filter(data)
    }
    fetchData()
  }, [url])

  const addIngredient = i => {
    setIngredients([...ingredients, i])
  }

  const processSubmit = () => {
    let link = 'https://api.edamam.com/search?'
    if (query) {
      link += `q=${query}`
    }

    setUrl(link)
  }

  return (
    <>
      <PageContainer>
        <Container>
          <SearchBar setQuery={setQuery} />
          <SubContainer>
            <AddContainer>
              <IngredientAdder addIngredient={addIngredient} />
              <IngredientList ingredients={ingredients} />
            </AddContainer>
            <DescContainer>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat consectetur, quo reiciendis atque est vel repellendus veniam voluptatum facere incidunt a eaque in adipisci consequatur laborum consequuntur quas voluptas fugiat ad quod, temporibus sit nihil. Nihil illo quae dolore sequi ratione repudiandae aliquam iste vel iure eveniet, error accusamus deserunt?</p>
              <button onClick={processSubmit}>Submit</button>
            </DescContainer>
          </SubContainer>
          <ResultContainer>
            <SearchResults results={results} />
          </ResultContainer>
        </Container>
      </PageContainer>
    </>
  )
}

export default Home
