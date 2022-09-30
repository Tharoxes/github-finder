import {createContext, useReducer} from 'react'
import githubReducer from './GithubReducer'


const GithubContext = createContext()

const GITHUB_API = process.env.REACT_APP_GITHUB_API

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users:[],
        user:{},
        loading: false,
        repos: [],
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = async (text) => {

        setLoading()
        
        const params = new URLSearchParams({
            q: text,
        })

        const response = await fetch(`${GITHUB_API}/search/users?${params}`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });
    
        const {items} = await response.json();
    
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
      };

      //get single user
      const getUser = async (login) => {

        setLoading()
        console.log(login)
        
        const response = await fetch(`${GITHUB_API}/users/${login}`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });

        if(response.status === 404){
          window.location = '/notfound'
        }else{
          const data = await response.json()

          console.log(data)
          console.log('blabla')

          dispatch({
            type: 'GET_USER',
            payload: data,
          })
        }
      };

      // get the repo
      const getUserRepos = async (login) => {

        setLoading()

        const params = new URLSearchParams({
          sort: 'created',
          per_page: 10,
      })

        const response = await fetch(`${GITHUB_API}/users/${login}/repos?${params}`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });
    
        const data = await response.json();
        console.log(data)
    
        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })
      };


      // set loading
      const setLoading = () => dispatch({
        type: 'SET_LOADING',
        }
      )

      const setClear = () => dispatch({
        type: 'SET_CLEAR',
      })

      return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        setClear,
        getUser,
        getUserRepos
      }}>
         {children}
      </GithubContext.Provider>
}

export default GithubContext
