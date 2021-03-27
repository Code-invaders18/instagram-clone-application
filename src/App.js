import { createContext, React, useEffect, useReducer, useContext } from 'react';
import './App.css';
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile';
import SuscribeUserPost from './components/screens/SuscribeUserPost';
import Reset from './components/screens/Reset';
import NewPassword from './components/screens/NewPassword';
import Story from './components/screens/Story';

export const UserContext=createContext()

/*here we have taken out all the routes out from the app() because wew have to access
the history to the components, and we cannot access it in the app() because all of
them are wrapped inside the browser router. And history is something like 
outside of the browser.*/

const Routing=()=>{

  const history=useHistory()
  const {state, dispatch}=useContext(UserContext)

  // useEffect(()=>{
  //   const user=JSON.parse(localStorage.getItem("user"))
  //   if(user){
  //     dispatch({type:"USER",payload:user})
  //     //history.push('/')
  //   }
  //   else{
  //     if(!history.location.pathname.startsWith('/reset'))
  //        history.push('/signin')
  //   }
  // },[])

  return(
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route path='/story'>
        <Story/>
      </Route>
      <Route path='/signin'>
        <SignIn/>
      </Route>
      <Route exact path='/reset'>
        <Reset/>
      </Route>
      <Route path='/reset/:token'>
        <NewPassword/>
      </Route>
      <Route exact path='/profile'>
        <Profile/>
      </Route>
      <Route path='/signup'>
        <Signup/>
      </Route>
      <Route path='/createpost'>
        <CreatePost/>
      </Route>
      <Route path='/myfollowpost'>
        <SuscribeUserPost/>
      </Route>
      <Route path='/profile/:userid'>
        <UserProfile/>
      </Route>
    </Switch>
  )
}

function App() {
  
  //here we are defining the reducer method
  const [state,dispatch]=useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
                      <Navbar/>
                      <Routing/>
        </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
