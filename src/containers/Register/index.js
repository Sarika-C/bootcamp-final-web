import React, {useState} from 'react'
import {StyledForm, DietHealth, DietHealthContainer, Container, LoginRegisterButton} from '../../styles'
import InputBlock from '../../components/LoginRegister/InputBlock'
import DietHealthBlock from '../../components/LoginRegister/DietHealthBlock'
import { REGISTER, ADD_DIET, ADD_HEALTH } from './graphql'
import { useMutation } from '@apollo/react-hooks'
import { useHistory, Link } from 'react-router-dom'

// multiple dietary restrictions!!
// diets: “balanced”, “high-protein”, “high-fiber”, “low-fat”, “low-carb”, “low-sodium”
// health: dairy-free, egg-free, fish-free, gluten-free, kosher, peanut-free, shellfish-free, soy-free, tree-nut-free, vegan, vegetarian

const Register = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confpass, setConfpass] = useState("")
    const [userId, setId] = useState("")
    const [registered, setRegistered] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const buttonEnabled = email.length > 0 && pass.length > 0 && confpass.length > 0

    const [diet, setDiet] = useState({
        "balanced": false,
        "high-protein": false,
        "high-fiber": false,
        "low-fat": false,
        "low-carb": false,
        "low-sodium": false,
    })
    const [health, setHealth] = useState({
        "dairy-free": false,
        "egg-free": false,
        "gluten-free": false,
        "kosher": false,
        "peanut-free": false,
        "pescatarian": false,
        "shellfish-free": false,
        "soy-free": false,
        "tree-nut-free": false,
        "vegan": false,
        "vegetarian": false,
    })

    const history = useHistory()
    const [register, {loading, error}] = useMutation(REGISTER, {
        variables: {
            input: {
                email: email,
                password: pass,
            },
        },
        onCompleted:({register: {token, user: {id}}}) => {
            setId(id)
            localStorage.setItem('token', token)
            console.log("user has been registered")
            setRegistered(true)
        },
        onError: (error) => {
            let errorM = error.message.slice(14)
            setErrorMessage(errorM)
            console.log(errorM)
        }
    })

    const [addDiet, {loading: dietLoading, error: dietError}] = useMutation(ADD_DIET, {
        onCompleted: () => {
            console.log("diet added")
        }
    })
    const [addHealth, {loading: healthLoading, error: healthError}] = useMutation(ADD_HEALTH)

    const handleDietCheck = ({ target }) => {
        setDiet(s => ({ ...s, [target.name]: !s[target.name] }));}
    
    const handleHealthCheck = ({ target }) => {
        setHealth(s => ({ ...s, [target.name]: !s[target.name] }));}


    const handleRegister = (event) => {
        event.preventDefault()
        if (pass !== confpass) {
            alert("passwords don't match!")
            return
        }
        register()
    }

    const handleSubmit = (event) => {
        Object.keys(diet).forEach(key => {
            if (diet[key] === true) {
                addDiet({
                    variables: {
                        input: {
                            user: {
                                id: userId,
                            },
                            restriction: key,
                        },
                    },
                })
            }
        })
        Object.keys(health).forEach(key => {
            if (health[key] === true) {
                addHealth({
                    variables: {
                        input: {
                            user: {
                                id: userId,
                            },
                            restriction: key,
                        },
                    },
                })
            }
        })
        history.push('/')
    }

    return (
        <Container>
        { localStorage.clear() }
        <StyledForm onSubmit={handleSubmit}>
            <h1>Welcome to Recipe Central</h1>
            <p> { errorMessage } </p>
            {!registered ?
            <>
            <InputBlock 
                label="Email" 
                type="text" 
                name="email" 
                onChangeF={(e) => setEmail(e.target.value)} 
                value={email} 
            />
            <InputBlock 
                label="Password" 
                type="password" 
                name="password" 
                onChangeF={(e) => setPass(e.target.value)} 
                value={pass} 
            />
            <InputBlock 
                label="Confirm Password" 
                type="password" 
                name="confpass" 
                onChangeF={(e) => setConfpass(e.target.value)} 
                value={confpass} 
            />
            <LoginRegisterButton disabled={ !buttonEnabled } onClick={ handleRegister }>Register</LoginRegisterButton>
            <p>or <Link to="/login">Login</Link></p>
            </>
            :
            <>
            <DietHealthContainer>
                <DietHealth>
                    <h3>Dietary concerns:</h3>
                    {Object.keys(diet).map(key => (
                        <DietHealthBlock
                            label={key}
                            handleCheck={handleDietCheck}
                            name={key}
                            checked={diet[key]}
                        />
                    ))}
                </DietHealth>
                <DietHealth>
                    <h3>Health concerns:</h3>
                    {Object.keys(health).map(key => (
                        <DietHealthBlock
                            label={key}
                            handleCheck={handleHealthCheck}
                            name={key}
                            checked={diet[key]}
                        />
                    ))}
                </DietHealth>
            </DietHealthContainer> 
            <LoginRegisterButton onClick={ handleSubmit }>Submit</LoginRegisterButton>
            </>
            }
        </StyledForm>
        </Container>
    )
}

export default Register