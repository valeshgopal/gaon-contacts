import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contacts from './components/Contacts/Contacts';
import Messages from './components/Messages/Messages';
import ViewContact from './components/ViewContact/ViewContact';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Contacts />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='view-contact/:id' element={<ViewContact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
