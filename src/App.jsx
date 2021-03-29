import Slider from './Components/Slider/Slider';
import uno from './assets/images/uno.jpeg';
import dos from './assets/images/dos.jpeg';
import tres from './assets/images/tres.jpeg';
import cuatro from './assets/images/cuatro.jpeg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Slider size={70} >
        <a href="https://facebook.com"><img className="image-style" src={uno} alt="uno"/></a>
        <a href="https://twitter.com"><img className="image-style" src={dos} alt="dos"/></a>
        <a href="https://whatsapp.com"><img className="image-style" src={tres} alt="tres"/></a>
        <a href="https://intagram.com"><img className="image-style" src={cuatro} alt="cuatro"/></a>
      </Slider>
    </div>
  );
}

export default App;
