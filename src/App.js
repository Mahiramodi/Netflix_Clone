import "./App.css";
import Home from "./components/Home";
import url from "./urls";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";

function App() {
    return ( <
        div className = "app" >
        <
        Navbar / >
        <
        Banner / >
        <
        Home title = "Trending"
        fetchURL = { url.Trending }
        size / > { " " } <
        Home title = "Top Rated"
        fetchURL = { url.TopRated }
        />{" "} <
        Home title = "Comedy"
        fetchURL = { url.Comedy }
        />{" "} <
        Home title = "Horror"
        fetchURL = { url.Horror }
        />{" "} <
        Home title = "Action"
        fetchURL = { url.Action }
        />{" "} <
        /div>
    );
}

export default App;