import React from 'react';

const Menu = ({ menu }) => {
  return (
    <div className="collapse navbar-collapse" id="main_nav">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          {menu.menu_item ? (
            <React.Fragment>
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href={menu.href }  // Sử dụng giá trị href từ dữ liệu menu hoặc một giá trị mặc định nếu không có
              >
                {" "}
                <i></i> {menu.menu}{" "}
              </a>
              <div className="dropdown-menu dropdown-large">
                <nav className="row">
                  <div className="col-6">
                    <a className="dropdown-item" href={menu.menu_item_href || '/information'}>
                      {menu.menu_item}
                    </a>
                  </div>
                </nav>
              </div>
            </React.Fragment>
          ) : (
            <a className="nav-link" href={menu.href}>
              {menu.menu}
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
