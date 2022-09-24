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
        
        const response = await fetch(`${GITHUB_API}/user?${login}`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });

        if(response.status === 404){
          window.location = '/notfound'
        }else{
          const data = await response.json()
          dispatch({
            type: 'GET_USER',
            payload: data,
          })
        }
    
        const {items} = await response.json();
    
        dispatch({
            type: 'GET_USERS',
            payload: items,
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
        searchUsers,
        setClear,
        getUser,
      }}>
         {children}
      </GithubContext.Provider>
}

export default GithubContext
