import React, { useState } from "react";
import "./App.css";
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import Navbar from './components/Navbar/Navbar';

type Page = 'login' | 'signup';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar onPageChange={handlePageChange} />
      {currentPage === 'login' ? <LogIn /> : <SignUp />}
    </div>
  );
}

export default App;
