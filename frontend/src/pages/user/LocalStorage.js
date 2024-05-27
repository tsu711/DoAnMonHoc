// App.js
import React, { useState } from 'react';
import LoginForm from './Login';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (userToken) => {
    // Lưu token vào Local Storage hoặc Redux Store
    setToken(userToken);
  };

  const handleLogout = () => {
    // Xóa token khi đăng xuất
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <div>
          <h2>Đã Đăng Nhập</h2>
          <button onClick={handleLogout}>Đăng Xuất</button>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
