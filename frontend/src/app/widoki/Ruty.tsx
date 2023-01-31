import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { useAppSelector } from "../../funkcjonalnosci/redux/configureStore";

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
}

export default function Ruty({ component: Component, ...rest }: Props) {
    const {uzytkownik} = useAppSelector(state => state.konto);
    return (
      <Route
        {...rest}
        render={props =>
          uzytkownik ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/logowanie",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }