import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "./assets/sass/app.scss";
import Main from "./layouts/Main";
function App(){
  return(
    <div>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}
export default App;