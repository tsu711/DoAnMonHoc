import React from "react";

const Menu = ({ menu }) => {
  return (
    <div className="collapse navbar-collapse" id="main_nav">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          {menu.menu_item ? (
            <React.Fragment>
              <div class="nav-item dropdown">
                <a
                  href={menu.href}
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  {" "}
                  {menu.menu}
                </a>
                <nav className="row">
                  <div class="dropdown-menu rounded-0 m-0">
                    <a
                      className="dropdown-item"
                      href={menu.menu_item_href || "/information"}
                    >
                      {menu.menu_item}
                    </a>
                  </div>
                </nav>
              </div>
            </React.Fragment>
          ) : (
            <a className="nav-link  text-bold" href={menu.href}>
              {menu.menu}
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
