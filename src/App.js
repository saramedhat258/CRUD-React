import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Sidebar from './compnents/Sidebar';
import Navbar from './compnents/Navbar';
import { Routes, Route} from 'react-router-dom';
import Allproducts from './pages/Allproducts';
import Home from './pages/Home';
import Product from './pages/Product';
import Addproduct from './pages/Addproduct';
import Catigorize from './pages/Catigorize';
import Edit from './pages/Edit';
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='row'>
        <div className='col-2 sidebar'>
          <Sidebar />
        </div>
        <div className='col-10'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<Allproducts/>}/>
            <Route path='/products/:id' element={<Product/>}/>
            <Route path='/products/add' element={<Addproduct/>}/>            
            <Route path='/catigorize' element={<Catigorize/>}/>
            <Route path='/edit/:id' element={<Edit/>}/>            
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
