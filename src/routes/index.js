import AdminPage from "../pages/AdminPage/AdminPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import DoiMatKhau from "../pages/DoiMatKhau/DoiMatKhau";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import ChiTietQuanNhan from "../pages/QuanLyDonVi/ChiTietQuanNhan/ChiTietQuanNhan";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import DieuChuyenCanBoId from "../pages/QuanLyDonVi/DieuChuyenCanBoId";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import TongHopTaiBoId from "../pages/ChiHuyDieuHanh/ThongKeTai/TongHopTaiBoId"
export const routes = [
    {
        path: '/hosocanbo/:id',
        page: ChiTietQuanNhan,
        isShowHeader: true
    },
    {
        path: '/tonghoptai/:id',
        page: TongHopTaiBoId,
        isShowHeader: true
    },
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/DoiMatKhau',
        page: DoiMatKhau,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSucess,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/dieuchuyencanbo/:id',
        page: DieuChuyenCanBoId,
        isShowHeader: true
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]