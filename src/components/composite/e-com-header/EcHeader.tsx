import React, { useEffect, useMemo, useState } from 'react';
import styles from './EcHeader.module.scss';
import {
  MenuOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { Drawer, Dropdown, Flex, List, MenuProps, Typography } from 'antd';
import { EcIcon, EcInput } from '../../atom';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constant';
import { useCart } from '../../../context/CartContext';
import { useNotify } from '../../../hooks';
import { debounce } from "lodash";
import { AppDispatch, RootState } from '../../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSearchKeyword } from '../../../redux/slice/product';
import { categoryAction } from '../../../redux/action';

const { Text, Title } = Typography

const EcHeader: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { notify, contextHolder } = useNotify();
  const { cartItems } = useCart();
  const { currentUser, signOut } = useAuth()
  const [drawerVisible, setDrawerVisible] = useState(false);

  const isLoading = useSelector((state: RootState) => state.category.isLoading)
  const categories = useSelector((state: RootState) => state.category.categories)

  useEffect(() => {
    dispatch(categoryAction.getAllProductCategories())
  }, [])

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const onNavigateToLogin = () => navigate(APP_ROUTES.LOGIN);

  const onNavigateToMyCart = () => navigate(APP_ROUTES.MY_CART);

  const onNavigateToHome = () => navigate(APP_ROUTES.ROOT)

  const onSgnOut = () => {
    signOut()
    notify("Signout successful", "", "success");
  }

  const drawerData = [
    {
      key: "cart",
      label: "My Cart",
      onClick: () => {
        onNavigateToMyCart()
        toggleDrawer()
      }
    },
  ];

  const accountMenu: MenuProps = {
    items: currentUser
      ? [
        {
          key: "username",
          label: <Text strong>{currentUser.username}</Text>,
          disabled: true,
        },
        {
          key: "logout",
          label: "Logout",
          onClick: onSgnOut,
        },
      ]
      : [
        {
          key: "signin",
          label: "Sign In",
          onClick: onNavigateToLogin,
        },
      ],
  };

  const categoryMenu: MenuProps = {
    items: isLoading
      ? [
        {
          key: "loading",
          label: "Loading...",
          disabled: true,
        },
      ]
      : categories.length > 0
        ? [
          {
            key: "all",
            label: "All Categories",
            onClick: () => dispatch(setCategory('')),
          },
          { type: "divider" },
          ...categories.map((category, index) => ({
            key: `category-${index}`,
            label: category,
            onClick: () => dispatch(setCategory(category)),
          })),
        ]
        : [
          {
            key: "no-categories",
            label: "No Categories Found",
            disabled: true,
          },
        ],
  };

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearchKeyword(value));
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    return () => handleSearch.cancel();
  }, [handleSearch]);

  return (
    <>
      {contextHolder}
      <header className={`${styles.header} container`}>
        {/* Mobile Menu Icon */}
        <div className={styles.mobile}>
          <EcIcon icon={MenuOutlined} onClick={toggleDrawer} />
        </div>

        {/* Logo Centered on Mobile */}
        <Title className='zero-margin cursor-pointer' type='warning' onClick={onNavigateToHome}>ECOM-SHOP</Title>
        <div className={styles.mobile}></div>


        {/* Desktop Search Bar */}
        <div className={styles.search}>
          <EcInput
            placeholder="What are you looking for...?"
            type="search"
            suffix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)} // Use debounced handler
          />
        </div>

        {/* Desktop Icons */}
        <Flex justify='space-between' align='center' gap={20} className={styles.desktopIcons}>
          <EcIcon icon={ShoppingCartOutlined} text="My Cart" onClick={onNavigateToMyCart} count={cartItems.length} />
          <Dropdown menu={accountMenu} trigger={["click"]}>
            <EcIcon icon={UserOutlined} text="My Account" onClick={() => { }} />
          </Dropdown>
          <Dropdown menu={categoryMenu} trigger={["click"]}>
            <EcIcon icon={FilterOutlined} text="All Categories" onClick={() => { }} />
          </Dropdown>
        </Flex>

        {/* Fullscreen Drawer for Mobile */}
        <Drawer
          title={
            <Flex justify='center' align='center'>
              <Title className='zero-margin' type='warning'>ECOM-SHOP</Title>
            </Flex>
          }
          placement="right"
          onClose={toggleDrawer}
          open={drawerVisible}
          width="100%"
        >
          <List
            dataSource={drawerData}
            renderItem={item => (
              <List.Item onClick={item.onClick}>
                <Text strong>{item.label}</Text>
              </List.Item>
            )}
          />
        </Drawer>
      </header>
    </>
  );
};

export default EcHeader;
