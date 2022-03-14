import { ApolloError } from "@apollo/react-hooks";
import { Spinner } from "theme-ui";

interface ILoadingProps {
    error?: ApolloError
}

const LoadingPage = ({error}: ILoadingProps) => {
    if (error) {
        return <h1> {error.message} </h1>
      }

    return <Spinner sx={{ margin: "auto" }} />
}

export default LoadingPage;