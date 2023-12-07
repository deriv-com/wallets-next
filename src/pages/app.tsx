import useAuthorize from "../api/base/use-authorize";

const App = () => {
    const { data } = useAuthorize();

    return <div>{JSON.stringify(data || { hello: "world" })}</div>;
};

export default App;
