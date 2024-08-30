import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
const _nav = [
  {
    component: CNavItem,
    name: 'Bảng Điều Khiển',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'Mới',
    },
  },
  {
    component: CNavTitle,
    name: 'Components',
  },

  {
    component: CNavItem,
    name: 'Sản Phẩm',
    to: '/Product/all-product',
    icon: <MdOutlineProductionQuantityLimits customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Danh Mục',
    to: '/Category/all-category',
    icon: <MdOutlineProductionQuantityLimits customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Người Dùng',
    to: '/User/all-user',
    icon: <MdOutlineProductionQuantityLimits customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Đơn Hàng',
    to: '/Order/all-order',
    icon: <MdOutlineProductionQuantityLimits customClassName="nav-icon" />,
  },

  // {
  //   component: CNavItem,
  //   name: 'Menu',
  //   to: '/Menu/all-menu',
  //   icon: <MdOutlineProductionQuantityLimits customClassName="nav-icon" />,
  // },
]

export default _nav
