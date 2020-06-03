import React from 'react'
import { Route, Redirect } from 'react-router'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                JSON.parse(sessionStorage.getItem('userData')) ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    )
}
export default ProtectedRoute