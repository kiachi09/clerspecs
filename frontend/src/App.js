import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
// import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductAddScreen from "./screens/ProductAddScreen";
import ProductAddOffersScreen from "./screens/ProductAddOffersScreen";

import AddPhotosScreen from "./screens/AddPhotosScreen";
import OrderListScreen from "./screens/OrderListScreen";
import NewHomeScreen from "./screens/NewHomeScreen";
import SpecScreen from "./screens/SpecScreen";
import GogglesScreen from "./screens/GogglesScreen";
import SearchScreen from "./screens/SearchScreen";
import ContactlensScreen from "./screens/ContactLensScreen";
import AboutUsScreen from "./screens/AboutUsScreen";

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Header />
        <main>
          <Container>
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/profile' component={ProfileScreen} />

            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} exact />
            {/* <Route path='/cart/:id/:onlyFrame?' component={CartScreen} exact /> */}

            <Route
              path='/cart/:id/:onlyFrame/:lens/:lensprice/:prescriptionType/:od_sph/:od_cyl/:od_axis/:os_sph/:os_cyl/:os_axis/:Add_Power/:pd_type/:pd_value/:PrescriptionImage?'
              component={CartScreen}
              exact
            />

            <Route path='/admin/userlist' component={UserListScreen} exact />
            <Route
              path='/admin/user/:id/edit'
              component={UserEditScreen}
              exact
            />
            <Route
              path='/admin/productlist'
              component={ProductListScreen}
              exact
            />
            <Route
              path='/admin/productlist/:pageNumber'
              component={ProductListScreen}
              exact
            />
            <Route
              path='/admin/product/:id/edit/:category'
              component={ProductEditScreen}
              exact
            />
            <Route
              path='/admin/product/:id/add'
              component={ProductAddScreen}
              exact
            />
            <Route
              path='/admin/product/:id/addOffers'
              component={ProductAddOffersScreen}
              exact
            />

            <Route path='/admin/orderlist' component={OrderListScreen} exact />
            <Route path='/admin/Addphotos' component={AddPhotosScreen} exact />
            <Route path='/search/:keyword' component={SearchScreen} exact />
            {/* <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          /> */}
            {/* not needed if pagination required tab bas pagenumber daal ke de sakte hai  */}
          </Container>
          <Route path='/specs' component={SpecScreen} exact />
          <Route path='/specs/:value' component={SpecScreen} exact />
          <Route path='/goggles' component={GogglesScreen} exact />
          <Route path='/goggles/:value' component={GogglesScreen} exact />
          <Route path='/Contactlens' component={ContactlensScreen} exact />
          <Route
            path='/Contactlens/:value'
            component={ContactlensScreen}
            exact
          />
          <Route path='/aboutUs' component={AboutUsScreen} exact />
          <Route path='/' component={NewHomeScreen} exact />
        </main>
        <Footer />
      </ScrollToTop>
    </Router>
  );
};

export default App;
