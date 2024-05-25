
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Career from './Pages/Career';
import { Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin';
import Actions from './Pages/Actions';

function App() {
  return (
    <ChakraProvider>
  <Routes>
        
        <Route
          path="/"
          element={
              <Career />
          }
        />
         <Route
          path="/admin"
          element={
              <Admin />
          }
        />
         <Route
          path="/action"
          element={
              <Actions />
          }
        />
        
      </Routes>
    </ChakraProvider>
  );
}

export default App;
